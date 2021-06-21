import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Data} from "./data-model" 

import resourceJSON from "../../assets/resources.json";
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { group } from '@angular/animations';



@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  @ViewChild('form') ngForm!: NgForm;

  model = new Data("pip", "sharepoint", "prod", "westus", "001");
  @Output() modelEvent = new EventEmitter<Data>();

  resources: any[];
  shownResources: any[];



  constructor() {
    this.resources = resourceJSON;
    this.shownResources = this.resources;
  }

  ngOnInit() {}


  ngAfterViewInit() {

    console.log(this.ngForm)

    this.ngForm.form.get('resource')?.valueChanges.subscribe(value => {
      console.log(value)
    })
  

    this.ngForm.valueChanges?.subscribe(form => {
      // console.log(form)
      this.search(form.resource)
      this.formChange(form); 
    })      

  }
  
  formChange(form: Data) {
    this.modelEvent.emit(form);
  }

  search(term: string){
    if (term == ""){
      this.shownResources = this.resources;
      return
    }
    this.shownResources= [];
    this.resources.forEach((group: {"name": string, "services": {"name": string, "short": string}[]}) => {
      let g: {"name": string, "services": {"name": string, "short": string}[]} = {"name": group.name, "services": []}
      group.services.forEach( (service: {"name": string, "short": string}) => {
        if (service.name.toLowerCase().startsWith(term.toLowerCase())){
          g.services.push(service);
        }
      });
      if(g.services.length != 0){
        this.shownResources.push(g)
      }
    });
  }


}
