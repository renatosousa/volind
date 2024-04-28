import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharService {

  constructor() { }
  private data: any;

  setData(data: any): void {
      this.data = data;
  }

  getData(): any {
      return this.data;
  }
}
