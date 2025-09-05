import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HistoryService } from '../../services/api/history.service';
import { GreaterData } from '../../models/greaterData';

@Component({
  selector: 'app-greater',
  imports: [MatTableModule, CommonModule],
  templateUrl: './greater.component.html',
  styleUrl: './greater.component.css',
})
export class GreaterComponent implements OnInit {
  displayedColumns: string[] = ['position', 'ticker', 'value'];
  dataSource: GreaterData[] = [];
  valueLabel = '%';
  @Input() dataType = 0;

  private historyService: HistoryService = inject(HistoryService);

  ngOnInit(): void {
    this.getMaxMinData();
  }

  getMaxMinData() {
    this.historyService.getMaxMinData().subscribe({
      next: (data) => {
        // this.numero = this.dataType;
        console.log(this.dataType);
        if (this.dataType == 0) {
          data.sort((a, b) => b.alta_baixa - a.alta_baixa);
        } else if (this.dataType == 1) {
          data.sort((a, b) => a.alta_baixa - b.alta_baixa);
        } else {
          data.sort((a, b) => b.volume - a.volume);
          this.valueLabel = 'R$';
        }
        this.dataSource = data.slice(0, 10).map((item, index) => ({
          position: index + 1,
          ticker: item.ticker,
          value: this.dataType == 2 ? item.volume : item.alta_baixa,
        }));
      },
    });
  }
}
