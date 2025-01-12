import { Injectable } from '@angular/core';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
  SchemaType,
} from '@google/generative-ai';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  constructor() {}

  genAI = new GoogleGenerativeAI(environment.API_KEY);
  generationConfig = {
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
    ],
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192, // limit output
    responseMimeType: 'application/json',
    resonseSchema: {
      type: SchemaType.OBJECT,
          properties: {
            response: {
              type: SchemaType.OBJECT,
              properties: {
                sentiment: {
                  type: SchemaType.STRING,
                  enum: [
                    'Toxic',
                    'Vulgar',
                    'Offensive',
                    'Harassment',
                    'Angry',
                    'Sad',
                    'Spam',
                    'Neutral',
                    'Sarcastic',
                    'Positive',
                    'Happy',
                    'Supportive',
                    'Constructive',
                    'Funny',
                    'Grateful',
                  ],
                },
                intensity: {
                  type: SchemaType.NUMBER,
                },
                emoji: {
                  type: SchemaType.STRING,
                },
                category: {
                  type: SchemaType.STRING,
                  enum: ['negative', 'positive', 'neutral'],
                },
                suggested_action: {
                  type: SchemaType.STRING,
                  enum: ['block', 'allow'],
                },
                reason: {
                  type: SchemaType.STRING,
                },
                message: {
                  type: SchemaType.STRING,
                },
              },
              required: [
                'sentiment',
                'intensity',
                'emoji',
                'category',
                'suggested_action',
                'reason',
              ],
            },
          },
          required: ['response'],
        },
  };


  model = this.genAI.getGenerativeModel({
    model: 'gemini-1.5-flash', // or 'gemini-pro-vision'
    ...this.generationConfig,
  });

  async analyzeText(text: string, additionalContext = '') {
    const prompt = `
    You are an expert sentiment analyst. ${additionalContext}
    The 'intensity' can be from 0 to 1. Give an emoji for the particular sentiment & intensity.
    Also include the message to show to the user typing that text.

    IMPORTANT: Respond with ONLY a JSON object, no markdown, no code blocks, no additional text:
    {
      "response": {
        "sentiment": "one of the allowed sentiments",
        "intensity": 0.5,
        "emoji": "appropriate emoji",
        "category": "positive/negative/neutral",
        "suggested_action": "block/allow",
        "reason": "explanation of the analysis",
        "message": "message for the user"
      }
    }

    Analyze this text:
    ${text}
  `;

    try {
      const result = await this.model.generateContent([prompt]);
      let responseText = result.response.text();
    
    // Clean up the response - remove markdown code blocks and any extra whitespace
    responseText = responseText.replace(/```json\s?|\s?```/g, '').trim();
      
      try {
        return JSON.parse(responseText).response;
      } catch (parseError) {
        console.error('Failed to parse response:', responseText);
        // Return a fallback response if parsing fails
        return {
          sentiment: 'Neutral',
          intensity: 0.5,
          emoji: '😐',
          category: 'neutral',
          suggested_action: 'allow',
          reason: 'Failed to analyze text',
          message: 'Sorry, there was an error analyzing your text. Please try again.'
        };
      }
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

}
