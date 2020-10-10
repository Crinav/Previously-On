import { SerieService } from './../../services/serie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.page.html',
  styleUrls: ['./serie-details.page.scss'],
})
export class SerieDetailsPage implements OnInit {

  information: any;
  user: any;
  seasons: any = [];
  allEp: Observable<any>;
  genres: any = [];
  allOrOne: any = {
    onePrec:'onePrec',
    one:'one'
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private serieService: SerieService,
    private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log('user : ' + this.user.user);
    console.log('token : ' + this.user.token)
  }

  ngOnInit() {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.allEp = this.serieService.getAllEpToSee(id, this.user.token);
    this.allEp.subscribe((v) => console.log('AllEp: ', v));
    this.serieService.getDetails(id).subscribe(result => {
      this.information = result['show'];console.log(this.information);
      this.genres = Object.values(this.information.genres);
    })
  }

  action(id: number, season:number, ep:number){
    console.log(id,season, ep)
    this.router.navigate(['tabs/episode', id, season, ep]);  
  }
  onPressUp( id: number,imdb_id: string) {
    this.router.navigate(['tabs/episode', id, imdb_id]);    
}
  openWebsite() {
    window.open(this.information.resource_url, '_blank');
  }

}
