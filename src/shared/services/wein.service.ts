import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Konstanten 
const WEIN_URL = 'http://localhost/api/wein/';

@Injectable({providedIn: "root"})
export class weinService{
    constructor(private http: HttpClient){
        
    }
    fetchRebsorten(): Observable<any> {
       return this.http.get(WEIN_URL+'/');
    }
}