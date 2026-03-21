# LEGALIAI

AI-powered U.S. immigration preparation tool for individual immigrants.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your keys:
```bash
cp .env.example .env
```

3. Add your environment variables:
- `VITE_SUPABASE_URL` — Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Your Supabase anon key
- `VITE_OPENAI_API_KEY` — Your OpenAI API key (add to Vercel env vars, not here)

4. Run locally:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Deploy to Vercel

1. Push to GitHub
2. Import repo in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Supabase Tables Required

Run these in Supabase SQL editor:

```sql
create table users (
  id uuid references auth.users primary key,
  email text,
  language text default 'en',
  created_at timestamp default now()
);

create table onboarding_answers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id),
  answers jsonb,
  created_at timestamp default now()
);

create table progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id),
  module text,
  status text default 'NOT STARTED',
  updated_at timestamp default now()
);

create table document_checks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id),
  document_name text,
  checked boolean default false,
  updated_at timestamp default now()
);

create table form_answers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id),
  question_id text,
  answer text,
  ai_feedback text,
  updated_at timestamp default now()
);

create table payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id),
  stripe_session_id text,
  amount integer,
  paid_at timestamp default now()
);
```

Enable RLS on all tables and add policies for authenticated users.
