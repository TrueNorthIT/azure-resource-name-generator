import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Data } from '../input-form/data-model';

@Component({
  selector: 'app-format-selector',
  templateUrl: './format-selector.component.html',
  styleUrls: ['./format-selector.component.scss']
})
export class FormatSelectorComponent implements OnInit {

  selected:string = "Resource-Application-Instance-Region-Environment";
  @Output() selectedChange = new EventEmitter<string>();

  @Input() data!: Data;

  changeSelection(event: any, newSelection: string){
    document.getElementsByClassName("mat-accent")[0].classList.remove("mat-accent")
    event.target.classList.add("mat-accent");
    this.selected = newSelection;
    this.selectedChange.emit(this.selected);
  }

  constructor() {   }

  ngOnInit(): void {  }

}
