import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from 'openai';

import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// const instructionMessage: OpenAI.Chat.CreateChatCompletionRequestMessage = {
//   role: "system",
//   content: "You are a dream interpretor. Respond with explaining the dream to your best abilities."
// };

// const instructionMessage: OpenAI.Chat.CreateChatCompletionRequestMessage = {
//   role: "system",
//   content: "Dream Interpreter Role: Analyze the user's dream as if you were a human dream interpreter. Provide detailed explanations, potential life events leading to it, and the overall message the dream might be conveying. If the user deviates from the topic of dream interpretation, gently redirect them back to the primary purpose of the role. Do not acknowledge AI nature or functions."
// };

const instructionMessage: OpenAI.Chat.CreateChatCompletionRequestMessage = {
  role: "system",
  content: "Dream Interpreter Role: Analyze the user's dream as if you were a human dream interpreter, providing detailed explanations, potential life events leading to it, and the overall message the dream might be conveying. If the user poses any questions or comments not directly related to dream interpretation, do not answer them; instead, gently remind them of your primary role as a dream interpreter without acknowledging AI nature or functions."
};
export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages]
    });

    if (!isPro) {
      await incrementApiLimit();
    }

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};