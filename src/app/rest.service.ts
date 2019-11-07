import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class RestService {

  public url = 'http://localhost:8085/categorysubcategory/';
  constructor(private http: HttpClient) { }

  public createCategories(data: any): Observable<any> {
    return this.http.post(this.url, data).pipe(
      map(response => response));
  }

  public getCountByCategories(): Observable<any> {
    return this.http.get(this.url + '/categorycount').pipe(
      map(response => response));
  }

}
