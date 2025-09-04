import { GoogleGenAI } from "@google/genai";

// Defer client initialization to avoid app crash on load if API key is missing.
// The key is checked in App.tsx to provide a user-friendly error message.
let ai: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (ai) {
    return ai;
  }
  
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    // This should ideally not be hit if the check in App.tsx is working.
    // It's a fallback to prevent calls with an undefined key.
    console.error("API_KEY is not configured.");
    throw new Error("API_KEY is not configured.");
  }

  ai = new GoogleGenAI({ apiKey: API_KEY });
  return ai;
}

interface GeneratedImageResult {
  imageUrl: string;
  fromCache: boolean;
  error: boolean;
}

const generateImage = async (prompt: string): Promise<GeneratedImageResult> => {
  const cacheKey = `gemini_image_${prompt.replace(/\s/g, '').slice(0, 50)}`;

  try {
    const cachedImage = localStorage.getItem(cacheKey);
    if (cachedImage) {
      console.log(`Serving image from cache for prompt: "${prompt}"`);
      return { imageUrl: cachedImage, fromCache: true, error: false };
    }
  } catch (error) {
    console.warn("Could not access localStorage for caching:", error);
  }
  
  try {
    const client = getClient();
    const response = await client.models.generateImages({
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
      const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
      try {
        localStorage.setItem(cacheKey, imageUrl);
      } catch (error) {
        console.warn("Could not save image to localStorage:", error);
      }
      return { imageUrl, fromCache: false, error: false };
    }
    throw new Error("No images generated.");
  } catch (error) {
    console.error(`Error generating image for prompt "${prompt}":`, error);
    // Return a placeholder image URL on failure
    const placeholderUrl = `https://picsum.photos/seed/${prompt.replace(/\s/g, '')}/1280/720`;
    return { imageUrl: placeholderUrl, fromCache: false, error: true };
  }
};

export interface BrickImageResult {
  imageUrl: string;
  isPlaceholder: boolean;
}

export interface BrickImages {
  firstClassImg: BrickImageResult;
  secondClassImg: BrickImageResult;
}

export const generateBrickImages = async (): Promise<BrickImages> => {
    const firstClassPrompt = "Photorealistic closeup of a perfectly stacked pallet of new, premium red clay bricks. The bricks are uniform in shape and color, with sharp edges. The lighting is bright and clean, highlighting the fine texture of the bricks. Professional studio shot.";
    const secondClassPrompt = "A neat pile of standard red construction bricks at an outdoor building site. The bricks show slight variations in color and texture, some with minor chips, conveying a sense of practical use. The background is slightly blurred, focusing on the bricks. Natural daylight.";

    const [firstClassResult, secondClassResult] = await Promise.all([
        generateImage(firstClassPrompt),
        generateImage(secondClassPrompt)
    ]);
    
    return { 
        firstClassImg: { imageUrl: firstClassResult.imageUrl, isPlaceholder: firstClassResult.error },
        secondClassImg: { imageUrl: secondClassResult.imageUrl, isPlaceholder: secondClassResult.error }
    };
};

export const generateHeroImage = async (): Promise<GeneratedImageResult> => {
    const prompt = "A stunning, wide-angle photograph of a modern architectural home under construction at dawn. The foreground features neat stacks of high-quality red bricks. The rising sun casts a warm, optimistic glow on the scene. The image should convey quality, progress, and reliability.";
    return generateImage(prompt);
};