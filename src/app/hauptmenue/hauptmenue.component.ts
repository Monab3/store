import { Component, OnInit } from '@angular/core';

import { warenkorbService } from '../../shared/services/warenkorb.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hauptmenue',
  templateUrl: './hauptmenue.component.html',
  styleUrl: './hauptmenue.component.scss'
})
export class HauptmenueComponent implements OnInit{
  navWein: String[] = [];
  produktWein: String[] =[];
  warenkorbInhalt: Observable<any> = new Observable();
  warenkorbAnzahl: Number=0;
  
  constructor(private fb: FormBuilder, private warenkorbService: warenkorbService
    ) {
      this.navWein = ['Weißwein', 'Rotwein', 'Roséwein', 'Sekt'];
  }

  //warenkorbInhalt: Observable<any> = new Observable();

  ngOnInit(): void {
    console.log("test");

    this.warenkorbService.warenkorbInhalt.subscribe((data) => {
      this.warenkorbAnzahl = data.length;
      console.log(data);
    });
  }

  warenkorbVisibility = true; 
  
  weinmenueBilder = ['../../assets/weinmenue_weisswein.jpg', '../../assets/weinmenue_rotwein.jpg', '../../assets/weinmenue_rosewein.jpg', '../../assets/weinmenue_schaumwein.jpg'];


  public toggleWarenkorb(): void {
    this.warenkorbVisibility = !this.warenkorbVisibility;
  }

}
