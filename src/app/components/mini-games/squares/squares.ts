import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SquaresSettingsComponent } from './squares-settings/squares-settings.component';
import { Router, RouterLink } from '@angular/router';
import { WinnerDialogComponent } from '../../shared/winner-dialog/winner-dialog.component';

@Component({
  selector: 'app-mini-games',
  templateUrl: './squares.html',
  styleUrls: ['./squares.scss'],
  imports: [FormsModule, NgClass, NgForOf, NgIf, NgStyle, RouterLink],
  standalone: true,
})
export class Squares implements OnInit, OnDestroy {
  gridSize: number[] = [10, 10];
  timeLimit: number = 1000;
  playerName: string = 'Player';
  computerName: string = 'Computer';
  cellColor: string = 'blue';
  isSettingsApplied = false;
  grid: any[] = [];
  playerScore: number = 0;
  computerScore: number = 0;
  gameTimeout: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.openSettings();
  }

  createGrid(): void {
    this.grid = Array.from({ length: this.gridSize[0] }, () =>
      Array.from({ length: this.gridSize[1] }, () => ({
        status: this.cellColor,
      })),
    );
  }

  startGame(): void {
    this.startRound();
  }

  startRound(): void {
    const randomRow = Math.floor(Math.random() * this.gridSize[0]);
    const randomCol = Math.floor(Math.random() * this.gridSize[1]);

    this.grid[randomRow][randomCol].status =
      this.cellColor === 'yellow' ? 'purple' : 'yellow';

    if (this.gameTimeout) {
      clearTimeout(this.gameTimeout);
    }

    this.gameTimeout = setTimeout(() => {
      console.log(this.grid[randomRow][randomCol].status, 'status');
      console.log(this.grid, 'grid');
      if (
        this.grid[randomRow][randomCol].status ===
        (this.cellColor === 'yellow' ? 'purple' : 'yellow')
      ) {
        this.grid[randomRow][randomCol].status =
          this.cellColor === 'red' ? 'orange' : 'red';
        this.computerScore++;
        this.checkGameStatus();
      }
    }, this.timeLimit);
  }

  onCellClick(row: number, col: number): void {
    if (
      this.grid[row][col].status ===
      (this.cellColor === 'yellow' ? 'purple' : 'yellow')
    ) {
      this.grid[row][col].status =
        this.cellColor === 'green' ? 'blue' : 'green';
      this.playerScore++;
      this.checkGameStatus();
    }
  }

  checkGameStatus(): void {
    if (this.playerScore >= 10 || this.computerScore >= 10) {
      const winner =
        this.playerScore >= 10 ? this.playerName : this.computerName;
      const dialogRef = this.dialog.open(WinnerDialogComponent, {
        width: '300px',
        data: { winner: winner },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'newGame') {
          this.playerScore = 0;
          this.computerScore = 0;
          this.createGrid();
        } else {
          this.router.navigateByUrl('/');
        }
      });
    } else {
      this.startRound();
    }
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(SquaresSettingsComponent, {
      width: '400px',
      data: {
        gridSize: this.gridSize.join('x'),
        timeLimit: this.timeLimit,
        playerName: this.playerName,
        computerName: this.computerName,
        cellColor: this.cellColor,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.startGameFromSettings(result);
      }
    });
  }

  startGameFromSettings(settings: any): void {
    const [rows, cols] = settings.gridSize
      .split('x')
      .map((dim: string) => parseInt(dim, 10));
    this.gridSize = [rows, cols];
    this.timeLimit = settings.timeLimit;
    this.playerName = settings.playerName;
    this.computerName = settings.computerName;
    this.cellColor = settings.cellColor;

    this.createGrid();
    this.isSettingsApplied = true;
  }

  getAnimationDelay(row: number, col: number): string {
    const centerX = Math.floor(this.gridSize[0] / 2);
    const centerY = Math.floor(this.gridSize[1] / 2);
    const distance = Math.abs(row - centerX) + Math.abs(col - centerY);
    return `${distance * 50}ms`;
  }

  ngOnDestroy(): void {
    if (this.gameTimeout) {
      clearTimeout(this.gameTimeout);
    }
  }
}
