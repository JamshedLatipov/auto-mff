import { Component, inject, OnInit } from '@angular/core';

import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('WindowToken', {
  factory: () => {
    if(typeof window !== 'undefined') {
      return window
    }
    return new Window(); // does this work?
  }
});

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private _window = inject(WINDOW);
  
  ngOnInit(): void {
    this._window.location.assign('https://plc.auction/')
  }
}
