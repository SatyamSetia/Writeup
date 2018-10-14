import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    ArticleListComponent,
    ArticleListItemComponent,
    TagListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
     HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
