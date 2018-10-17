import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }   from '@angular/forms';
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
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './auth.guard';
import { NewArticleComponent } from './new-article/new-article.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentListItemComponent } from './comment-list-item/comment-list-item.component';

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
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingsComponent
  },
  {
    path: 'editor',
    canActivate: [AuthGuard],
    component: NewArticleComponent
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
    SignupPageComponent,
    SettingsComponent,
    NewArticleComponent,
    CommentSectionComponent,
    CommentListComponent,
    CommentListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
