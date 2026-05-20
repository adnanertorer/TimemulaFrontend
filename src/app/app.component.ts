import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';

declare let alertify: any;

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: 'app.component.html',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public iconSet: IconSetService
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    if (typeof alertify !== 'undefined') {
      alertify.set('notifier', 'position', 'bottom-right');
      alertify.set('notifier', 'delay', 3);
      alertify.defaults.transition = 'fade';
      alertify.defaults.theme.ok = 'btn btn-primary';
      alertify.defaults.theme.cancel = 'btn btn-outline-secondary';
    }

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
