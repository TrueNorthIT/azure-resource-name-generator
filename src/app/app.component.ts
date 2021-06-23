import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Data } from './input-form/data-model';
import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialogs/reset-names-dialog.html',
})
export class ResetDialog { }

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

  constructor(private _snackBar: MatSnackBar, private clipboard: Clipboard, public dialog: MatDialog) {
    this.nameChange(this.nameFormat);
    let localNames = localStorage.getItem("savedNames");
    if (localNames){
      this.savedNames = JSON.parse(localNames);
    }
  }

  openDialog(): Observable<any> {
    return this.dialog.open(ResetDialog).afterClosed()
  }

  displayMessage(messgae: string) {
    this._snackBar.open(messgae);
  }

  saveName(newName: string){
    this.savedNames.push(newName);
    const jsonData = JSON.stringify(this.savedNames);
    localStorage.setItem('savedNames', jsonData);
  }
  
  removeName(event: any){
    let name = event.target.closest("aside").querySelector("p").innerHTML;
    this.savedNames.splice(this.savedNames.indexOf(name), 1);
  }

  copyName(index: number){
    this.clipboard.copy(this.savedNames[index]);
    this.displayMessage("Coppied to clipboard!");
  }

  copyNames(){
    this.clipboard.copy(this.savedNames.join("\n"));
    this.displayMessage("Coppied all to clipboard!");
  }
  resetNames() {
    this.openDialog().subscribe(response => {
      console.log(response)
      if (response === "true"){ 
        this.savedNames = [];
        localStorage.removeItem("savedNames");

       }
    });
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
