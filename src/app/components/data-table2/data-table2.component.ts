import { Component, Input} from '@angular/core';
import { TipoDePagos, SelectionParameters } from "../../config/selection-parameters";


@Component({
  selector: 'app-data-table2',
  templateUrl: './data-table2.component.html',
  styleUrls: ['./data-table2.component.scss']
})
export class DataTable2Component {

  
  @Input() debtsList : any[];
  public checkAll: boolean;
  public selectionParameters: any;
  public tipoDePagos : any;
  constructor(
  ) {

    this.selectionParameters = SelectionParameters;
    this.checkAll = false;
    this.tipoDePagos = TipoDePagos;

  }

  ngOnInit(){
      
  }

  selectedItem(item: any, index: number) {

    item.isChecked = !item.isChecked
    const countChecked = this.debtsList.filter(_ => _.isChecked).length;
    if (this.selectionParameters.isIntercalated) {
      if (countChecked === this.selectionParameters.selectedItems) this.debtsList.forEach(_i => !_i.isChecked && (_i.isDisabled = true))
      else this.debtsList.map(_i => _i.isDisabled && (_i.isDisabled = false))
    } else {
      this.debtsList.forEach((_i, _x) => {
        if (_x > index) {
          _i.isChecked = false;
          _i.isDisabled = true;
        }
      })
      if (countChecked < this.selectionParameters.selectedItems) this.debtsList[index + 1].isDisabled = !item.isChecked;
    }
  }
  
  selectedAll(): void {
    this.checkAll = !this.checkAll;
    this.debtsList.forEach((_item, _index) => {
      if ((_index) < this.selectionParameters.selectedItems) {
        _item.isChecked = this.checkAll;
        !this.selectionParameters.isIntercalated && (_item.isDisabled = !this.checkAll);
      } else {
        this.selectionParameters.isIntercalated && (_item.isDisabled = this.checkAll);
      };
    });
    !this.checkAll && (this.debtsList[0].isDisabled = false);
    console.log(this.checkAll)
  }


  changeAmount(event: any, item: any): void {
    const minAmount = parseFloat(item.minimo.replace('S/ ',''));
    const maxAmount = item.total.replace('S/ ','').replace(',','');
    const actuallyAmount = parseFloat(event.detail);

    console.log(item.total)
    console.log(`monto ingresado : ${ minAmount}, montoMinimo : ${minAmount}, montoMax : ${maxAmount}`)
    if (actuallyAmount < minAmount || actuallyAmount > maxAmount) {
      item.stateErr = 'error';
      item.textErr = 'Monto invalido';
    } else {
      item.stateErr = '';
      item.textErr = '';
    }
    item.amount = `S/ ${actuallyAmount}`;
  }

  changeSelectTipoPago(event: any, item: any): void {
    console.log(event.target.value)
    item.showInput = false;
    switch (event.target.value) {
      case "1":
        item.amount = `${item.minimo}`
        break;
      case "2":
        item.showInput = true;
        break;
      case "3":
        item.amount = `${item.total}`
        break;
      default:
        break;
    }
  }


}
