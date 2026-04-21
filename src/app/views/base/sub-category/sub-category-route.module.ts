import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubCategoryComponent } from './sub-category.component';

const routes: Routes = [
  {
    path: '',
    component: SubCategoryComponent,
    data: {
      title: 'Alt Kategoriler'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryRouterModule { }