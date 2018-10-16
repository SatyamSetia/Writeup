import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() label:any;
  @Output() formInputs = new EventEmitter();

  userInputs = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  isSignupForm: boolean;

  constructor() { }

  ngOnInit() {
    this.isSignupForm = this.label=='Sign up'?true:false;
  }

  onSubmit() {
    console.log(this.userInputs.value)
    this.formInputs.emit(this.userInputs.value)
  }

}
