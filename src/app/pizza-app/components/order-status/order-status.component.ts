import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
export class OrderStatusComponent implements OnInit {
  orderId: string = '';

  constructor(public router: ActivatedRoute  ){}
  ngOnInit(): void {
    this.router.queryParams
      .subscribe(params => {
        
        this.orderId = params['orderId'];
       
      }
    );
  }


}
