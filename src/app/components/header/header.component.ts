import { Component, DestroyRef, inject, InjectionToken, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticleResponse, Country } from '../../models/article';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ArticleService } from '../../services/article.service';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { uniqBy } from 'lodash';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
const DEFAULT_COUNTRY = {
  id: 1000000,
  attributes: {
    "name": 'Tajikistan',
    "code": 'tajikistan',
    delivery: "850",
    cities: [],
  }
}

export const WINDOW = new InjectionToken<Window>('WindowToken', {
  factory: () => {
    if (typeof window !== 'undefined') {
      return window
    }
    return new Window(); // does this work?
  }
});

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DropdownModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public countries: Country | undefined;
  public results$: Observable<any> | undefined;
  public backURL = environment.backUrl;
  searchControl: FormControl = new FormControl();
  countryControl: FormControl = new FormControl(DEFAULT_COUNTRY);
  DEFAULT_COUNTRY = DEFAULT_COUNTRY;
  private _window = inject(WINDOW);

  constructor(private articleService: ArticleService, private destroyRef: DestroyRef) {

    this.articleService.getCountries().subscribe((data) => {
      this.countries = data;
      this.countryControl.setValue(this.countries.data[0]);
    }
    );

    this.results$ = this.searchControl.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
      switchMap(value => this.articleService.searchArticle(value)),
    )
  }

  goToHome() {
    this._window.location.href = 'https://plc.auction/';
  }
}
