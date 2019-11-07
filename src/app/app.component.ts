import { Component } from '@angular/core';
import {RestService} from './rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public jsonData: string;
  public jsonResponse: any;
  public countResponseMap: any;

  constructor(private restService: RestService){}

  public send(): void {

    this.jsonResponse = [];
    this.restService.createCategories(this.buildRequestBody()).subscribe((response => {
      this.jsonResponse = response;

      this.restService.getCountByCategories().subscribe((response2 => {
        this.countResponseMap = response2;
      }));

    }));


  }

  public buildRequestBody(): any {

    try {
      const myArr = JSON.parse(this.jsonData);
      const myJsonData = [];

      myArr.forEach((e) => {

        const category = Object.keys(e)[0];
        const subCategory = e[category];
        const jsonObj: any = {};
        jsonObj.category = category;
        jsonObj.subCategory = subCategory;
        myJsonData.push(jsonObj);
      });

      console.log('myJsonData', myJsonData);
      return myJsonData;
    } catch (err) {
      console.log('invalid format, ignored');
      return [];
    }
  }
}
