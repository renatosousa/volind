import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VolatividadeComponent } from './indicadores/volatividade/volatividade.component';
import { PtaxComponent } from './indicadores/ptax/ptax.component';
import { LongandshortComponent } from './indicadores/longandshort/longandshort.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
 import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { AngularDraggableModule } from 'angular2-draggable';
import { GoogleChartsModule } from 'angular-google-charts';
import { GoogleChartsConfigService, googleChartsConfigFactory } from './services/google-charts-config.service';
import { GOOGLE_CHARTS_LAZY_CONFIG } from 'angular-google-charts';
import { PieChartComponent } from './components/chart/pie-chart/pie-chart.component';
import { GtableComponent } from './components/chart/gtable/gtable.component';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    VolatividadeComponent,
    PtaxComponent,
    LongandshortComponent,
    PieChartComponent,
    GtableComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    DragDropModule,
    MatFormFieldModule,
    DragDropModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    AngularDraggableModule,
    MatRadioModule,
    GoogleChartsModule.forRoot({ version: 'current' }),


  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    GoogleChartsConfigService,
    {provide: GOOGLE_CHARTS_LAZY_CONFIG, useFactory: googleChartsConfigFactory, deps: [GoogleChartsConfigService]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
