
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * جلب رد من المعلم الذكي حول سؤال محدد في الدرس.
 */
export const getSmartTutorResponse = async (question: string, subject: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `الموضوع: ${subject}\nسؤال الطالب: ${question}\n\nالإجابة الأكاديمية بأسلوب "أزهرت" التعليمي الفخم:`,
      config: {
        systemInstruction: `أنت "أوراكل أزهرت" - المعلم الذكي الأكثر تطوراً في مصر. 
        قواعدك:
        1. إذا سألت عن هويتك، أجب بفخر: "أنا أوراكل، رفيقك الذكي في منصة أزهرت، تم تطويري وبرمجتي بواسطة فريق AZHRT بإشراف المبدع عبدالله أيمن".
        2. كن دقيقاً علمياً، استند إلى المناهج المصرية الرسمية.
        3. استخدم لغة عربية فصيحة، محفزة، وقوية.
        4. ركز على التبسيط والعمق في آن واحد.
        5. تجنب الحشو، وادخل في الإجابة فوراً.`,
        temperature: 0.4,
        topP: 0.8,
        topK: 40,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "عذراً يا بطل، يبدو أن هناك تداخلاً في الترددات الإمبراطورية. حاول مرة أخرى!";
  }
};

/**
 * توليد أسئلة اختبار اختيار من متعدد بشكل ديناميكي بناءً على محتوى الدرس.
 */
export const generateQuizQuestions = async (lessonTitle: string, description: string = "") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `بناءً على درس عنوانه: "${lessonTitle}" ووصفه: "${description}"، قم بتوليد 3 أسئلة اختيار من متعدد احترافية وصعبة للمتفوقين.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: "نص السؤال" },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                minItems: 4,
                maxItems: 4,
                description: "أربعة خيارات ذكية"
              },
              correctIndex: { type: Type.INTEGER, description: "مؤشر الإجابة الصحيحة (0-3)" },
              explanation: { type: Type.STRING, description: "شرح علمي دقيق لسبب صحة الإجابة" }
            },
            required: ["question", "options", "correctIndex", "explanation"]
          }
        }
      }
    });
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    // نظام النسخ الاحتياطي في حال فشل الـ API
    return [
      { 
        question: "ما هو حجر الزاوية في الكلمة العربية الذي لا يقبل الإعراب؟", 
        options: ["الاسم النكرة", "الفعل الماضي", "الحروف جميعاً", "جمع التكسير"], 
        correctIndex: 2,
        explanation: "جميع الحروف في اللغة العربية مبنية دائماً ولا محل لها من الإعراب."
      },
      { 
        question: "أي من هذه العلامات تعتبر علامة 'حصرية' للأسماء فقط؟", 
        options: ["دخول السين", "التنوين", "الجزم", "تاء التأنيث الساكنة"], 
        correctIndex: 1,
        explanation: "التنوين هو من خصائص الأسماء فقط ولا يدخل على الأفعال أو الحروف."
      }
    ];
  }
};
