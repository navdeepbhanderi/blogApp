import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { signupComponent } from './signup/signup.component';
import { signinComponent } from './signin/signin.component';
import { blogComponent } from './blog/blog.component';
import { blogDetailsComponent } from './blogDetails/blogDetails.component';
import { blogTemplateComponent } from './blogTemplate/blogTemplate.component';

const routes: Routes = [
  { path: 'signup', component: signupComponent },
  { path: 'signin', component: signinComponent },
  {
    path: 'blog',
    component: blogComponent,
    children: [
      { path: '', component: blogTemplateComponent },
      { path: ':id', component: blogDetailsComponent },
    ],
  },
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: '**', redirectTo: 'signup' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
