import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { GraphicsComponent } from '../graphics/graphics.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-data',
  imports: [ToolbarComponent, MatCardModule, GraphicsComponent],
  templateUrl: './stock-data.component.html',
  styleUrl: './stock-data.component.css',
})
export class StockDataComponent implements OnInit {
  ticker: string = '';
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.ticker =
      this.activatedRoute.snapshot.paramMap.get('ticker') || '^BVSP';
  }
}
