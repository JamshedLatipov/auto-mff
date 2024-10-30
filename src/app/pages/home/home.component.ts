import { Component, inject, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  list$: any;
  currentPage: number = 1;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.list$ = this.articleService.listArticle(this.currentPage).pipe(map(data => {
      (data.meta as any).pagination = (data.meta as any).pagination || {};
      (data.meta as any).pagination['pageList'] = [].constructor((data.meta as any).pagination.pageCount);
      return data as any
    })) as Observable<any>;
    this.currentPage = this.activatedRoute.snapshot.queryParams['id'] || 1;
  }
}
