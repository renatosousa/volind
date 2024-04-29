import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CharService } from 'src/app/services/char.service';
import { IndicadoresService } from 'src/app/services/indicadores.service';
declare var google: any;

@Component({
  selector: 'app-pie-chart',
  template: `<div #pieChart style="width: 30vw; height: 30vh;"></div>`
})
export class PieChartComponent implements AfterViewInit{
  @Input() active: any;  // Propriedade de entrada para receber o objeto
  dataSet : any = [];
  nameActive = "";
  @ViewChild('pieChart')
  pieChart!: ElementRef;

  constructor(private indicatorService: IndicadoresService){

  }

  drawChart = () => {

var data = new google.visualization.DataTable();
 for (let i = 0; i < this.dataSet.headers.length; i++) {
  const header = this.dataSet.headers[i];
  const type = this.dataSet.types[i];
  data.addColumn(type, header );
  console.log(header);
}
data.addRows(this.dataSet.dataSet);
const options = {
  title: this.dataSet.nameActive,
  legend: {
      position: 'bottom',
  },
  width: this.pieChart.nativeElement.clientWidth,
  height: this.pieChart.nativeElement.clientHeight,
  trendlines: {
      0: {
          type: 'exponential',
          visibleInLegend: true,
      }
  }
};



  const chart = new google.visualization.AreaChart(this.pieChart.nativeElement);


  chart.draw(data, options);

}

  ngAfterViewInit() {
    this.loadDataSetYahooFinance(this.active);


  }
  getNameActive(active : any){
    this.indicatorService.getNameActive(active).subscribe((data: any) => {
      this.nameActive = data;
      console.log(data);
    })
  }

  loadDataSetYahooFinance(active: any) {
    this.getNameActive(active.symbol);

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
