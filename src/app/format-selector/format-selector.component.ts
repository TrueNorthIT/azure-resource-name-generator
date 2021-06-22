import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Data } from '../input-form/data-model';

export interface Parameter {
  name: string;
}

export interface Vegetable {
  name: string;
}

@Component({
  selector: 'app-format-selector',
  templateUrl: './format-selector.component.html',
  styleUrls: ['./format-selector.component.scss']
})
export class FormatSelectorComponent implements OnInit {

  breakpoint = 2;
  rowHeight = "8:1"
  selected: string = "Resource-Application-Instance-Region-Environment";
  @Output() selectedChange = new EventEmitter<string>();
  @Input() data!: Data;

  params: Parameter[] = [
    { name: "Resource" },
    { name: "Application" },
    { name: "Environment" },
    { name: "Region" },
    { name: "Instance" }
  ];

  constructor() { 
    console.log(this.customToString());
  }

  ngOnInit() {
    this.onResize();
  }

  customToString(): string {
    let str = ""
    this.params.forEach(p => {
      str += p.name + "-";
    });
    return str.substr(0, str.length-1);
  }


  changeSelection(event: any, newSelection: string) {
    document.getElementsByClassName("mat-accent")[0].classList.remove("mat-accent")
    event.target.classList.add("mat-accent");
    this.selected = newSelection;
    this.selectedChange.emit(this.selected);
  }



  drop(event: CdkDragDrop<Parameter[]>) {
    moveItemInArray(this.params, event.previousIndex, event.currentIndex);
  }

  onResize() {
    if (window.innerWidth <= 400) { this.rowHeight = "2:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 450) { this.rowHeight = "2.5:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 600) { this.rowHeight = "3:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 900) { this.rowHeight = "4:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 1200) { this.rowHeight = "6:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 1450) { this.rowHeight = "8:1"; this.breakpoint = 1; } else
    if (window.innerWidth >= 2600) { this.rowHeight = "6:1"; this.breakpoint = 2; } else { this.rowHeight = "4:1"; this.breakpoint = 2; }

  }

  generateName(nameFormat: string): string {
    let name = nameFormat;
    name = nameFormat.replace("Resource", this.data.resource)
      .replace("Application", this.data.name)
      .replace("Environment", this.data.environment)
      .replace("Region", this.data.region)
      .replace("Instance", this.data.instance)
      .replace("--", "-");
    if (name.endsWith("-")) name = name.substr(0, name.length - 1);
    return name
  }


}
