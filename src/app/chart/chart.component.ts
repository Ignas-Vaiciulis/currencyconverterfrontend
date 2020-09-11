import {Component, OnInit} from '@angular/core';
import {Currency} from '../model/Currency';
import {Chart} from '../../../node_modules/chart.js/dist/Chart.js';
import {HttpService} from '../service/http.service';
import {SharedService} from '../shared/shared.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  currecyData: Currency[];
  labels: string[] = [];
  rates: number[] = [];
  lineChart = [];
  inputStartDate: number;
  inputEndDate: number;
  submitted = false;
  abbreviation = 'USD';

  constructor(private httpService: HttpService, private sharedService: SharedService) {
  }

  ngOnInit(): void {
  }

  getChartDataAndBuildChart() {
    this.emptyArrays();
    this.sharedService.sharedUsedAbbreviation.subscribe(
      abbreviation => this.abbreviation = abbreviation);
    this.httpService.getCurrencyDataForChart(this.abbreviation, this.inputStartDate.toString(), this.inputEndDate.toString()).subscribe(
      (retrievedData: Currency[]) => {
        retrievedData.reverse();
        this.currecyData = retrievedData;
        this.currecyData.forEach((currency) =>
          this.labels.push(currency.date)
        );
        this.currecyData.forEach((currency) =>
          this.rates.push(1 / currency.rate)
        );
        this.buildChart();
      }
    );
  }

  buildChart() {
    this.lineChart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [
            {
              data: this.rates,
              borderColor: '#3cb371',
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              type: 'category',
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      }
    );
  }

  showChart() {
    this.getChartDataAndBuildChart();
    this.submitted = true;
  }

  emptyArrays(){
    if (typeof this.currecyData !== 'undefined'){
      this.currecyData.splice(0, this.currecyData.length);
      this.rates.splice(0, this.rates.length);
      this.labels.splice(0, this.labels.length);
    }
  }

}
