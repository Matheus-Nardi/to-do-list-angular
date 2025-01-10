import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { IListItens } from '../../interface/IListItens.interface';

@Component({
  selector: 'app-input-add-item',
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @Input({ required: true }) public inputListItens: IListItens[] = [];
  @ViewChild("inputText") public inputText!: ElementRef
  @Output() public outputAddListItens = new EventEmitter<IListItens>();
  public focusAndAddItem(value: string) {
    if (value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = "";

      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID ${timestamp}`

      this.outputAddListItens.emit({
        id,
        checked: false,
        value
      });

      console.log({
        id,
        checked: false,
        value
      });
      return this.inputText.nativeElement.focus();
    }
  }
}
