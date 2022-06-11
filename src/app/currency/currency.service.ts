import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class CurrencyService {
  private baseUrl: string = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"
  
  constructor(
    private http: HttpClient,
  ) {}
  
  getRate(base:string, convertTo:string) {
    return this.http.get(`${this.baseUrl}${base}/${convertTo}.json`)
  }
}