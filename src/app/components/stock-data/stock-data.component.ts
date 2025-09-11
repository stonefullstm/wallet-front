import { Component } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { MatCardModule } from '@angular/material/card';
import { GraphicsComponent } from '../graphics/graphics.component';

@Component({
  selector: 'app-stock-data',
  imports: [ToolbarComponent, MatCardModule, GraphicsComponent],
  templateUrl: './stock-data.component.html',
  styleUrl: './stock-data.component.css'
})
export class StockDataComponent {

}
