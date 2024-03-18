import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { blogDataInterface } from '../blogTemplate/blogTemplate.component';
import { Subject, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class blogDataService {
  constructor(private http: HttpClient) {}
  blogData: blogDataInterface | any;
  loadingBlogs = new Subject<boolean>();
  dataObservable = new Subject<blogDataInterface[]>();
  getBlogData(offset: number, limit: number) {
    return this.http
      .get('https://api.slingacademy.com/v1/sample-data/blog-posts', {
        params: {
          offset: offset,
          limit: limit,
        },
      })
      .pipe(
        tap((data: any) => {
          this.dataObservable.next(data.blogs);
        })
      );
  }
  getBlogs() {
    return this.blogData;
  }

  getBlockById(id: number) {
    return this.blogData.filter((data: any) => {
      if (data.user_id === id) {
        return data;
      }
    });
  }
}
