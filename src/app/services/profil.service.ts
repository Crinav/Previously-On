import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

	user: any;
	url = 'https://api.betaseries.com/';
	apiKey = '5678b31cd6ca';

  constructor(private http: HttpClient) {

   }

  /** 
  * @returns Observable with the search results
  */
  searchData(id: number, token: number): Observable<any>{
  	console.log(id);
    return this.http.get(`${this.url}friends/list?v=3.0&key=${this.apiKey}&id=${id}&token=${token}`).pipe(
      map(results => results['users']));
    ;
  }

  removeFriend(id: number, token: number){
  	console.log(id);
  	console.log(token);
  	let options = '?v=3.0&key=5678b31cd6ca&id='+id+'&token='+token;
  	return this.http.delete('https://api.betaseries.com/friends/friend'+options);
  	

  }

  SearchAFriend(email: string, token: number){
  	console.log(email);
  	return this.http.get('https://api.betaseries.com/friends/find?v=3.0&key=5678b31cd6ca&token='+token+'&type=emails&emails='+email).pipe(
  		map(res => res));
  }

  AddAFriend(id: number, token: number ){
  	let options = '?v=3.0&key=5678b31cd6ca&id='+id+'&token='+token;
  	return this.http.post('https://api.betaseries.com/friends/friend'+options, '' );
  }

  getDemands(token: number){
	let options = '?v=3.0&key=5678b31cd6ca&token='+token+'&received=`true`';
	console.log(this.url+'friends/requests'+options)
	return this.http.get(this.url+'friends/requests'+options ).pipe(
		map(results => results['users']));
  }

  getMyDemands(token: number){
	let options = '?v=3.0&key=5678b31cd6ca&token='+token;
	console.log(this.url+'friends/requests'+options)
	return this.http.get(this.url+'friends/requests'+options ).pipe(
		map(results => results['users']));
  }

}
