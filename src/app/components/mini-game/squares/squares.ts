import {Component, OnDestroy} from '@angular/core';
import {interval, Subscription, take} from "rxjs";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-mini-game',
  templateUrl: './squares.html',
  styleUrls: ['./squares.scss'],
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class Squares implements OnDestroy {
  cells = Array.from({ length: 100 }, () => ({ status: 'blue' }));
  timeLimit = 1000;  // Час у мілісекундах
  playerScore = 0;
  computerScore = 0;
  activeCellIndex: number | null = null;
  gameOver = false;

  private timerSubscription: Subscription | null = null;
  private cellClicked = false;  // Додано для контролю натискання

  startGame(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.resetGame();
    this.nextTurn();
  }

  nextTurn(): void {
    this.clearActiveCell();  // Лише очищаємо активну жовту комірку

    this.cellClicked = false;  // Скидаємо стан натискання
    this.activeCellIndex = Math.floor(Math.random() * 100);
    this.cells[this.activeCellIndex].status = 'yellow';

    // Таймер для очікування натискання протягом вказаного часу
    this.timerSubscription = interval(this.timeLimit).pipe(take(1)).subscribe(() => {
      if (!this.cellClicked && this.activeCellIndex !== null) {
        // Якщо не було натискання, змінюємо колір на червоний
        this.cells[this.activeCellIndex].status = 'red';
        this.computerScore++;
        this.checkGameOver();
        if (!this.gameOver) this.nextTurn();
      }
    });
  }

  handleCellClick(index: number): void {
    if (index === this.activeCellIndex && this.cells[index].status === 'yellow') {
      this.cells[index].status = 'green';
      this.playerScore++;
      this.cellClicked = true;  // Встановлюємо стан натискання
      this.timerSubscription?.unsubscribe();  // Відміняємо таймер
      this.checkGameOver();
      if (!this.gameOver) this.nextTurn();
    }
  }

  checkGameOver(): void {
    if (this.playerScore >= 10 || this.computerScore >= 10) {
      this.gameOver = true;
      // Логіка для відображення модального вікна з результатом гри
    }
  }

  resetGame(): void {
    this.playerScore = 0;
    this.computerScore = 0;
    this.gameOver = false;
    this.cells.forEach(cell => cell.status = 'blue');
  }

  clearActiveCell(): void {
    // Лише очищає жовту комірку, не змінюючи червоні чи зелені
    if (this.activeCellIndex !== null && this.cells[this.activeCellIndex].status === 'yellow') {
      this.cells[this.activeCellIndex].status = 'blue';
    }
    this.activeCellIndex = null;
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }
}
