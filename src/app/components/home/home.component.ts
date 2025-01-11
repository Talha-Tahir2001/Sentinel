import { Component } from '@angular/core';
import { FeaturesComponent } from "../features/features.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeaturesComponent, FooterComponent, RouterLink],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

}
