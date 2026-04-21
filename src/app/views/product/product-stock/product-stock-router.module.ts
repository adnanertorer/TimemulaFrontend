import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductStockComponent } from './product-stock.component';

const routes: Routes = [
  {
    path: '',
    component: ProductStockComponent,
    data: {
      title: 'Ürünler İşlemleri'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductStockRouterModule { }
