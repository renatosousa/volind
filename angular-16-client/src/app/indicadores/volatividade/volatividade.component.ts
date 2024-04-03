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
    myControl = new FormControl<string | any>('');
    options: any[] = [{ name: 'Petro' }, { name: 'Dolar' }, { name: 'Bovespa' }];
    indicator:  Indicator | undefined;
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

  filteredOptions: Observable<any[]> | undefined;
  constructor(private indicatorService: IndicadoresService, private router: ActivatedRoute,  private breakpointObserver: BreakpointObserver) {}


isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );




  ngOnInit() {
     this.router.params.subscribe(params => {
       this.indicator = this.requisitaIndicators(params['id'])
            

     }
  )

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private requisitaIndicators(id: string) {
  return  this.indicator = this.indicatorService.retornarIndicador(id);
  }

}
