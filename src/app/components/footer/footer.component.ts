import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WINDOW } from '../header/header.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private _window = inject(WINDOW);

  goToHome() {
    this._window.location.href = 'https://plc.auction/';
  }
}
