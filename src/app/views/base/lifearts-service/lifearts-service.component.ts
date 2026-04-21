import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LifeartsService } from 'src/app/shared/model/lifearts-service';
import { LifeartsArtServiceService } from 'src/app/shared/services/lifearts-service.service';
import Constants from 'src/app/shared/tools/constants';
declare let alertify: any;

@Component({
  selector: 'app-lifearts-service',
  templateUrl: './lifearts-service.component.html',
  styleUrls: ['./lifearts-service.component.scss']
})
export class LifeartsServiceComponent implements OnInit {

  lifeartsService: LifeartsService;
  serviceList: LifeartsService[] = [];
  pageOfItems: Array<any>;
  buttonText = Constants.Save;
  constructor(private service: LifeartsArtServiceService, private router: Router) { }

  ngOnInit() {
    this.buttonText = Constants.Save;
    this.lifeartsService = {
      createdBy: 0,
      id: 0,
      serviceName: ""
    };
    this.getList();
  }

  getSubServices(val) {
    this.router.navigate([]).then(result => { window.open(`genel-tanimlar/alt-hizmetler.html/${val}`, '_self'); });
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.lifeartsService = resource;
    this.buttonText = Constants.Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    if (this.lifeartsService.id == 0) {
      this.service.add(this.lifeartsService).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.lifeartsService).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    }
  }

  getList(): void {
    this.service.getList().subscribe((data) => {
      this.serviceList = data.dynamicClass as LifeartsService[];
      this.pageOfItems = this.serviceList;
    })
  }

  remove(id: number): void {
    this.service.remove(id).subscribe((data) => {
      if (data.success) {
        this.ngOnInit();
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      } else {
        alert(data.clientMessage);
      }
    });
  }

}
