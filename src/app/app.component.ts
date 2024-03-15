import { Component, HostListener, OnInit } from '@angular/core';
import { blogDataService } from './shared/blogData.service';
import { of, take } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angularTest9';
  offset = 1;
  limit = 5;
  constructor(
    private blogDataService: blogDataService,
    private router: Router
  ) {}
  ngOnInit() {
    this.blogDataService
      .getBlogData(this.offset, this.limit)
      .subscribe((data: any) => {
        this.blogDataService.blogData = data.blogs;
        this.blogDataService.dataObservable.next(data.blogs);
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    if (this.router.routerState.snapshot.url === '/blog') {
      if (
        window.innerHeight + window.scrollY + 1 >=
        document.body.offsetHeight
      ) {
        this.offset++;
        this.blogDataService
          .getBlogData(this.offset, this.limit)
          .subscribe((data: any) => {
            if (this.blogDataService.blogData.length > 1) {
              for (let index = 0; index < data.blogs.length; index++) {
                this.blogDataService.blogData.push(data.blogs[index]);
              }
              console.log(this.blogDataService.blogData);
            } else {
              this.blogDataService.blogData = data.blogs;
            }
          });
      }
    }
  }
}
