import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Data } from '../input-form/data-model';

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

  changeSelection(event: any, newSelection: string) {
    document.getElementsByClassName("mat-accent")[0].classList.remove("mat-accent")
    event.target.classList.add("mat-accent");
    this.selected = newSelection;
    this.selectedChange.emit(this.selected);
  }

  constructor() { }

  ngOnInit() {
    this.onResize();
  }

  onResize() {
    if (window.innerWidth <= 400) { this.rowHeight = "2:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 450) { this.rowHeight = "2.5:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 600) { this.rowHeight = "3:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 900) { this.rowHeight = "4:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 1200) { this.rowHeight = "6:1"; this.breakpoint = 1 } else
    if (window.innerWidth <= 1450) { this.rowHeight = "8:1"; this.breakpoint = 1;} else
    if (window.innerWidth >= 2600) { this.rowHeight = "6:1"; this.breakpoint = 2;} else
    {this.rowHeight = "4:1"; this.breakpoint = 2;}
  
}
}
