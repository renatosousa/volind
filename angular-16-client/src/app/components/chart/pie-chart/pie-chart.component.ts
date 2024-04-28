import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CharService } from 'src/app/services/char.service';
import { IndicadoresService } from 'src/app/services/indicadores.service';
declare var google: any;

@Component({
  selector: 'app-pie-chart',
  template: `<div #pieChart style="width: 40vw; height: 40vh;"></div>`
})
export class PieChartComponent implements AfterViewInit{
  @Input() active: any;  // Propriedade de entrada para receber o objeto
  dataSet : any = [];

  @ViewChild('pieChart')
  pieChart!: ElementRef;
  constructor(private indicatorService: IndicadoresService){

  }

  drawChart = () => {

//   const data = google.visualization.arrayToDataTable([
//     ['Task', 'Hours per Day'],
//     ['Work', 11],
//     ['Eat', 2],
//     ['Commute', 2],
//     ['Watch TV', 2],
//     ['Sleep', 7]
// ]);

var data = new google.visualization.DataTable();
 for (let i = 0; i < this.dataSet.headers.length; i++) {
  const header = this.dataSet.headers[i];
  const type = this.dataSet.types[i];
  data.addColumn(type, header );
  console.log(header);
}
data.addRows(this.dataSet.dataSet);

   const options = {
    title: 'My Daily Activities',
    legend: {position: 'top'}
  };


  const chart = new google.visualization.LineChart(this.pieChart.nativeElement);


  chart.draw(data, options);

}

  ngAfterViewInit() {
    this.loadDataSetYahooFinance(this.active);


  }

  loadDataSetYahooFinance(active: any) {
    this.indicatorService.detalhesActive(active.symbol).subscribe((data: any) => {
     this.dataSet = data;
      console.log(JSON.stringify(data.dataSet));
     setTimeout(() => {
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(this.drawChart);
     }, 1000);



    });
  }

}
