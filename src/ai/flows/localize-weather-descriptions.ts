'use server';

/**
 * @fileOverview A flow to localize weather descriptions and alerts to Bahasa Indonesia if the user is located in Indonesia.
 *
 * - localizeWeatherDescriptions - A function that handles the localization of weather descriptions.
 * - LocalizeWeatherDescriptionsInput - The input type for the localizeWeatherDescriptions function.
 * - LocalizeWeatherDescriptionsOutput - The return type for the localizeWeatherDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LocalizeWeatherDescriptionsInputSchema = z.object({
  location: z.string().describe('The location of the user.'),
  weatherDescription: z.string().describe('The weather description to localize.'),
});
export type LocalizeWeatherDescriptionsInput = z.infer<typeof LocalizeWeatherDescriptionsInputSchema>;

const LocalizeWeatherDescriptionsOutputSchema = z.object({
  localizedDescription: z.string().describe('The localized weather description in Bahasa Indonesia if the user is in Indonesia, otherwise the original description.'),
});
export type LocalizeWeatherDescriptionsOutput = z.infer<typeof LocalizeWeatherDescriptionsOutputSchema>;

export async function localizeWeatherDescriptions(input: LocalizeWeatherDescriptionsInput): Promise<LocalizeWeatherDescriptionsOutput> {
  return localizeWeatherDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'localizeWeatherDescriptionsPrompt',
  input: {schema: LocalizeWeatherDescriptionsInputSchema},
  output: {schema: LocalizeWeatherDescriptionsOutputSchema},
  prompt: `You are a localization expert. You will receive a location and a weather description.
If the location is in Indonesia, you will translate the weather description to Bahasa Indonesia.
If the location is not in Indonesia, you will return the original weather description.

Location: {{{location}}}
Weather Description: {{{weatherDescription}}}

Localized Weather Description:`,
});

const localizeWeatherDescriptionsFlow = ai.defineFlow(
  {
    name: 'localizeWeatherDescriptionsFlow',
    inputSchema: LocalizeWeatherDescriptionsInputSchema,
    outputSchema: LocalizeWeatherDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {localizedDescription: output!.localizedDescription};
  }
);
