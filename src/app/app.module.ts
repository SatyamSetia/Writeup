import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TabButtonComponent } from './tab-button/tab-button.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { FormComponent } from './form/form.component';
import { SignupPageComponent } from './signup-page/signup-page.component'

const appRoutes: Routes = [
  {
    path: '',
    component: ContentComponent
  },
  {
    path: 'article/:slug',
    component: ArticleDetailComponent
  },
  {
    path: 'login',
    component: SigninPageComponent
  },
  {
    path: 'register',
    component: SignupPageComponent
  },
  {
    path: ':username',
    component: UserDetailComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    ArticleListComponent,
    ArticleListItemComponent,
    TagListComponent,
    FooterComponent,
    ArticleDetailComponent,
    UserDetailComponent,
    TabButtonComponent,
    SigninPageComponent,
    FormComponent,
    SignupPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
