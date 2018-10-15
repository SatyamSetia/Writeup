import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.css']
})
export class TabButtonComponent implements OnInit {

  @Input() label: string;
  @Output() tabClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  btnClicked() {
    this.tabClicked.emit(`${this.label.replace(/\s+/, "")}Clicked`);
  }

}
