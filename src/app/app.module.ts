import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzaAppModule } from './pizza-app/pizza-app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderStatusComponent } from './pizza-app/components/order-status/order-status.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderStatusComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PizzaAppModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
