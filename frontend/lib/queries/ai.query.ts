import { CohereClient, CohereError, CohereTimeoutError } from "cohere-ai";
import { ErrorToast } from "../../components/Toast";

const cohere = new CohereClient({
  token: process.env.NEXT_PUBLIC_COHERE_API_KEY,
});

interface GenerateAiAdvice {
  budgetName: string;
  budgetAmount: number;
  amountSpent: number;
}

export async function generateAiAdvice(args: GenerateAiAdvice) {
  try {
    const prediction = await cohere.generate({
      prompt: `give me som advice for my finance company with a budget of ${args.budgetAmount} naira for ${args.budgetName} but we have spent ${args.amountSpent} instead. Summarise the text in 5 sentences.`,
      maxTokens: 200,
    });
    return prediction.generations[0].text;
  } catch (err) {
    if (err instanceof CohereTimeoutError) {
      ErrorToast("Request timed out");
      console.log("Request timed out", err);
    } else if (err instanceof CohereError) {
      // catch all errors
      console.log(err.statusCode);
      console.log(err.message);
      console.log(err.body);
    }
    return "An Error occured :( ";
  }
}
