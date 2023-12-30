import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { bewertungService } from '../../core/services/bewertung.service';
import { Bewertung } from '../../core/models/Bewertung';
import { Observable } from 'rxjs';
import { BewertungWrapper } from '../../core/models/BewertungWrapper';
@Component({
  selector: 'app-bewertungen',
  templateUrl: './bewertungen.component.html',
  styleUrl: './bewertungen.component.scss'
})
export class BewertungenComponent implements OnInit {
  @Input() id: number | null = null;

  bewertungWrapper: BewertungWrapper = {
    averageRating: 0,
    bewertungen: []
  };
  currentIndex: number = 0;
  openFormular: boolean = false;
  bewertungAbgegeben: boolean = false;
  bewertungWrapper$: Observable<BewertungWrapper> = new Observable<BewertungWrapper>();

  bewertungForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    vorname: [''],
    nachname: [''],
    bewertung: ['', [Validators.required, Validators.maxLength(240)]]
  });

  constructor(private bewertungsService: bewertungService, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.initialiseData();
    this.bewertungAbgegeben = false;
  }


  initialiseData(): void {
    if(this.id != null){
      this.bewertungWrapper$ = this.bewertungsService.getBewertungWrapperForWine(this.id);
    }
  this.bewertungWrapper$.subscribe((bewertungWrapper) => {
    this.bewertungWrapper.averageRating = bewertungWrapper.averageRating;
    this.bewertungWrapper.bewertungen = bewertungWrapper.bewertungen;
  });
  }

  getpreviousSlide(): Bewertung {
    const isFirstSlide = this.currentIndex === 0;
    let previousBewertung;
    previousBewertung = isFirstSlide ? this.bewertungWrapper.bewertungen[this.bewertungWrapper.bewertungen.length - 1] : this.bewertungWrapper.bewertungen[this.currentIndex - 1];
    return previousBewertung;
  }

  getNextSlide(): Bewertung {
    const isLastSlide = this.currentIndex === this.bewertungWrapper.bewertungen.length - 1;
    let previousBewertung;
    previousBewertung = isLastSlide ? this.bewertungWrapper.bewertungen[0] : this.bewertungWrapper.bewertungen[this.currentIndex + 1];

    return previousBewertung;

  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.bewertungWrapper.bewertungen.length - 1
      : this.currentIndex - 1;

    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.bewertungWrapper.bewertungen.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.currentIndex = newIndex;
  }

  onSubmit() {
    if (this.bewertungForm.valid) {
      if (this.bewertungForm.valid) {
        const bewertung: Bewertung = {
          _id: 0,
          idWein: this.id ? this.id : 0,
          vorname: this.bewertungForm.get('vorname')?.value,
          nachname: this.bewertungForm.get('nachname')?.value,
          email: this.bewertungForm.get('email')?.value,
          datum: new Date(),
          sterne: 4,
          text: this.bewertungForm.get('bewertung')?.value
        };
        this.bewertungForm.reset();
        this.bewertungsService.addBewertungForWine(this.id, bewertung);
        //this.bewertungWrapper.bewertungen = this.bewertungsService.getBewertungenByWeinId(this.id);
        this.openFormular = false;
      }
      this.bewertungAbgegeben = true;
    }
  }

  getStarsArray(sterne: number): number[] {
    return new Array(5 - sterne);
  }

  getFullStarsArray(sterne: number): number[] {
    return new Array(sterne);
  }

  dateConverter(date: Date): string {
    return format(date, 'd. MMMM yyyy', { locale: de });
  }

  toggleFormular(): void {
    this.openFormular = !this.openFormular;
  }
}
