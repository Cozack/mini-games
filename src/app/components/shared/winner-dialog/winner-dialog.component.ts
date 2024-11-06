import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-winner-dialog',
  templateUrl: './winner-dialog.component.html',
  styleUrls: ['./winner-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  standalone: true
})
export class WinnerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WinnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { winner: string }
  ) {}

  onNewGame(): void {
    this.dialogRef.close('newGame');
  }

  onExit(): void {
    this.dialogRef.close('exit');
  }

}
