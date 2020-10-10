import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any = null;
  constructor() { }

  setData(data) {
    this.data = data;
    console.log(this.data)
  }
 
  getData() {
    return this.data;
  }
}
