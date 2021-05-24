import { Component, VERSION } from "@angular/core";
import { TipoDePagos } from "./config/selection-parameters";
import { SelectionParameters } from "./config/selection-parameters";
import { DataListPayment } from "./data/data-list-payment";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public elementsTable: any;
  public tipoDePagos: any;
  public selectionParameters: any;
  public debtsList: Array<any>;

  constructor() {
    this.selectionParameters = SelectionParameters;
    this.tipoDePagos = TipoDePagos;

    this.debtsList = DataListPayment;
    this.debtsList = this.debtsList.map((_i, x) => {
      _i['isChecked'] = false;
      _i['isDisabled'] = this.selectionParameters.isIntercalated ? false : true;
      _i['minimo'] = 'S/ 100';
      _i['otroMonto'] = 'S/ 200';
      _i['total'] = _i.amount;
      _i['showInput'] = false;
      _i['stateErr'] = '';
      _i['textErr'] = ''
      console.log(_i);
      return _i;
    })
    this.debtsList[0].isDisabled = false;
    /* if (response) {
      this.showResult = true;
    } */
  }


}
