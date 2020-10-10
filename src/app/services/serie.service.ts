import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum SearchType {
  all = 'all',
  mySeries = 'mySeries',
  archived = 'archived',
}
@Injectable({
  providedIn: 'root'
})
export class SerieService {

  user: any;
  url = 'https://api.betaseries.com/';
  apiKey = '5678b31cd6ca';
  imdbApiKey = 'k_7AYVDRTO';
  imdbUrl = 'https://imdb-api.com/en/API/'
  constructor(private http: HttpClient) {
  }

  /** 
  * @returns Observable with the search results
  */
  searchData(): Observable<any> {
    return this.http.get(`${this.url}shows/list?v=3.0&key=${this.apiKey}&order=popularity&filter=new`).pipe(
      map(results => results['shows'])
    );
  }

  /** 
    * @returns Observable with the user results
    */
  searchMyData(id: number): Observable<any> {
    return this.http.get(`${this.url}shows/member?v=3.0&key=${this.apiKey}&id=${id}`).pipe(
      map(results => results['shows'])
    );
  }

  /** 
    * @returns Observable with the user results
    */
   searchMyArchived(id: number): Observable<any> {
    return this.http.get(`${this.url}shows/member?status=archived&v=3.0&key=${this.apiKey}&id=${id}`).pipe(
      map(results => results['shows'])
    );
  }

  /** 
  * recherche une serie par titre pour un membre si un token est renseigné
  * @param {string} title Search Term
  * @returns Observable with the search results
  */
  searchDataByTitle(title: string): Observable<any> {
    return this.http.get(`${this.url}shows/search?v=3.0&nbpp=100&title=${title}&key=${this.apiKey}`).pipe(
      map(results => results['shows'])
    );
  }

  /**
  * @param {number} id 
  * @returns Observable with detailed information
  */
  getSeasons(id: number) {
    return this.http.get(`${this.url}shows/seasons?v=3.0&id=${id}&key=${this.apiKey}`);
  }

  /**
  * @returns Observable with detailed information
  */
 getEpisodes(id: number, season: number) {
  return this.http.get(`${this.url}shows/episodes?v=3.0&id=${id}&key=${this.apiKey}&season=${season}`);
}

  /**
  * Get the detailed information for an ID using the "i" parameter
  * 
  * @param {number} id 
  * @returns Observable with detailed information
  */
  getDetails(id: number) {
    return this.http.get(`${this.url}shows/display?v=3.0&id=${id}&key=${this.apiKey}`);
  }

  addSerie(id: number, token: number) {
    let body = {}
    return this.http.post(`${this.url}shows/show?v=3.0&key=${this.apiKey}&id=${id}&token=${token}&content-type=x-www-form-urlencoded`, body).pipe(map(res => res));
  }

  removeSerie(id: number, token: number) {
    return this.http.delete(`${this.url}shows/show?v=3.0&key=${this.apiKey}&id=${id}&token=${token}&content-type=x-www-form-urlencoded`).pipe(map(res => res));
  }

  archiveSerie(id: number, token: number){
    return this.http.post(`${this.url}shows/archive?v=3.0&key=${this.apiKey}&id=${id}&token=${token}&content-type=x-www-form-urlencoded`,'').pipe(map(res => res));
  }

  deArchiveSerie(id: number, token: number){
    return this.http.delete(`${this.url}shows/archive?v=3.0&key=${this.apiKey}&id=${id}&token=${token}&content-type=x-www-form-urlencoded`).pipe(map(res => res));
  }

  /** 
  * @returns Observable with the search results
  */
  getEpisodeDetails(id: number): Observable<any>{
    return this.http.get(`${this.url}episodes/display?v=3.0&id=${id}&key=${this.apiKey}`);
  }
  /** 
  * @returns Observable with the search results
  */
  getAllEpToSee(id: number, token: number) : Observable<any>{
    return this.http.get(`${this.url}episodes/list?v=3.0&showid=${id}&key=${this.apiKey}&token=${token}`).pipe(
      map(results => results['shows'])
    );
  }

  addView(id: number, token: number){
    return this.http.post(`${this.url}episodes/watched?v=3.0&bulk=false&key=${this.apiKey}&id=${id}&token=${token}&content-type=x-www-form-urlencoded`,'').pipe(map(res => res));
  }

  DelView(id: number, token: number){
    return this.http.delete(`${this.url}episodes/watched?v=3.0&bulk=false&key=${this.apiKey}&id=${id}&token=${token}&content-type=x-www-form-urlencoded`).pipe(map(res => res));
  }

  addAllView(id: number, token: number){
    return this.http.post(`${this.url}episodes/watched?v=3.0&bulk=true&key=${this.apiKey}&id=${id}&token=${token}&content-type=x-www-form-urlencoded`,'').pipe(map(res => res));
  }

  getComments(id: number): Observable<any>{
    return this.http.get(`${this.url}comments/comments?v=3.0&id=${id}&key=${this.apiKey}&type=episode`);
  }

  addComment(id: number, token: number, text: string){
    return this.http.post(`${this.url}comments/comment?v=3.0&id=${id}&key=${this.apiKey}&type=episode&token=${token}&text=${text}`, '').pipe(
      map(results => results['comment'])
    )
  }

  getPict(imdb_id: string, season: number){
    console.log(`${this.imdbUrl}SeasonEpisodes/${this.imdbApiKey}/${imdb_id}/${season}`)
    return this.http.get(`${this.imdbUrl}SeasonEpisodes/${this.imdbApiKey}/${imdb_id}/${season}`);

  }
}
