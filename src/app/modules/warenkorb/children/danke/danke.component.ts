import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppRoutes } from '../../../../core/config/app-routes.config';
import { weinService } from '../../../../core/services/wein.service';
import { cartService } from '../../../../core/services/cart.service';
import { Event } from '../../../../core/models/Event';

@Component({
  selector: 'app-danke',
  templateUrl: './danke.component.html',
  styleUrl: './danke.component.scss'
})
export class DankeComponent implements OnInit, OnDestroy{
  appRoutes = AppRoutes;

  eventTeaser : Event | undefined;
  constructor(private weinService : weinService, private cartService: cartService) { 
  }
  ngOnDestroy(): void {
    this.cartService.clearCart();
  }
  ngOnInit(): void {
   this.initialiseData();
  }

  initialiseData(){
    this.eventTeaser = this.weinService.getEventTeaser();
  }

}
