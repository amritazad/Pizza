import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PizzaValidators } from '../../validators/pizza.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'pizza-app',
  styleUrls: ['pizza-app.component.scss'],
  template: `
    <div class="pizza-app">



      <pizza-form
        [parent]="form"
        [total]="total"
        [prices]="prices"
        (add)="addPizza()"
        (remove)="removePizza($event)"
        (toggle)="togglePizza($event)"
        (submit)="createOrder($event)">
      </pizza-form>

    </div>
  `
})
export class PizzaAppComponent implements OnInit {

  activePizza = 0;
  total = '0';
  prices: any = {
    small: { base: 100, toppings: 20 },
    medium: { base: 150, toppings: 50 },
    large: { base: 200, toppings: 100 }
  };

  form: FormGroup;
  constructor(private fb: FormBuilder, public _route:Router) {
    this.form = this.fb.group({
      details: this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        confirm: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(3)]],
        postcode: ['', [Validators.required, Validators.minLength(3)]]
      }, { validator: PizzaValidators.checkEmailsMatch }),
      pizzas: this.fb.array(
        []
      )
    });
  }

  ngOnInit() {
    let custDetails = localStorage.getItem('custDetails');
    console.log(this.form, custDetails);
    if(custDetails){
      this.form.get('details')?.setValue(JSON.parse(custDetails).details);
      console.log(this.form, custDetails);
      let pizzas = JSON.parse(custDetails).pizzas;
      if(pizzas){
      this.setPizza(JSON.parse(custDetails).pizzas);
    }else{this.addPizza();}
    }
    this.calculateTotal(this.form.get('pizzas')!.value);
    this.form.get('pizzas')!.valueChanges
      .subscribe((value: any[] | undefined) => this.calculateTotal(value));
      this.form.valueChanges.subscribe((e)=>{
        localStorage.setItem( 'custDetails',JSON.stringify(this.form.value));
    });
  }


  setPizza(items: any[]){
    console.log(items);
    const control = this.form.get('pizzas') as FormArray;
    items.forEach((item: any)=> control.push(this.fb.group({
      size: [item.size, Validators.required],
      toppings: [item.toppings]
    })));
    
  }

  createPizza() {
    return this.fb.group({
      size: ['small', Validators.required],
      toppings: [[]]
    });
  }

  addPizza() {
    const control = this.form.get('pizzas') as FormArray;
    control.push(this.createPizza());
  }

  removePizza(index: number) {
    const control = this.form.get('pizzas') as FormArray;
    control.removeAt(index);
  }

  togglePizza(index: number) {
    this.activePizza = index;
  }

  calculateTotal(value?: any[]) {
    if(value){
      const price = value.reduce((prev: number, next: any) => {
        const price = this.prices[next.size];
        return prev + price.base + (price.toppings * next.toppings.length);
      }, 0);
      this.total = price.toFixed(2);
    }
    
  }

  createOrder(order: FormGroup) {
    console.log(order.value);
    alert('Order placed');
    let id = '';
    let phoneN = this.form.get('details')?.get('phone')?.value;
    let email = this.form.get('details')?.get('email')?.value;
    id = phoneN.substring(5,10);
    id+= email.split('@')[0];
    localStorage.clear();
    this._route.navigate(['orderStatus'],{queryParams:{orderId:id}});
  }

}
