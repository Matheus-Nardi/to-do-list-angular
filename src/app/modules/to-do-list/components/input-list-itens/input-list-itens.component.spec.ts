import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputListItensComponent } from './input-list-itens.component';

describe('InputListItensComponent', () => {
  let component: InputListItensComponent;
  let fixture: ComponentFixture<InputListItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputListItensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputListItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
