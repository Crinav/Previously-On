import { Component, } from '@angular/core';
import { DataService } from './../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  user:any;
  dataShared: any;

  constructor(private data: DataService, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser')) || null;
    this.dataShared = this.data.getData(); console.log(this.dataShared)
    console.log(this.user)
  }
 
  switch(){
    this.dataShared = this.data.getData();
  }
  
  logout(){
    this.user = null
    this.data.setData(null);
    this.dataShared = null;
     console.log(this.dataShared)
    localStorage.removeItem('currentUser');
    this.router.navigate(['tabs/home'])
  }
}
