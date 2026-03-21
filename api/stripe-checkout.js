import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, email } = req.body;

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
      success_url: `https://legaliai.com/dashboard?payment=success`,
      cancel_url: `https://legaliai.com/paywall?payment=cancelled`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return res.status(500).json({ error: "Payment failed" });
  }
}
