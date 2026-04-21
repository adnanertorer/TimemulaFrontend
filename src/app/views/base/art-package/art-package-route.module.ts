import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtPackageComponent } from './art-package.component';

const routes: Routes = [
  {
    path: '',
    component: ArtPackageComponent,
    data: {
      title: 'Paketler'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtPackageRouterModule { }