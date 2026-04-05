import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { messages, jobRole, skills } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `You are an expert technical interviewer for a ${jobRole || "Software Engineering"} position. The candidate has listed these skills: ${skills || "General IT"}. 
      Rules:
      1. Ask ONLY ONE interview question at a time.
      2. Wait for the candidate's answer.
      3. Briefly evaluate their answer, then immediately ask the next question.
      4. Keep responses concise and professional.`,
    });

    // We skip the very first message (the AI greeting) so history starts with a 'user'
    const formattedHistory = messages.slice(1, -1).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const currentUserInput = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(currentUserInput);
    const response = await result.response;

    return NextResponse.json({ text: response.text() });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Interviewer is unavailable. Check API Key or Connection." },
      { status: 500 },
    );
  }
}
