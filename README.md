This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

Open [http://localhost:3000/nextjs-app](http://localhost:3000/nextjs-app) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## deployed on vercel

branch for-vercel deployed on https://nextjs-app-pearl-nu.vercel.app/nextjs-app

process.env.GOOGLE_API_KEY is only available on the server (not in browser).

Since GitHub Pages only supports static hosting (HTML/CSS/JS files), you must run your app in static export mode locally too.

👉 If you want to stay on GitHub Pages: you must remove "use server" and run everything client-side. But then your Google API key will be public (needs restrictions).

👉 If you want to keep server-only logic and private API keys: move to Vercel/Netlify or use your NestJS proxy as a backend.

"use server"; -> That turns the file into a Server Action file — which cannot be statically exported. GitHub Pages only works with pure static assets (HTML, JS, CSS). No Node.js runtime, no Server Actions.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
