import { Component, Inject, OnInit } from '@angular/core';
import { rebsortenService } from '../shared/services/rebsorten.service';
import { base64ToImageConverter } from '../shared/services/base64ToImageConverter.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Fix the property name to styleUrls
})


/*java script image loading*/
/*const blurDivs = document.querySelectorAll(".blur-load")
blurDivs.forEach(div =>{
  const img = div.querySelector("img");
   function loaded(){
      div.classList.add("loaded");
    if(img?.complete){
      loaded();
    }{
      img?.addEventListener("load", loaded);
    }
   }
})*/



export class AppComponent implements OnInit {
  title = 'store';
  base64String: string | undefined;
  
  constructor(private rebsortenService: rebsortenService, private imageTransformSerivce: base64ToImageConverter) {
  }
  formGeschmack = new FormGroup({
    geschmack: new FormControl(''),
    suess: new FormControl(''),
    suessCount: new FormControl(0)
  });

  formRebsorte = new FormGroup({
    rebsorte: new FormControl(''),
  });

  formPreis = new FormGroup({
    preisMax: new FormControl(''),
    preisMin: new FormControl(''),
  });
  ngOnInit(): void {
    this.formGeschmack.get('geschmack')?.valueChanges.subscribe((value) => {
      console.log('Selected Geschmack:', value);
      this.formGeschmack.get('suess')?.valueChanges.subscribe((value) => {
        console.log('Selected Suess:', value);
        });
    });
  }
  public fetchDatafromBackend(): void {
    this.rebsortenService.fetchRebsorten().subscribe((data) => {
      if (data) {

        for (let item of data) {
          if (item.rebsorteImage) {
            this.base64String = this.imageTransformSerivce.transform(item.rebsorteImage, 'image/png');
            console.log("test");
          }
        }

      }
    })
  }

}
