import { SerieService, SearchType } from './../../services/serie.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { TabsPage } from '../../tabs/tabs.page';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {

  display: string;
  myresults: Observable<any>;
  results: Observable<any>;
  archivedResults: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.mySeries;
  user:any;
  archived:any;
  archivedSerie: any =[];
  mySeries: any = [];
  dataShared: any;
  constructor(private serieService: SerieService,
     private router: Router,
     private data: DataService,
     private tabsPage: TabsPage
     ) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.tabsPage.switch();
    console.log('user : '+this.user.user);
    console.log('token : '+this.user.token)
  }

  ngOnInit() {
    this.dataShared = this.data.getData(); console.log(this.dataShared)
    switch(this.display){
      case 'results':
        this.display ='results';
      case 'archived':
        this.display ='archived';
      default:
        this.display ='myresults';
    }
    this.myresults = this.serieService.searchMyData(this.user.user.id);
    this.myresults.subscribe((v)=> console.log(v));
    this.myresults.forEach(elem => {
      for (let index = 0; index < elem.length; index++) {
        this.mySeries.push(elem[index].id); 
      }
    });
    this.initiateAS();
    this.archivedResults.subscribe((v)=> console.log(v))
    console.log(this.archivedSerie)
  }

  initiateAS(){
    this.archivedSerie = [];
    this.archivedResults = this.serieService.searchMyArchived(this.user.user.id);
    this.archivedResults.forEach(elem => {
      for (let index = 0; index < elem.length; index++) {
        this.archivedSerie.push(elem[index].id); 
      }
    });
  }

  addSerie(id: number) {
    this.serieService.addSerie(id, this.user.token).subscribe(
      (resp) => {this.ngOnInit();
        this.type = SearchType.mySeries;
      });
  }

  backBtn(){
    this.display = 'myresults';
    this.router.navigate(['tabs/series']);
  }

  onPressUp($event, id: number) {
      console.log("onPressUp", $event);
      this.router.navigate(['tabs/serie', id]);    
  }

  removeSerie(id: number){
    this.serieService.removeSerie(id, this.user.token).subscribe(
      (resp) => {
        this.ngOnInit();
        this.type = SearchType.mySeries;
      });
  }

  searchChanged() {console.log('change')
    if(this.type == 'all' ){
      this.display = 'results';
      this.results = this.serieService.searchData();
    }
    else if(this.type == 'archived' ){
      this.display = 'archived';
      this.initiateAS();
    }
    else{
      this.display = 'myresults';
      this.myresults = this.serieService.searchMyData(this.user.user.id);
    }
    this.archivedResults.subscribe((v) =>(console.log(v))) 
    this.myresults.subscribe((v) =>(console.log(v))) 
    console.log(this.archivedSerie)   
  }

  searchTitle() {
    if(this.searchTerm == ''){
      this.display = 'results';
      this.results = this.serieService.searchData();
    }
    console.log(this.searchTerm)
    this.display = 'results';
    this.results = this.serieService.searchDataByTitle(this.searchTerm);
  }

  check($event, id: number){
    if($event.detail.checked == true){
      this.serieService.archiveSerie(id, this.user.token).subscribe((v) => 
      this.ngOnInit()
      );
    }
    else{
      this.serieService.deArchiveSerie(id, this.user.token).subscribe((v) => 
      this.ngOnInit()
      );
    }
    
  }

}
