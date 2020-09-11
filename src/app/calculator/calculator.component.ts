import { Component, OnInit } from '@angular/core';
import {Currency} from '../model/Currency';
import {InputCurrencyData} from '../model/InputCurrencyData';
import {HttpService} from '../service/http.service';
import {AvailableAbbreviations} from '../data/AvailableAbbreviations';
import {SharedService} from '../shared/shared.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  availableAbbreviations = (new AvailableAbbreviations).avalaibleAbbreviations;
  currency = new Currency(1, 'USD', 1, 'yyyy-mm-dd');
  inputModel = new InputCurrencyData('USD', 'yyyy-mm-dd');
  inputAmount: number;
  calculatedWithAmount: number;
  toEurAmmount: number;
  fromEurAmount: number;
  submitted = false;

  constructor(private  httpService: HttpService, private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  calculate(): void {
    this.getDataFromApi();
    this.calculatedWithAmount = this.inputAmount;
    this.sharedService.nextUsedAbbreviation(this.inputModel.inputAbbreviation);
    this.submitted = true;
  }

  calculateToEur(): void{
    this.toEurAmmount = this.inputAmount * this.currency.rate;
  }
  calculateFromEur(): void{
    this.fromEurAmount = this.inputAmount / this.currency.rate;
  }
  getDataFromApi(){
    this.httpService.getCurrencyData(this.inputModel.inputAbbreviation).subscribe((data: Currency) => {
        this.currency = data;
        this.calculateToEur();
        this.calculateFromEur();
      }
    );
  }

}
