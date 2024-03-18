import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { signupComponent } from './signup/signup.component';
import { signinComponent } from './signin/signin.component';
import { blogComponent } from './blog/blog.component';
import { blogDetailsComponent } from './blogDetails/blogDetails.component';
import { blogTemplateComponent } from './blogTemplate/blogTemplate.component';
import { authGuard } from './shared/auth.guard';
import { loginGuard } from './shared/loginGuard.guard';

const routes: Routes = [
  { path: 'signup', canActivate: [loginGuard], component: signupComponent },
  { path: 'signin', canActivate: [loginGuard], component: signinComponent },
  {
    path: 'blog',
    canActivate: [authGuard],
    component: blogComponent,
    children: [
      { path: '', canActivate: [authGuard], component: blogTemplateComponent },
    ],
  },
  {
    path: 'blogdetail/:id',
    canActivate: [authGuard],
    component: blogDetailsComponent,
  },
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: '**', redirectTo: 'signup' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
