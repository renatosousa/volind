import { Component, OnInit } from '@angular/core';
 import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay, startWith } from 'rxjs';
import { FormControl} from '@angular/forms';


@Component({
  selector: 'app-volatividade',
  templateUrl: './volatividade.component.html',
  styleUrls: ['./volatividade.component.scss'],


 })
export class VolatividadeComponent implements OnInit {
    myControl = new FormControl<string | any>('');
  options: any[] = [{ name: 'Petro' }, { name: 'Dolar' }, { name: 'Bovespa' }];


  filteredOptions: Observable<any[]> | undefined;
  constructor(private breakpointObserver: BreakpointObserver) {}


isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );




  ngOnInit() {
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
}
