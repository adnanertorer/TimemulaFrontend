import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable()
export class ConfirmationDialogService {

  constructor(private dialog: MatDialog) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'Evet',
    btnCancelText: string = 'Hayir',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: dialogSize === 'lg' ? '640px' : '420px',
      data: { title, message, btnOkText, btnCancelText },
    });

    return dialogRef.afterClosed().toPromise();
  }

}
