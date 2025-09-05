import { Component, inject, OnInit } from '@angular/core';
import { HistoryService } from '../../services/api/history.service';
import { HistoryData } from '../../models/historyData';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-graphics',
  imports: [PlotlyModule],
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.css',
})
export class GraphicsComponent implements OnInit {

  private historyService: HistoryService = inject(HistoryService);
  graph = {data: [{}], layout: {}};

  ngOnInit(): void {
    this.getHistoryData('^BVSP');
  }

  getHistoryData(ticker: string) {
    this.historyService.getHistoryData(ticker).subscribe({
      next: (res) => {
        console.log(res);
        console.log(res[0].date);
        this.graph = {
          data: [
            {
              x: res.map(item => item.date),
              open: res.map(item => item.open),
              high: res.map(item => item.high),
              low: res.map(item => item.low),
              close: res.map(item => item.close),
              type: 'candlestick',
            }
          ],
          layout: {
            title: '^BVSP History',
            xaxis: {
              rangeslider: { visible: true }
            }
          }
        }
      },
    });
  }
}
