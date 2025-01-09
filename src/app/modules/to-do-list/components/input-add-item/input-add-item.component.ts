import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { IListItens } from '../../interface/IListItens.interface';

@Component({
  selector: 'app-input-add-item',
  imports: [],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild("inputText") public inputText!: ElementRef
  @Output() public outputListItens = new EventEmitter<IListItens>();
  public focusAndAddItem(value: string) {
    if (value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = "";

      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID ${timestamp}`

      this.outputListItens.emit({
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
