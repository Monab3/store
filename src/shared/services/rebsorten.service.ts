import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rebsorte } from '../models/Rebsorten';

@Injectable({providedIn: "root"})
export class rebsortenService{
    constructor(private http: HttpClient){
        
    }
    fetchRebsorten(): Observable<any> {
       return this.http.get('http://localhost/api/rebsorte/');
    }
}