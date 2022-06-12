import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';

interface CurrenciesCodes {
  lowerCase: string,
  capitalized: string
}

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})

export class CurrencyComponent implements OnInit {
  public currencies: Array<CurrenciesCodes> = [
    {lowerCase: "usd", capitalized: "USD"},
    {lowerCase: "uah", capitalized: "UAH"},
    {lowerCase: "eur", capitalized: "EUR"},
    {lowerCase: "pln", capitalized: "PLN"},
  ];
  baseCurrency: string = "usd";
  currencyConvertTo: string = "uah";
  displayRate: string = "";
  amount: string = "1";

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getCurrencyRate()
  }

  getCurrencyRate(): void {
    this.currencyService
      .getRate(this.baseCurrency, this.currencyConvertTo)
      .subscribe((response) => {
        const currentCurrency = Object.keys(response)[1];
        const rate: number = Object.entries(response)[1][1].toFixed(2);
        const sum: number = +this.amount * rate;
        this.displayRate = `${this.amount} ${this.baseCurrency} = ${sum} ${currentCurrency}`;
      }
    );
  }

  getAmount(event: Event): void {
    this.amount = (<HTMLInputElement>event.target).value
  }

  getBaseCurrency(event: Event) {
    this.baseCurrency = (<HTMLSelectElement>event.target).value;
  }

  getCurrencyConvertTo(event: Event) {
    this.currencyConvertTo = (<HTMLSelectElement>event.target).value;
  }

  convert(): void{
    console.log(this.amount, this.baseCurrency, this.currencyConvertTo);
    
    this.getCurrencyRate()
  }
}