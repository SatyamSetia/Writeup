import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

  tags = [];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.getAllTags().subscribe(data => {
      this.tags = data.tags
    })
  }

}
