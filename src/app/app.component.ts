import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Data } from './input-form/data-model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'azure-resource-name-generator';
  resourceData: Data = new Data("pip", "my-ip", "prod", "westus", "001");
  nameFormat: string = "Resource-Application-Instance-Region-Environment";
  name: string = "";

  savedNames: string[] = [];

  sideBarOpen = true;


  constructor(private _snackBar: MatSnackBar) {
    this.nameChange(this.nameFormat);
  }

  displayMessage(messgae: string) {
    this._snackBar.open(messgae);
  }

  saveName(newName: string){
    this.savedNames.push(newName);
  }
  
  removeName(event: any){
    console.log(event)
    let name = event.target.closest("div").querySelector("p").innerHTML;
    this.savedNames.splice(this.savedNames.indexOf(name), 1);
  }

  resetNames() {
    this.savedNames = [];
  }
  
  toggleSideBar(){ 
    this.sideBarOpen = !this.sideBarOpen;
  }

  setData(newData: Data) {
    this.resourceData = newData;
    this.nameChange(this.nameFormat);
  }

  nameChange(newName: any){
    this.nameFormat = newName;
    this.name = this.nameFormat.replace("Resource", this.resourceData.resource)
      .replace("Application", this.resourceData.name)
      .replace("Environment", this.resourceData.environment)
      .replace("Region", this.resourceData.region)
      .replace("Instance", this.resourceData.instance)
      .replace("--", "-");
    if (this.name.endsWith("-")) this.name = this.name.substr(0, this.name.length-1);
  }
}
