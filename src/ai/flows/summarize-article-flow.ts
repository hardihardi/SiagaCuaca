
'use server';

/**
 * @fileOverview A flow to summarize a news article into a single paragraph, with caching.
 *
 * - summarizeArticle - A function that handles the article summarization.
 * - SummarizeArticleInput - The input type for the summarizeArticle function.
 * - SummarizeArticleOutput - The return type for the summarizeArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { initializeAdmin } from '@/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';


const SummarizeArticleInputSchema = z.object({
  articleId: z.string().describe('The unique ID of the article to be summarized.'),
  articleContent: z.string().describe('The full content of the news article to be summarized.'),
});
export type SummarizeArticleInput = z.infer<typeof SummarizeArticleInputSchema>;

const SummarizeArticleOutputSchema = z.object({
  summary: z.string().describe('A single paragraph summary of the article in Bahasa Indonesia.'),
});
export type SummarizeArticleOutput = z.infer<typeof SummarizeArticleOutputSchema>;

export async function summarizeArticle(input: SummarizeArticleInput): Promise<SummarizeArticleOutput> {
  return summarizeArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeArticlePrompt',
  input: {schema: SummarizeArticleInputSchema},
  output: {schema: SummarizeArticleOutputSchema},
  prompt: `You are an expert editor for a news agency.
You will receive the content of a news article. Your task is to summarize it into a single, concise, and informative paragraph in Bahasa Indonesia.

Article Content:
{{{articleContent}}}

Summary:`,
});

const summarizeArticleFlow = ai.defineFlow(
  {
    name: 'summarizeArticleFlow',
    inputSchema: SummarizeArticleInputSchema,
    outputSchema: SummarizeArticleOutputSchema,
  },
  async input => {
    const { firestore } = initializeAdmin();
    const { articleId, articleContent } = input;
    
    // Define the document reference for the cached summary
    const summaryDocRef = firestore.collection('article_summaries').doc(articleId);

    // 1. Check if a summary already exists in Firestore
    const docSnap = await summaryDocRef.get();
    if (docSnap.exists) {
      // If it exists, return the cached summary
      return { summary: docSnap.data()!.summary };
    }

    // 2. If not cached, generate a new summary
    const { output } = await prompt(input);
    const newSummary = output!.summary;

    // 3. Save the new summary to Firestore for future requests
    await summaryDocRef.set({
      articleId: articleId,
      summary: newSummary,
      createdAt: FieldValue.serverTimestamp(),
    });

    // 4. Return the newly generated summary
    return { summary: newSummary };
  }
);

    