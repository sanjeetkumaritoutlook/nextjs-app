## genai chatbot

https://www.npmjs.com/package/@genkit-ai/google-genai

https://www.npmjs.com/package/genkit/

https://www.npmjs.com/package/dotenv

https://www.npmjs.com/package/nextjs-themes

```
npm i nextjs-themes
```

https://ui.shadcn.com/docs/dark-mode/next

```
pnpm add next-themes
```
https://github.com/pacocoursey/next-themes/issues/247

https://github.com/shadcn-ui/ui/issues/5706


```
import {genkit} from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
```
https://github.com/angular/examples/tree/main/genkit-angular-starter-kit

https://github.com/angular/examples/tree/main/genkit-angular-story-generator

## ⚡ Analogy:

GitHub Pages = a USB stick 📀 that only stores your files.

Server Actions = code that needs a CPU 🖥️ to execute requests.

No matter what, a USB stick can’t suddenly run a CPU — same with GitHub Pages.

```
> Server Actions are not supported with static export.
Error: Process completed with exit code 1.
```
This happens because:

You’re using Next.js 15.

You’re deploying to GitHub Pages, which only supports static export (next export → pure HTML, CSS, JS).

But your app is using Server Actions / server-only features — these require a server (Vercel, Node.js server, etc.), which GitHub Pages does not provide.