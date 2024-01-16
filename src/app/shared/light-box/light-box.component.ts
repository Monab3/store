import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-light-box',
  templateUrl: './light-box.component.html',
  styleUrl: './light-box.component.scss'
})
export class LightBoxComponent implements OnInit{

  @Input() toogleLightBox: Subject<boolean> = new Subject<boolean>();
  @Input() slides : string[] | undefined;
  isOpen: boolean = false;
  
  ngOnInit(): void {
    if (this.toogleLightBox) {
      this.toogleLightBox.subscribe((isOpen) => {
        this.isOpen = isOpen;
      });
    }
  }

  get isModalOpen() {
    return this.isOpen;
  }

  closeModal() {
    this.isOpen = false;
    this.toogleLightBox.next(this.isOpen);
  }
}
