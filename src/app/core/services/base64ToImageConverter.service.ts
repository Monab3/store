import { Injectable } from '@angular/core';

@Injectable({providedIn: "root"})
export class base64ToImageConverter {
  constructor() {}

  public transform(value: any, contentType: string): any {
    var base64Content = `data:${contentType};base64,${value}`;
    return base64Content;
  }
}