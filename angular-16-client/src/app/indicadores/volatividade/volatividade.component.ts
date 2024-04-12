import { Component, OnInit } from '@angular/core';
 import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay, startWith } from 'rxjs';
import { FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Indicator } from 'src/app/models/indicator.interface';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FeatureIndicator } from 'src/app/models/featureIndicator';


@Component({
  selector: 'app-volatividade',
  templateUrl: './volatividade.component.html',
  styleUrls: ['./volatividade.component.scss'],


})
export class VolatividadeComponent implements OnInit {
  htmlContent: string = 'https://www.google.com/finance/quote/petr4:BVMF';

  myControl = new FormControl<FeatureIndicator | any>('');
  options: any[] = [{ name: 'Petro' }, { name: 'Dolar' }, { name: 'Bovespa' }];
  indicator: Indicator | undefined;
  indicatorAplicate: Indicator | undefined;
  featureIndicator: FeatureIndicator[] = [];
  featureIndicatorAplicate: FeatureIndicator[] = [];


  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  drop2(event: any) {
    console.log(event)
  }

  filteredOptions: Observable<any> | undefined = undefined;

  constructor(private indicatorService: IndicadoresService, private router: ActivatedRoute, private breakpointObserver: BreakpointObserver) { }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );




  ngOnInit() {

    this.indicatorService.search().subscribe(d => {
      alert(d)
    })

    this.router.params.subscribe(params => {
      this.indicator = this.requisitaIndicators(params['id'])
      //RETORNA INDICADORES SELECIONADOS EM SUAS POSICOES E CARACTERISTICAS:
      //LOADING...
      this.featureIndicatorAplicate = [];

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const nome = typeof value === 'string' ? value : null
          return nome ? this._filter(nome as string) :
            this.indicator?.featureIndicator.slice();

        }),
      );

    }
    )

  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string) {
    const filterValue = name.toLowerCase();
    return this.indicator?.featureIndicator.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  private requisitaIndicators(id: string) {
    return this.indicator = this.indicatorService.retornarIndicador(id);
  }
  applyOption(event: Event, item: any) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.value;

    // Agora você tem a opção selecionada e o item correspondente.
    // Você pode aplicar a opção ao item como desejar.
    console.log(`Opção selecionada: ${selectedOption}, item: ${item.nome}`);
  }
}
