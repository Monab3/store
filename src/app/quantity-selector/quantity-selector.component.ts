// quantity-selector.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss']
})
export class QuantitySelectorComponent implements OnInit {
  @Input() product: any;
  @Output() valueChanged = new EventEmitter<number>();

  counterForm: FormGroup | undefined;
  preis: number = 0;

  ngOnInit(): void {
    this.initializeCounterForProduct();
  }

  initializeCounterForProduct() {
    this.preis= this.product.preis;
    this.counterForm = new FormGroup({});
    this.counterForm?.addControl('product', new FormControl(1, [Validators.min(1)]));
  }

  handleMinus() {
    const control = this.counterForm?.get('product');
    if (control) {
      const currentValue = control.value;
      if (currentValue >= 2) {
        control.setValue(currentValue - 1);
        this.preis = this.product.preis * (currentValue - 1);
        this.emitValueChanged();
      } else {
        control.setValue(1);
      }
    }
  }

  handlePlus() {
    const control = this.counterForm?.get('product');
    if (control) {
      const currentValue = control.value;
      this.preis = this.product.preis * (currentValue + 1);
      control.setValue(currentValue + 1);
      this.emitValueChanged();
    }
  }

  onInputChange(event: Event) {
    // Handle any additional logic on input change if needed
    event.preventDefault(); // Ensure preventDefault() is called if needed
    this.emitValueChanged();
  }

  private emitValueChanged() {
    const value = this.counterForm?.get('product')?.value;
    if (value !== undefined) {
      this.preis = this.product.preis * (value);
      this.valueChanged.emit(value);
    }
  }
}
