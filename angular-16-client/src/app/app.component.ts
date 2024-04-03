import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IndicadoresService } from './services/indicadores.service';
import { Indicator } from './models/indicator.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private indicadoresService: IndicadoresService) {}

  indicadores: Indicator[] = [];

    ngOnInit(): void {
   // this.indicadoresService.retornarListaDeIndicadores().subscribe(
   //   data => {
   //     this.indicadores = data;
    //  }
      // )
     this.indicadores = this.indicadoresService.retornarListaDeIndicadores();

  }





}

