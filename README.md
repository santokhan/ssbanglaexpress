This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Reference website

https://themeperch.net/html/logistip/home-1.html
https://themeperch.net/html/logistip/home-3.html
https://www.dotexpresscorp.com/

## Supabase database and authentication

Copy `.env.example` to `.env` (or add the variables to your existing ignored `.env`). Set `DATABASE_URL` to the PostgreSQL connection string from Supabase, `SESSION_SECRET` to a random secret of at least 32 characters, and `NEXT_PUBLIC_GOOGLE_CLIENT_ID` to your Google OAuth 2.0 Web client ID. Keep the database URL and session secret server-only; do not use a `NEXT_PUBLIC_` prefix for them. Add your deployed site origins to the OAuth client's authorized JavaScript origins.

Install the schema in the Supabase database with `npm run db:push`, then start the app. Prisma stores users, quote requests, and contact messages. Signup supports email/password and Google sign-in; passwords are hashed and sessions use an HTTP-only cookie. Existing Supabase data is not deleted by `db:push`.

Password recovery uses server actions, stores one-time reset tokens in the database, and sends reset links through Gmail SMTP. Configure `SMTP_USER` and `SMTP_APP_PASSWORD` before enabling recovery in production. Reset links use the origin of the request.
