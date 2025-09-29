import {genkit} from 'genkit';
// import {googleAI} from '@genkit-ai/googleai';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  // plugins: [googleAI()],
   plugins: [
    // Or with an explicit API key:
    googleAI({ apiKey: 'AIzaSyB0llVseWMMQHnFQ8XGnlJ9MNjMUNGTipc' }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
