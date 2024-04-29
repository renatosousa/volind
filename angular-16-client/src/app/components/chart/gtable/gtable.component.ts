import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IndicadoresService } from 'src/app/services/indicadores.service';
declare var google: any;

@Component({
  selector: 'app-gtable',
  template: `<div #tableElement style="width: 90vw; height: 90vh;"></div>`
 })
export class GtableComponent implements AfterViewInit{
  @Input() table: any;  // Propriedade de entrada para receber o objeto
  dataSet : any;
  @ViewChild('tableElement')
  tableElement!: ElementRef;

  constructor(private indicatorService : IndicadoresService) { }
  ngAfterViewInit() {
   // alert("teste"+JSON.stringify(this.table));
   this.returnDataSetTable(this.table.symbol);
        google.charts.load('current', {'packages':['table']});
        google.charts.setOnLoadCallback(this.drawTable);
  }

  drawTable = () => {
    var data = new google.visualization.DataTable();

    for (let i = 0; i < this.dataSet.headers.length; i++) {
      const header = this.dataSet.headers[i];
      const type = this.dataSet.types[i];
      data.addColumn(type, header );
      console.log(header);
    }


     // alert( Object.keys(this.dataSet.dataSet.puts));

   data.addRows( this.dataSet.dataSetCalls);


    const chart = new google.visualization.Table(this.tableElement.nativeElement);


    chart.draw(data, {showRowNumber: true, width: '100%', height: '100%'});

    }

  returnDataSetTable(op: any){
    this.indicatorService.getDataSetOptions(op).subscribe(d=>{
      this.dataSet = d;
     console.log("teste"+JSON.stringify(d));
     this.drawTable();
    })
  }

}
