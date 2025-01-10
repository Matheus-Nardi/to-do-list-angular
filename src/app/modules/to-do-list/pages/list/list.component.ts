import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItens } from '../../interface/IListItens.interface';

@Component({
  selector: 'app-list',
  imports: [InputAddItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  public addItem = signal<boolean>(true);

  #setListItems = signal<IListItens[]>(this.#parseItems());
  public getListItems = this.#setListItems.asReadonly();

  #parseItems(){
    return JSON.parse(localStorage.getItem('@my-list') || '[]')
  }

  public getInputAndAddItem(value:IListItens){
    localStorage.setItem('@my-list', JSON.stringify([...this.#setListItems(), value]));

    return this.#setListItems.set(this.#parseItems())
  }
}
