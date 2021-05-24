import { Component, OnInit } from '@angular/core';
import { SelectionParameters, TipoDePagos } from 'src/app/config/selection-parameters';
import { TableDebtsColumns } from 'src/app/config/table-debts-columns';
import { DataListPayment } from 'src/app/data/data-list-payment';

@Component({
  selector: 'app-data-table1',
  templateUrl: './data-table1.component.html',
  styleUrls: ['./data-table1.component.scss']
})
export class DataTable1Component {

  public columnsTable: any;
  public elementsTable: any;
  public tipoDePagos: any;
  private selectedDebts = [];
  public selectionParameters: any;
  public debtsList: Array<any>;
  public companiesList: Array<any>;
  public servicesList: Array<any>;

  constructor() {
    this.selectionParameters = SelectionParameters;
    this.columnsTable = TableDebtsColumns;
    this.tipoDePagos = TipoDePagos;

    this.debtsList = DataListPayment;
    this.debtsList = this.debtsList.map((_i, x )=> {
      _i['isChecked'] = false;
      _i['isDisabled'] = this.selectionParameters.isIntercalated ? false : true;
      _i['minimo'] = 'S/ 100';
      _i['otroMonto'] = 'S/ 200';
      _i['total'] = _i.amount;
      _i['showInput'] = false;
      return _i;
    })
    this.debtsList[0].isDisabled = false;
  }

  changeSelectTipoPago(event: any, item: any): void {
    console.log(event.target.value)
    item.showInput = false;
    switch (event.target.value) {
      case "1":
        item.amount = `${item.minimo}`;
        break;
      case "2":
        item.showInput = true;
        break;
      case "3":
        item.amount = `${item.total}`;
        break;
      default:
        break;
    }
  }

  changeAmount(event: any, item: any): void {
    console.log(event.target.value)
    item.amount = `S/ ${event.target.value}`;
    console.log(this.debtsList);
  }

  selectedItem(item: any, index: number) {
    console.log(item)
    item.isChecked = !item.isChecked;
    const countChecked = this.debtsList.filter(_ => _.isChecked).length;
    if (this.selectionParameters.isIntercalated) {
      if (countChecked === this.selectionParameters.selectedItems)
        this.debtsList.map(_i => !_i.isChecked && (_i.isDisabled = true));
      else this.debtsList.map(_i => _i.isDisabled && (_i.isDisabled = false));
    } else {
      if (countChecked < this.selectionParameters.selectedItems)
        this.debtsList[index + 1].isDisabled = !item.isChecked;
    }
  }

  getDebts(clientCode) {
    /*
    this.paymentService.getDebts(clientCode).subscribe(response => {
      this.debtsList = response;
      this.debtsList = this.debtsList.map((_i, x )=> {
        _i['isChecked'] = false;
        _i['isDisabled'] = this.selectionParameters.isIntercalated ? false : true;
        return _i;
      })
      this.debtsList[0].isDisabled = false;
      if(response) {
        this.showResult = true;
      }
      
    })*/
  }

}
