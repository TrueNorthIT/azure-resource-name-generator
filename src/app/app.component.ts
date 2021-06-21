import { Component } from '@angular/core';
import { Data } from './input-form/data-model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'azure-resource-name-generator';
  resourceData!: Data;

  setData(newData: Data) {
    this.resourceData = newData;
  }
}
