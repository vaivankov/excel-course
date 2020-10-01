import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {defaultTableState} from "../../constants";
import {createHeader} from "./header_template";

export class Header extends ExcelStateComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super(
        $root,
        {
          name: 'Header',
          listeners: ['change'],
          subscribe: ['currentTitle'],
          ...options,
        }
    );
  }

  prepare() {
    this.initState(defaultTableState);
  }

  get template() {
    return createHeader(this.state);
  }

  toHTML() {
    return this.template;
  }

  onChange(evt) {
    console.log(evt);
    console.log(evt.target.value);
  }
}
