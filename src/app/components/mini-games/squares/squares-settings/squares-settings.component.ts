import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Inject,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-squares-settings',
  templateUrl: './squares-settings.component.html',
  styleUrls: ['./squares-settings.component.scss'],
})
export class SquaresSettingsComponent {
  gridSize: string;
  timeLimit: number;
  playerName: string;
  computerName: string;
  cellColor: string;
  gridSizeError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<SquaresSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.gridSize = data.gridSize;
    this.timeLimit = data.timeLimit;
    this.playerName = data.playerName;
    this.computerName = data.computerName;
    this.cellColor = data.cellColor;
  }

  validateGridSize(): void {
    const checkFormat = /^[1-9][0-9]*x[1-9][0-9]*$/;
    const [rows, cols] = this.gridSize
      .split('x')
      .map((dim: string) => parseInt(dim, 10));

    this.gridSizeError =
      rows > 10 || cols > 13 || !checkFormat.test(this.gridSize);
  }

  saveSettings(): void {
    if (this.gridSizeError) {
      return;
    }
    const settings = {
      gridSize: this.gridSize,
      timeLimit: this.timeLimit,
      playerName: this.playerName,
      computerName: this.computerName,
      cellColor: this.cellColor,
    };
    this.dialogRef.close(settings);
  }
}
