import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataTable1Component } from './components/data-table1/data-table1.component';
import { DataTable2Component } from './components/data-table2/data-table2.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [	 AppComponent,
      DataTable1Component,
      DataTable2Component
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
