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

  /* Arrays */ 
  geschmaecker = ['Trocken', 'Süß', 'Herb', 'Feinherb'];
  rebsorten = ['Riesling', 'Burgunder', 'Rivaner', 'Dornfelder'];
  navWein = ['Weißwein', 'Rotwein', 'Roséwein', 'Sekt'];
  weinmenueBilder = ['../assets/weinmenue_weisswein.jpg', '../assets/weinmenue_rotwein.jpg', '../assets/weinmenue_rosewein.jpg', '../assets/weinmenue_schaumwein.jpg'];

  constructor(private rebsortenService: rebsortenService, private imageTransformSerivce: base64ToImageConverter) {
  }


  formGeschmack = new FormGroup({
    geschmack: new FormControl(''), 
    trockenCount: new FormControl(0),
    süßCount: new FormControl(0),
    herbCount: new FormControl(0),
    feinherbCount: new FormControl(0)
  });


  formRebsorte = new FormGroup({
    rebsorte: new FormControl(''),
    rieslingCount: new FormControl(1),
    burgunderCount: new FormControl(2),
    rivanerCount: new FormControl(3),
    dornfelderCount: new FormControl(4)
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
