import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Data } from '../input-form/data-model';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface Parameter {
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
  @Input() sideBarOpen = true;

  params: Parameter[] = [
    { name: "Resource" },
    { name: "Application" },
    { name: "Environment" },
    { name: "Region" },
    { name: "Instance" }
  ];

  formats: string[] = [
    "Resource-Application-Instance-Region-Environment",
    "Resource-Application-Environment-Region-Instance",
    "Application-Resource-Region-Environment-Instance",
    "Region-Environment-Application-Resource-Instance",
    "Resource-Application-Instance-Environment-Region"
  ]

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.onResize();
  }

  customToString(): string {
    let str = ""
    this.params.forEach(p => {
      str += p.name + "-";
    });
    return str.substr(0, str.length - 1);
  }

  displayMessage(messgae: string) {
    this._snackBar.open(messgae);
  }

  changeSelection(event: any, newSelection: string) {
    if (event.target.classList.contains("mat-button-wrapper")) return;
    let card = event.target.closest("mat-card");
    document.getElementsByClassName("mat-accent")[0].classList.remove("mat-accent")
    card.querySelector("button").classList.add("mat-accent");
    if (newSelection === "custom") return this.customSelection();
    this.selected = newSelection;
    this.selectedChange.emit(this.selected);
  }

  customSelection() {
    this.selectedChange.emit(this.customToString());
  }


  drop(event: CdkDragDrop<Parameter[]>) {
    moveItemInArray(this.params, event.previousIndex, event.currentIndex);
    if (this.selected === "custom") this.customSelection();
  }

  onResize() {
    
    if (window.innerWidth <= 500) { this.rowHeight = "2:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 650) { this.rowHeight = "2.5:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 750) { this.rowHeight = "3.5:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 800 && this.sideBarOpen) { this.rowHeight = "1.5:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 950 && this.sideBarOpen) { this.rowHeight = "2:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 950) { this.rowHeight = "4:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 1200 && this.sideBarOpen) { this.rowHeight = "4:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 1200) { this.rowHeight = "5:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 1350 && this.sideBarOpen) { this.rowHeight = "4.5:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 1450 && this.sideBarOpen) { this.rowHeight = "5:1"; this.breakpoint = 1; } else
    if (window.innerWidth <= 1450) { this.rowHeight = "6:1"; this.breakpoint = 1; } else
    if (window.innerWidth <= 2100) { this.rowHeight = "3:1"; this.breakpoint = 2; } else
    if (window.innerWidth <= 2400) { this.rowHeight = "3.5:1"; this.breakpoint = 2; } else
    if (window.innerWidth <= 2600) { this.rowHeight = "4:1"; this.breakpoint = 2; } else
    if (window.innerWidth >= 2800) { this.rowHeight = "5:1"; this.breakpoint = 2; } else { this.rowHeight = "4:1"; this.breakpoint = 2; }

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

  ngOnChanges() {
    const grid = document.getElementsByName("grid")[0];

    if (this.sideBarOpen) {

      grid.classList.remove("grid");
      grid.classList.add("grid-sidebar");
    } else {
      grid.classList.add("grid");
      grid.classList.remove("grid-sidebar");
    }
  }


}
