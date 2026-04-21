import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResourcesComponent } from './search-resources.component';

const routes: Routes = [
  {
    path: '',
    component: SearchResourcesComponent,
    data: {
      title: 'Arama Motorları'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchResourceRouterModule { }