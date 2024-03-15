import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { headerComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { signupComponent } from './signup/signup.component';
import { blogComponent } from './blog/blog.component';
import { blogDetailsComponent } from './blogDetails/blogDetails.component';
import { signinComponent } from './signin/signin.component';
import { blogDataService } from './shared/blogData.service';
import { HttpClientModule } from '@angular/common/http';
import { blogTemplateComponent } from './blogTemplate/blogTemplate.component';
import { errorComponent } from './errorComponent/errorComponent.component';
import { authService } from './shared/authService.service';
import { AddClassesDirective } from './blogDetails/blog.directive';
import { blogHomeComponent } from './blogHomeComponent/blogHomeComponent.component';
@NgModule({
  declarations: [
    AppComponent,
    headerComponent,
    signupComponent,
    blogComponent,
    blogDetailsComponent,
    errorComponent,
    blogHomeComponent,
    signupComponent,
    signinComponent,
    headerComponent,
    blogTemplateComponent,
    AddClassesDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [authService],
  bootstrap: [AppComponent],
})
export class AppModule {}
