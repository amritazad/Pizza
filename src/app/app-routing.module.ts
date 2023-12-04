import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PizzaAppComponent } from './pizza-app/containers/pizza-app/pizza-app.component';
import { OrderStatusComponent } from './pizza-app/components/order-status/order-status.component';

const routes: Routes = [{
  path:'', redirectTo:'home',pathMatch:'full'},
  {
  path:'home', component:PizzaAppComponent,
},
{
  path: 'orderStatus', component: OrderStatusComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
