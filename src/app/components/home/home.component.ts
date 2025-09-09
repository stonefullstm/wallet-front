import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { GreaterComponent } from '../greater/greater.component';
import { GraphicsComponent } from '../graphics/graphics.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [ToolbarComponent, GreaterComponent, GraphicsComponent],
})
export class HomeComponent {}
