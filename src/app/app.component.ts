import { Component } from '@angular/core';
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


  constructor() {
    this.nameChange(this.nameFormat);
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
      .replace("Instance", this.resourceData.instance);
  }
}
