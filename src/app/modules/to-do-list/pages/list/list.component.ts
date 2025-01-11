import { Component, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItensComponent } from '../../components/input-list-itens/input-list-itens.component';
import { ElocalStorage } from '../../enum/ELocalStorage.enum';
import { IListItens } from '../../interface/IListItens.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [InputAddItemComponent, InputListItensComponent, DatePipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  public date = signal(new Date());

  public addItem = signal<boolean>(true);

  #setListItems = signal<IListItens[]>(this.#parseItems());
  public getListItems = this.#setListItems.asReadonly();

  #parseItems() {
    return JSON.parse(localStorage.getItem(ElocalStorage.MY_LIST) || '[]')
  }

  public getInputAndAddItem(value: IListItens) {
    localStorage.setItem(ElocalStorage.MY_LIST, JSON.stringify([...this.#setListItems(), value]));

    return this.#setListItems.set(this.#parseItems())
  }

  public listItensStage(value: 'pending' | 'completed') {
    return this.getListItems().filter((res: IListItens) => {
      if (value === 'pending') {
        return !res.checked;
      }
      if (value === 'completed') {
        return res.checked;
      }

      return res;
    })
  }

  public updateItenCheckbox(newItem: { id: string, checked: boolean }) {
    this.#setListItems.update((oldValue: IListItens[]) => {
      oldValue.forEach((res) => {
        if (res.id === newItem.id) {
          res.checked = newItem.checked;
        }
      });
      return oldValue;
    });

    return localStorage.setItem(ElocalStorage.MY_LIST, JSON.stringify(this.#setListItems()))
  }

  public updateItenText(newItem: { id: string, value: string }) {
    this.#setListItems.update((oldValue: IListItens[]) => {
      oldValue.forEach((res) => {
        if (res.id === newItem.id) {
          res.value = newItem.value;
        }
      });
      return oldValue;
    });

    return localStorage.setItem(ElocalStorage.MY_LIST, JSON.stringify(this.#setListItems()))
  }
  public deleteIten(id: string) {

    Swal.fire({
      title: "Tem certeza ?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, delete esse item"
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItems.update((oldValue: IListItens[]) => {
          return oldValue.filter((res) => res.id !== id);
        });

        return this.#updateLocalStorage()
      }
    });

  }


  #updateLocalStorage() {
    return localStorage.setItem(ElocalStorage.MY_LIST, JSON.stringify(this.#setListItems()));
  }

  public deleteAllItens() {

    Swal.fire({
      title: "Tem certeza ?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, delete todos os itens"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ElocalStorage.MY_LIST);
        return this.#setListItems.set(this.#parseItems());
      }
    });

  }
}
