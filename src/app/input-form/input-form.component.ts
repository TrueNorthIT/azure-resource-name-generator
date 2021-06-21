import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Data} from "./data-model" 
@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  @ViewChild('form') ngForm!: NgForm;

  model = new Data("pip", "sharepoint", "prod", "westus", "001");
  @Output() modelEvent = new EventEmitter<Data>();


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.ngForm.valueChanges?.subscribe(form => {
      this.formChange(form); 
     
    })      

  }
  
  formChange(form: Data) {
    this.modelEvent.emit(form);
  }
}
