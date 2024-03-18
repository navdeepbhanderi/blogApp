import { AfterViewInit, Component, OnInit } from '@angular/core';
import { blogDataService } from '../shared/blogData.service';
import { first, take } from 'rxjs';

export interface blogDataInterface {
  category: string;
  content_html: string;
  content_text: string;
  created_at: string;
  description: string;
  id: number;
  photo_url: string;
  title: string;
  updated_at: string;
  user_id: number;
}
@Component({
  selector: 'app-blog-template',
  templateUrl: './blogTemplate.component.html',
  styleUrls: ['./blogTemplate.component.scss'],
})
export class blogTemplateComponent implements OnInit {
  blogInfo: blogDataInterface[] | any;
  offset = 1;
  limit = 10;
  isLoading = true;
  constructor(private blogDataService: blogDataService) {}

  ngOnInit() {
    this.blogInfo = this.blogDataService.getBlogs();
    console.log(this.blogInfo);
    if (!this.blogInfo) {
      this.blogDataService.dataObservable.subscribe((data: any) => {
        this.blogInfo = this.blogDataService.blogData;
      });
    }

    this.blogDataService.loadingBlogs.subscribe((data) => {
      this.isLoading = data;
    });
  }
}
