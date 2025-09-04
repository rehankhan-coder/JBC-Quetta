
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume the API key is always present.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const generateImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    throw new Error("No images generated.");
  } catch (error) {
    console.error(`Error generating image for prompt "${prompt}":`, error);
    // Return a placeholder image URL on failure
    return `https://picsum.photos/seed/${prompt.replace(/\s/g, '')}/1280/720`;
  }
};

export const generateBrickImages = async (): Promise<{ firstClassImg: string; secondClassImg: string }> => {
    const firstClassPrompt = "A clean, uniform stack of high-quality red construction bricks, photorealistic, sharp focus, construction site background.";
    const secondClassPrompt = "A pile of standard, budget-friendly construction bricks, some variation in color and texture, realistic outdoor setting.";

    const [firstClassImg, secondClassImg] = await Promise.all([
        generateImage(firstClassPrompt),
        generateImage(secondClassPrompt)
    ]);
    
    return { firstClassImg, secondClassImg };
};
