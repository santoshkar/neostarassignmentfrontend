import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {RestService} from './rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public jsonData: string;

  constructor(private restService: RestService){}

  public send(): void {

    console.log('builtdata', this.buildRequestBody());
    this.restService.createCategories(this.buildRequestBody()).subscribe((response => {
      console.log(response);
    }));


  }

  public buildRequestBody(): any {
    const myArr =  JSON.parse(this.jsonData);
    let myJsonData = [];

    myArr.forEach((e) => {

      const category = Object.keys(e)[0];
      const subCategory = e[category];
      const jsonObj: any = {};
      jsonObj.category = category;
      jsonObj.subCategory = subCategory;
      myJsonData.push(jsonObj);
    });

    return myJsonData;
  }
}
