import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TickersService } from '../../services/api/tickers.service';
import { TickerData } from '../../models/tickerData';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-search-bar',
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnInit {
  private tickersService = inject(TickersService);
  myControl = new FormControl('');

  tickerList: TickerData[] = [];
  filteredOptions: Observable<string[]> = new Observable<string[]>();
  options: string[] = [];

  ngOnInit(): void {
    this.getTickerList();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  getTickerList() {
    this.tickersService.getTickers().subscribe({
      next: (data) => {
        this.tickerList = data;
        this.options = data.map((ticker) => ticker.ticker);
      },
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue),
    );
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedValue: string = event.option.value;
    console.log(selectedValue);

    // this.myControl.setValue(inputValue, { emitEvent: false });
  }
}
