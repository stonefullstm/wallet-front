import { Component, inject, OnInit } from '@angular/core';
import { HistoryService } from '../../services/api/history.service';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { ActivatedRoute } from '@angular/router';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-graphics',
  imports: [PlotlyModule],
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.css',
})
export class GraphicsComponent implements OnInit {
  private historyService: HistoryService = inject(HistoryService);
  ticker = '';
  private activatedRoute = inject(ActivatedRoute);
  graph = { data: [{}], layout: {} };

  ngOnInit(): void {
    this.ticker = this.activatedRoute.snapshot.paramMap.get('ticker') || '^BVSP';
    this.getHistoryData(this.ticker);
  }

  getHistoryData(ticker: string) {
    const Inicial = new Date();
    Inicial.setFullYear(Inicial.getFullYear() - 1);
    const dInicial: Date = Inicial;
    const dataFinal = new Date().toISOString().split('T')[0];
    const dataInicial = dInicial.toISOString().split('T')[0];
    // console.log(dataInicial, dataFinal);
    this.historyService
      .getHistoryData(ticker, dataInicial, dataFinal)
      .subscribe({
        next: (res) => {
          this.graph = {
            data: [
              // {
              //   x: res.map((item) => item.date),
              //   open: res.map((item) => item.open),
              //   high: res.map((item) => item.high),
              //   low: res.map((item) => item.low),
              //   close: res.map((item) => item.close),
              //   type: 'candlestick',
              // },
              {
                x: res.map((item) => item.date),
                y: res.map((item) => item.close),
                type: 'scatter',
                mode: 'lines',
                fill: 'tozeroy',
                line: { color: 'black' },
                fillcolor: '#b3c5ba',
              },
            ],
            layout: {
              title: { text: `Valores históricos de ${ticker}` },
              xaxis: {
                rangeslider: { visible: false },
              },
            },
          };
        },
      });
  }
}
