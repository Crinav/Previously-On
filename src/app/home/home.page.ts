import { Component, Output } from '@angular/core';
import { LogService } from './../services/log.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { TabsPage } from './../tabs/tabs.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  ionicForm: FormGroup;
  isSubmitted = false;
  user : Observable<any>;

  constructor(public formBuilder: FormBuilder,
     private logService: LogService,
     private router: Router,
     private data: DataService,
     private tabsPage: TabsPage
     ) {}

  ngOnInit() {
    this.tabsPage.switch();
    this.ionicForm = this.formBuilder.group({
      login: ['', [Validators.required]], 
      password: ['', [Validators.required]],
    })
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    console.log(this.ionicForm.value)
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      
    } else {
      this.logService.authData(this.ionicForm.value.login, this.ionicForm.value.password).subscribe(
        (resp) => {
        this.user = resp;console.log(this.user);
        this.data.setData(this.user);
        this.tabsPage.switch();
        localStorage.setItem('currentUser', JSON.stringify(resp));
        this.router.navigate(['tabs/series']);
        });
    }
      
  }

}
