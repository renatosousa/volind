import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolatividadeComponent } from './indicadores/volatividade/volatividade.component';
import { LongandshortComponent } from './indicadores/longandshort/longandshort.component';
import { PtaxComponent } from './indicadores/ptax/ptax.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';

const routes: Routes = [
    {
    path: 'volatividade',
    component: VolatividadeComponent
  },
  {
    path: 'longandshort',
    component:  LongandshortComponent
  }
  ,
   {
    path: 'ptax',
    component:  PtaxComponent
  },
     { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'tutorials/:id', component: TutorialDetailsComponent },
  { path: 'add', component: AddTutorialComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
