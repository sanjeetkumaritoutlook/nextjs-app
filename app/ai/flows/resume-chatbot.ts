'use server';

/**
 * @fileOverview A chatbot trained on Sanjeet Kumar's resume, built to answer queries about his background.
 *
 * - resumeChatbot: Processes user queries and returns responses based on Sanjeet's resume.
 * - Includes details about education, skills, projects, certifications, achievements, and hobbies.
 * - Provides suggestive questions for vague or unrelated queries to guide users.
 * - Handles invalid inputs gracefully.
 */

import { ai } from '../../ai/genkit';
import { z } from 'genkit';

// Input schema for user queries
const ResumeChatbotInputSchema = z.object({
  query: z.string()
    .min(1, 'Query cannot be empty')
    .max(300, 'Query is too long, please keep it under 300 characters')
    .describe('User query about Sanjeet Kumar.'),
});
export type ResumeChatbotInput = z.infer<typeof ResumeChatbotInputSchema>;

// Output schema for chatbot responses
const ResumeChatbotOutputSchema = z.object({
  response: z.string().describe('Chatbot response to the query.'),
});
export type ResumeChatbotOutput = z.infer<typeof ResumeChatbotOutputSchema>;

// Main chatbot function
export async function resumeChatbot(input: ResumeChatbotInput): Promise<ResumeChatbotOutput> {
  try {
    const validatedInput = ResumeChatbotInputSchema.parse(input);
    return await resumeChatbotFlow(validatedInput);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      response: 'Sorry, your query is invalid. Please ask about my education, skills, projects, or hobbies! Try questions like: "What projects has Sanjeet worked on?" or "What are his hobbies?"',
    };
  }
}

// List of suggestive questions for fallback responses
const suggestiveQuestions = [
  "What is Sanjeet's educational background?",
  "What programming languages does Sanjeet know?",
  "Can you tell me about Sanjeet's projects?",
  "What certifications has Sanjeet earned?",
  "What are his hobbies?",
];

// Prompt definition with suggestive questions
const resumePrompt = ai.definePrompt({
  name: 'resumeChatbotPrompt',
  input: { schema: ResumeChatbotInputSchema },
  output: { schema: ResumeChatbotOutputSchema },
  prompt: `Hi,You are Bazzinga, a friendly chatbot I trained on my resume as Sanjeet Kumar. Answer questions about my education, skills, projects, certifications, achievements, and hobbies in a clear, conversational way. For vague or unrelated queries, respond with: "I’m not sure about that, but I can share details about my education, skills, projects, or hobbies. Try these questions: ${suggestiveQuestions.join(', ')}" and include a brief relevant answer if possible.

  Hi: Say Hi, People.
My Resume:
I’m Sanjeet Kumar, a B.Tech . I’m passionate about building full-stack apps and creating data-driven insights. In my free time, I sketch, read sci-fi, and volunteer at community events.

Education:
- B.Tech in Information Technology, Paavai Engineering College (2007–2011), CGPA: 9.29
- Class XII (ISC), DAV Public School, Ranchi, Jharkhand (2005–2007), 74%
- Class X (ICSE), DAV Public School, Kanti, Muzaffarpur (2004–2005), 88.2%

Skills:
- Languages: TypeScript, HTML, JavaScript,Python
- Frameworks: Angular, React, Nest.js, Stencil.JS
- Web: HTML5, CSS3, 
- Data Tools: MongoDB, PostgreSQL
- DevOps: Git, AWS (S3, EC2), Github Actions, Vercel
- AI/ML: TensorFlow, Scikit-learn

Projects:
- Enterprise Dashboard: Built using Python Streamlit

Hobby Projects (Planned in future):
- AI Resume ATScore(Almost completed)
- Blockchain(Ongoing)
- Google CLoud BigQuery Projects (Ongoing)
- AI Based Mock Interview Evaluator using Computer Vision (Ongoing)

Certifications:
- AWS: AWS Certified Cloud Practioner

Achievements:
- Completed OCEAN certification in Capgemini
- Completed L1 and L2 insurance certifications in Capgemini
- Completed EM Foundation Level 0 certification in Capgemini 

Hobbies:
- Create Hobby Projects
- Learning new programming languages and frameworks
- Exploring new places and trying new foods

Loves: Internet Surfing

Favorite food: I love Hyderabadi Chicken Biryani
Favorite drink: Chai, Kitkat milkshake, Mojito, but only if it's made with love and you're paying the bill.
Favorite color: Black, Chisry Red.
Favorite movie: Martian, Interstellar, Jurassic Park.
Favorite cartoon: KungFu Panda, Shinchan.
Favorite book: The Selfish Gene by Richard Dawkins.
Favorite sport: Cricket.
Favorite music: Bollywood and Indie.

Suggestive Questions:
- What is Sanjeet's educational background?
- What programming languages does Sanjeet know?
- Can you tell me about Sanjeet's projects?
- What certifications has Sanjeet earned?
- What are Sanjeet's hobbies?

Answer this query: {{query}}`,
});

// Flow to process the prompt
const resumeChatbotFlow = ai.defineFlow(
  {
    name: 'resumeChatbotFlow',
    inputSchema: ResumeChatbotInputSchema,
    outputSchema: ResumeChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await resumePrompt(input);
    return output || { response: `I’m not sure about that, but I can share details about my education, skills, projects, or hobbies. Try these questions: ${suggestiveQuestions.join(', ')}` };
  }
);