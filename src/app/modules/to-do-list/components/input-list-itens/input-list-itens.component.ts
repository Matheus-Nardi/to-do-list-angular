import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItens } from '../../interface/IListItens.interface';

@Component({
  selector: 'app-input-list-itens',
  imports: [],
  templateUrl: './input-list-itens.component.html',
  styleUrl: './input-list-itens.component.scss'
})
export class InputListItensComponent {

  @Input({ required: true }) public inputListItens: IListItens[] = [];

  @Output() public outputUpdateItemCheckbox = new EventEmitter<{ id: string, checked: boolean }>();


  public updateItemCheckbox(id: string, checked: boolean) {
    return this.outputUpdateItemCheckbox.emit({ id, checked });
  }
  @Output() public outputUpdateItemText = new EventEmitter<{ id: string, value: string }>();


  public updateItemText(id: string, value: string) {
    return this.outputUpdateItemText.emit({ id, value });
  }

  @Output() public outputDeleteItem = new EventEmitter<string>();


  public deleteItem(id: string) {
    return this.outputDeleteItem.emit(id);
  }
}
