import { Component, Inject, OnInit } from '@angular/core';
import { rebsortenService } from '../shared/services/rebsorten.service';
import { base64ToImageConverter } from '../shared/services/base64ToImageConverter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'] // Fix the property name to styleUrls
})



export class AppComponent implements OnInit {
  title = 'store';
  base64String: string |undefined ;


  constructor(private rebsortenService: rebsortenService, private imageTransformSerivce: base64ToImageConverter) {
   } 

  ngOnInit(): void {
    console.log("test");
  }

  public fetchDatafromBackend(): void{
      this.rebsortenService.fetchRebsorten().subscribe((data)=>{
        if(data){

          for (let item of data) {
           if(item.rebsorteImage){
            this.base64String = this.imageTransformSerivce.transform(item.rebsorteImage, 'image/png');
            console.log("test");
           }
          }

        }
      })
  }

}
