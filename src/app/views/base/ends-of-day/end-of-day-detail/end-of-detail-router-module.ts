import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndOfDayDetailComponent } from './end-of-day-detail.component';

const routes: Routes = [
    {
        path: '',
        component: EndOfDayDetailComponent,
        data: {
            title: 'Gün sonu rapor detayı'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EndOfDetailRouterModule { }
