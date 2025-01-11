export interface SentimentResponse {
  sentiment: string;
  intensity: number;
  emoji: string;
  category: 'negative' | 'positive' | 'neutral';
  suggested_action: 'block' | 'allow';
  reason: string;
  message: string;
}
