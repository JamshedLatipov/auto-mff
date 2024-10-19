import { Component, DestroyRef, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticleResponse, Country } from '../../models/article';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ArticleService } from '../../services/article.service';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { uniqBy } from 'lodash';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DropdownModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public countries$: Observable<Country> | undefined;
  public results$: Observable<any> | undefined;
  public backURL = environment.backUrl;
  selectedCountry: any = {
    attributes: {
      "name": 'Tajikistan',
      "code": 'tajikistan',
    }
  };
  searchControl: FormControl = new FormControl();

  constructor(private articleService: ArticleService, private destroyRef: DestroyRef) {
    this.countries$ = this.articleService.getCountries().pipe(
      map((data) => {
        data.data.unshift(this.selectedCountry);
        data.data = uniqBy(data.data, (i) => i.attributes.code);
        return data;
      })
    );

    this.results$ = this.searchControl.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
      switchMap(value => this.articleService.searchArticle(value)),
    )
  }
}
