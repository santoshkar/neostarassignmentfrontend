import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RestService} from './rest.service';
import {Router} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {Observable} from 'rxjs';
import any = jasmine.any;

describe('AppComponent', () => {

  let appComponent: AppComponent;
  let restService: RestService;
  let fixture: ComponentFixture<AppComponent>;
  let app: any;

  const createCategoriesResponse = [
    {category: 'PERSON', subCategory: 'Bob Jones'},
    {category: 'PLACE', subCategory: 'Washington'},
    {category: 'PERSON', subCategory: 'Mary'},
    {category: 'COMPUTER', subCategory: 'Mac'},
    {category: 'OTHER', subCategory: 'Tree'},
    {category: 'ANIMAL', subCategory: 'Dog'},
    {category: 'PLACE', subCategory: 'Texas'},
    {category: 'ANIMAL', subCategory: 'Cat'},
    {category: 'PERSON', subCategory: 'Mac'}
  ];
  const getCountByCategoriesResponse = {
    ANIMAL: 2,
    COMPUTER: 1,
    OTHER: 1,
    PERSON: 3,
    PLACE: 2
  };

  const restServiceMock = {
    createCategories(data: any): Observable<any> {
      return Observable.create((response) => response.next(createCategoriesResponse));
    }, getCountByCategories(): Observable<any> {
      return Observable.create((response) => response.next(getCountByCategoriesResponse));
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [RestService,
        {
          provide: Router, useClass: class {
            public navigate = jasmine.createSpy('navigate');
          }
        },
        {provide: RestService, useValue: restServiceMock }
        ],
      imports: [
        FormsModule, HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    restService = TestBed.get(RestService);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    appComponent = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('send() method should work', () => {
    expect(appComponent.jsonResponse).toBeTruthy();
    expect(appComponent.jsonResponse.length).toEqual(0);
    expect(appComponent.countResponseMap).toBeUndefined();
    appComponent.jsonData = '[{"PERSON":"Bob Jones"}, {"PLACE":"Washington"}, {"PERSON":"Mary"}, {"COMPUTER":"Mac"}, ' +
      '{"PERSON":"Bob Jones"},{"OTHER":"Tree"}, {"ANIMAL":"Dog"}, {"PLACE":"Texas"}, {"FOOD":"Steak"}, {"ANIMAL":"Cat"}]';
    appComponent.send();
    expect(appComponent.jsonResponse.length).toEqual(9);
    expect(appComponent.jsonResponse).toEqual(createCategoriesResponse);
    expect(appComponent.countResponseMap).toBeDefined();
    expect(appComponent.countResponseMap).toEqual(getCountByCategoriesResponse);
  });

  it('buildRequestBody() method should work', () => {
    appComponent.jsonData = '[{"PERSON":"Bob Jones"}, {"PLACE":"Washington"}, {"PERSON":"Mary"}, {"COMPUTER":"Mac"}, ' +
      '{"PERSON":"Bob Jones"},{"OTHER":"Tree"}, {"ANIMAL":"Dog"}, {"PLACE":"Texas"}, {"FOOD":"Steak"}, {"ANIMAL":"Cat"}]';
    expect(appComponent.jsonData).toBeDefined();
    const myJsonData = appComponent.buildRequestBody();
    expect(myJsonData).toBeDefined();
    expect(myJsonData.length).toEqual(10);
    console.log('Respoonse for myJsonData', myJsonData[0].category);
    expect(myJsonData[0].category).toEqual('PERSON');
    expect(myJsonData[0].subCategory).toEqual('Bob Jones');

    expect(myJsonData[9].category).toEqual('ANIMAL');
    expect(myJsonData[9].subCategory).toEqual('Cat');
  });

  it('buildRequestBody() method should throw an exception', () => {
    appComponent.jsonData = 'some different text sent';
    expect(appComponent.jsonData).toBeDefined();
    expect(() => appComponent.buildRequestBody())
      .toThrow(new Error('Text can\'t be converted to JSON'));
  });
});
