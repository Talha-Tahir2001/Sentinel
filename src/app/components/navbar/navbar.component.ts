import { Component, Input, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  readonly isDarkMode = input<boolean>(false);
  readonly onThemeToggle = input<() => void>(() => {});
}
