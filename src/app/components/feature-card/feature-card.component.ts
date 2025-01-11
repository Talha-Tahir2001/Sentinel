import { Component, input } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [],
  templateUrl: './feature-card.component.html',
  styles: ``
})
export class FeatureCardComponent {
  readonly title = input<string>('');
  readonly description = input<string>('');
}
