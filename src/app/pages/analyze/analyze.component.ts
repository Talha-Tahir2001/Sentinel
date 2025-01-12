
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { SentimentResponse } from '../../models/sentiment-response';

@Component({
  selector: 'app-analyze',
  standalone: true,
  imports: [FormsModule, ],
  templateUrl: './analyze.component.html',
  styles: ``
})
export class AnalyzeComponent {

  geminiService: GeminiService = inject(GeminiService);

  text = signal('');
  result = signal<SentimentResponse | null>(null);
  isAnalyzing = signal(false);
  error = signal<string | null>(null);

  onTextInput(event: Event) {
    const input = event.target as HTMLTextAreaElement;
    this.text.set(input.value);
  }

  async analyzeText() {
    try {
      this.error.set(null);
      this.isAnalyzing.set(true);
      const result = await this.geminiService.analyzeText(this.text());
      this.result.set(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      this.error.set('Failed to analyze text. Please try again.');
    } finally {
      this.isAnalyzing.set(false);
    }
  }

  


}
