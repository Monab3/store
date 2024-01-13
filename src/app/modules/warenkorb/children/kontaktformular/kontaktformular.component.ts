import { Component, OnInit } from '@angular/core';
import { AppRoutes } from '../../../../core/config/app-routes.config';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { userService } from '../../../../core/services/user.service';
import { cartService } from '../../../../core/services/cart.service';
import { User } from '../../../../core/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kontaktformular',
  templateUrl: './kontaktformular.component.html',
  styleUrl: './kontaktformular.component.scss'
})
export class KontaktformularComponent implements OnInit {
  appRoutes = AppRoutes;

  rechungsFormular = false;
  adresseData: User = {};
  adresseVorhanden: boolean = false;
  rechnungsAdresseData: User = {};
  rechnungsAdresseVorhanden: boolean = false;
  openAdressFormular = false;
  openRechnungsAdressFormular = false;
  errorMessageFormular = ""; 
  errorMessageForumlarVisible = false;


  kontaktFormular: FormGroup = this.fb.group({
    anrede: [''],
    titel: [''],
    vorname: ['', [Validators.required]],
    nachname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    strasse: ['', [Validators.required]],
    hausnummer: ['', [Validators.required]],
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
    strasse: ['', [Validators.required]],
    hausnummer: ['', [Validators.required]],
    plz: ['', [Validators.required]],
    stadt: ['', [Validators.required]],
    land: ['', [Validators.required]],
  });

  rechnungsArtFormular = this.fb.group({
    bezahlart: [''],
  });

  rechnungsArtFormularInvalid = false;
  errorRechnungsArtFormular = false; 

  datenschutzErklaerung = this.fb.group({
    isChecked: [false]
  });

  constructor(private fb: FormBuilder, private userService: userService, private router: Router, private cartService: cartService) {
  }

  ngOnInit(): void {
    this.initialiseData();
  }

  initialiseData() {
    this.userService.adresse.subscribe(data => {
      this.adresseData = data;
      this.adresseVorhanden = this.hasUserData(data);
      this.kontaktFormular.patchValue(data);
    });
  
    this.userService.rechnungsAdresse.subscribe(data => {
      this.rechnungsAdresseData = data;
      this.rechnungsAdresseVorhanden = this.hasUserData(data);
      this.rechnungFormular.patchValue(data);
    });
  }

  toggleRechungsFormular() {
    this.openRechnungsAdressFormular = true; 
  }

  adresseSpeichern(formGroup: FormGroup, adressType: 'normal' | 'rechnung') {
    const kontaktFormularDaten: User = {
      anrede: formGroup.get('anrede')?.value || '',
      titel: formGroup.get('titel')?.value || '',
      vorname: formGroup.get('vorname')?.value || '',
      nachname: formGroup.get('nachname')?.value || '',
      email: formGroup.get('email')?.value || '',
      strasse: formGroup.get('strasse')?.value || '',
      hausnummer: formGroup.get('hausnummer')?.value || '',
      plz: formGroup.get('plz')?.value || '',
      stadt: formGroup.get('stadt')?.value || '',
      land: formGroup.get('land')?.value || '',
    };

    if (adressType === 'normal') {
      this.userService.setAdresse(kontaktFormularDaten);
      this.openAdressFormular = false;
    } else if (adressType === 'rechnung') {
      this.userService.setRechnungsAdresse(kontaktFormularDaten);
      this.openRechnungsAdressFormular = false;
    }
  }

  adresseBearbeiten(adressType: 'normal' | 'rechnung') {
    if (adressType === 'normal') {
      this.openAdressFormular = true;
    } else if (adressType === 'rechnung') {
      this.openRechnungsAdressFormular = true;
      this.openAdressFormular = true;
    }
  }

  adresseEntfernen(){
    this.userService.setRechnungsAdresse({});
    this.openRechnungsAdressFormular = false;
  }

  private hasUserData(userData: User): boolean {
    return Object.values(userData).some(value => value !== null && value !== '');
  }

  handleNav() {
    this.errorMessageFormular="";
    this.errorMessageForumlarVisible = false;
    let errorMessages: string[] = [];
    this.rechnungsArtFormularInvalid = false; 
    console.log(this.rechnungsArtFormular.get('bezahlart')?.value); 
    const bezahlartValue = this.rechnungsArtFormular.get('bezahlart')?.value;
    if (this.kontaktFormular.valid && bezahlartValue != "" && this.datenschutzErklaerung.get('isChecked')?.value) {
      this.router.navigate(['/',this.appRoutes.WARENKORB,this.appRoutes.WARENKORB__DANKE]);
      return; 
    }
     if(!this.kontaktFormular.valid){
      this.markFormGroupTouched(this.kontaktFormular);
      errorMessages.push('alle Pflichtfelder des Adressformulares korrekt ausgefüllt worden sind');
    }

    if(bezahlartValue == "") {
      this.rechnungsArtFormularInvalid = true; 
      errorMessages.push('eine Bezahlart ausgewählt wurde');
    }

    if(!this.datenschutzErklaerung.get('isChecked')?.value){
      errorMessages.push('die Datenschutzerklärung akzeptiert wurde');
    }

    this.errorMessageFormular = "Bitte überprüfen Sie ob: " + errorMessages.join(', ');
    this.errorMessageForumlarVisible = true;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}

