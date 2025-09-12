import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { GreaterComponent } from '../greater/greater.component';
import { GraphicsComponent } from '../graphics/graphics.component';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    ToolbarComponent,
    GreaterComponent,
    GraphicsComponent,
    MatCardModule,
  ],
})
export class HomeComponent implements OnInit {
  ticker: string = '';
  private activatedRoute = inject(ActivatedRoute);


  ngOnInit(): void {
    this.ticker =
      this.activatedRoute.snapshot.paramMap.get('ticker') || '^BVSP';
  }
}
