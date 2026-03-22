import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, email } = req.body;

    // Check if user already paid — send them straight to dashboard
    if (userId) {
      const { data: existing } = await supabase
        .from("payments")
        .select("id")
        .eq("user_id", userId)
        .limit(1);

      if (existing && existing.length > 0) {
        return res.status(200).json({ url: "https://legaliai.com/?payment=success" });
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price: "price_1TDZ0LRvoHtQwKYKPyxNNkyJ",
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
      success_url: `https://legaliai.com/?payment=success`,
      cancel_url: `https://legaliai.com/?payment=cancelled`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return res.status(500).json({ error: "Payment failed" });
  }
}
