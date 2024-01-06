import { Component, OnInit } from '@angular/core';
import { AppRoutes } from '../../../../core/config/app-routes.config';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-kontaktformular',
  templateUrl: './kontaktformular.component.html',
  styleUrl: './kontaktformular.component.scss'
})
export class KontaktformularComponent implements OnInit{
  rechungsFormular = false;
  kontaktFormular: FormGroup = this.fb.group({
    anrede: [''],
    titel: [''],
    vorname: ['', [Validators.required]],
    nachname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    adresse: ['', [Validators.required]],
    plz: ['', [Validators.required]],
    stadt: ['', [Validators.required]],
    land: ['', [Validators.required]],
  });

  rechnungFormular: FormGroup = this.fb.group({
    anrede: [''],
    titel: [''],
    vorname: ['', [Validators.required]],
    nachname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    adresse: ['', [Validators.required]],
    plz: ['', [Validators.required]],
    stadt: ['', [Validators.required]],
    land: ['', [Validators.required]],
  });

    rechnungsArtFormular =  this.fb.group({
      bezahlart: [''],
    });

    datenschutzErklaerung = this.fb.group({
      isChecked: [false]
    });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  appRoutes = AppRoutes;

  toggleRechungsFormular() {
    this.rechungsFormular = !this.rechungsFormular;
  }
}
