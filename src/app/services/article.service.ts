import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ArticleResponse, Country } from "../models/article";

@Injectable({providedIn: 'root'})
export class ArticleService {
    constructor(private http: HttpClient) { }

    getArticle(id: string): Observable<ArticleResponse> {
        const params = new HttpParams({
            fromObject: {
                "populate[car_model][populate][0]": "manufactor",
                "populate[city][populate][0]": "country",
                "populate": "cover",
                'populate[images][populate][0]': "images",
            }
        })
        return this.http.get<ArticleResponse>(`${environment.backUrl}/api/atricles/${id}`, {
            params
        });
    }

    searchArticle(vin: string): Observable<ArticleResponse> {
        const params = new HttpParams({
            fromObject: {
                "populate[car_model][populate][0]": "manufactor",
                "populate[city][populate][0]": "country",
                "populate": "cover",
                'populate[images][populate][0]': "images",
                "filters[$or][0][vin][$containsi]": vin,
                "filters[$or][1][lot_number][$containsi]": vin,
            }
        })
        return this.http.get<ArticleResponse>(`${environment.backUrl}/api/atricles`, {
            params
        });
    }

    getCountries(): Observable<Country> {
        const params = new HttpParams({
            fromObject: {
                "populate": "*",
            }
        })
        return this.http.get<Country>(`${environment.backUrl}/api/countries`, {
            params
        });
    }

}