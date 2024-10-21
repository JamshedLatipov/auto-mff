import { Component, computed, effect, OnInit, signal, ViewChild } from '@angular/core';
import { Galleria, GalleriaModule } from 'primeng/galleria';
import { ArticleService } from '../../services/article.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ArticleResponse, CarModel, City, Country, Image } from '../../models/article';
import { environment } from '../../../environments/environment';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Title } from '@angular/platform-browser';

interface ArticleResponseExtended extends ArticleResponse {
  model: CarModel;
  city: City;
  images: {
    itemImageSrc: string;
    thumbnailImageSrc: string;
  }[];
}

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [GalleriaModule, DropdownModule, CommonModule, FormsModule, ConfirmDialogModule, ToastModule, ButtonModule, HeaderComponent, FooterComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DetailComponent implements OnInit {
  public data$: Observable<ArticleResponseExtended> | undefined;
  public countries$: Observable<Country> | undefined;

  public selectedCountry: any;
  public selectedCity: any;
  public selectedHorTab = 1;
  public selectedVerTab = 1;
  public activeIndex = 0;
  public fullScreen = false;
  public visibility = false;
  public bodyTypes: any = {
    SEDAN: 'Седан',
    WAGUN: 'Универсал',
    COUPE: 'Купе',
    HATCHBACK: 'Хаджбэк',
    MINIVAN: 'Минивен',
    PICKUP: 'Пикап',
  }
  public transmision: any = {
    AUTO: 'Автоматическая',
    VARIATOR: 'Вариатор',
    MANUAL: 'Механическая'
  }

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private messageService: MessageService, private title: Title) { }

  ngOnInit(): void {
    this.data$ = this.articleService.getArticle(this.activatedRoute.snapshot.params['id']).pipe(
      map((data) => {
        const mutatedData: any = {
          ...data,
          model: data.data?.attributes.car_model.data.attributes,
          city: data.data.attributes.city.data.attributes,
          images: (data.data.attributes?.images as any).data.map((image: any) => image?.attributes).map((image: Image) => ({
            itemImageSrc: environment.backUrl + image.url,
            thumbnailImageSrc: environment.backUrl + image.formats.thumbnail.url
          }))
        };
        this.title.setTitle(`${mutatedData.model.manufactor.data.attributes.name} ${mutatedData.model.name} ${mutatedData.data.attributes.year} from ${mutatedData.city.country.data.attributes.name} ${mutatedData.data.attributes.vin}`)
        return mutatedData
      }),
    );

    this.countries$ = this.articleService.getCountries();
  }

  clearCity() {
    this.selectedCity = null;
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'При обработке вашего запроса возникли проблемы, приносим свои извенения!',
      header: 'Серверная ошибка',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
    });
  }

  setFullScreen() {
    this.visibility = true;
    this.fullScreen = true;
  }
}
