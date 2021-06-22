import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Data} from "./data-model" 

import resourceJSON from "../../assets/resources.json";
import regionsJSON from "../../assets/regions.json";



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

  regions: any[];
  shownRegions: any[];


  constructor() {
    this.resources = resourceJSON;
    this.shownResources = this.resources;

    this.regions = regionsJSON;
    this.shownRegions = this.regions;
  }

  ngOnInit() {}


  ngAfterViewInit() {

    this.ngForm.valueChanges?.subscribe(form => {
      if (form.resource) this.searchResource(form.resource);
      if (form.region) this.searchRegion(form.region);
      this.formChange(form); 
    })      

  }
  
  formChange(form: Data) {
    this.modelEvent.emit(form);
  }

  searchResource(term: string){
    if (term == ""){
      this.shownResources = this.resources;
      return;
    }
    this.shownResources= [];
    this.resources.forEach((group: {"name": string, "services": {"name": string, "short": string}[]}) => {
      let g: {"name": string, "services": {"name": string, "short": string}[]} = {"name": group.name, "services": []}
      group.services.forEach( (service: {"name": string, "short": string}) => {
        if (service.name.toLowerCase().includes(term.toLowerCase())){
          g.services.push(service);
        }
      });
      if(g.services.length != 0){
        this.shownResources.push(g)
      }
    });
  }

  searchRegion(term: string){
    if (term == ""){
      this.shownRegions = this.regions;
      return;
    }
    this.shownRegions= [];
    this.regions.forEach((region: any) => {
        if (region.name.toLowerCase().includes(term.toLowerCase())){
          this.shownRegions.push(region);
        }
   
    });
  }


}
