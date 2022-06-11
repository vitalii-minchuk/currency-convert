import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})

export class CurrencyComponent implements OnInit {
  UAH: string = "uah";
  USD: string = "usd";
  EUR: string = "eur";
  PLN: string = "pln";
  baseCurrency = this.USD;
  currencyConvertTo = this.UAH;
  displayRate: string = ""

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getCurrencyRate()
  }

  getCurrencyRate() {
    this.currencyService
      .getRate(this.baseCurrency, this.currencyConvertTo)
      .subscribe((response) => {
        const currentCurrency = Object.keys(response)[1]
        const rate: number = Object.entries(response)[1][1].toFixed(2)
        this.displayRate = `${this.baseCurrency} = ${rate} ${currentCurrency}`
      }
    );
  }
}