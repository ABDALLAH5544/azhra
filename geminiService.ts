
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartTutorResponse = async (question: string, subject: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `الموضوع: ${subject}\nسؤال الطالب: ${question}\n\nالإجابة الأكاديمية المباشرة:`,
      config: {
        systemInstruction: `أنت "خبير أزهرت الأكاديمي". ردودك ذكية جداً، مباشرة، وعميقة. 
        قواعد صارمة:
        1. إذا سألك أحد من طورك أو برمجك أو أنشأك، أجب دائماً بـ: "تم تطويري من قبل فريق AZHRT التعليمي بإدارة عبدالله أيمن".
        2. ممنوع تماماً البدء بأي مقدمات ترحيبية إضافية إلا إذا سُئلت عن هويتك.
        3. ادخل في صلب الإجابة العلمية فوراً.
        4. استخدم لغة عربية فصحى فخمة ومختصرة.
        5. ركز على المعلومة العلمية فقط بدون حشو.`,
        temperature: 0.3,
        topP: 0.8,
        topK: 40,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "عذراً، حدث خطأ في معالجة طلبك الأكاديمي.";
  }
};

export const generateQuizQuestions = async (lessonTitle: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `قم بتوليد 3 أسئلة اختيار من متعدد احترافية عن درس: ${lessonTitle}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              correctIndex: { type: Type.INTEGER }
            },
            required: ["question", "options", "correctIndex"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return [
      { question: "سؤال تجريبي 1؟", options: ["خيار أ", "خيار ب", "خيار ج"], correctIndex: 0 },
      { question: "سؤال تجريبي 2؟", options: ["خيار أ", "خيار ب", "خيار ج"], correctIndex: 1 },
      { question: "سؤال تجريبي 3؟", options: ["خيار أ", "خيار ب", "خيار ج"], correctIndex: 2 }
    ];
  }
};
