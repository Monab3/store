import { Component, OnInit } from '@angular/core';
import { AppRoutes } from '../../../../core/config/app-routes.config';
import { weinService } from '../../../../core/services/wein.service';
import { EmpfehlungDesHauses } from '../../../../core/models/Wein';

@Component({
  selector: 'app-danke',
  templateUrl: './danke.component.html',
  styleUrl: './danke.component.scss'
})
export class DankeComponent implements OnInit{
  appRoutes = AppRoutes;

  weinTeaser : EmpfehlungDesHauses[] | undefined;
  constructor(private weinService : weinService) { 
  }
  ngOnInit(): void {
   this.initialiseData();
  }

  initialiseData(){
    this.weinTeaser = this.weinService.getWeinTeaser();
  }

}
