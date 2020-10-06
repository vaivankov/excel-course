import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {defaultTableState} from "../../constants";
import {ActiveRoute} from "../../core/routes/ActiveRoute";
import * as actions from "../../redux/actions";
import {createHeader} from "./header_template";

export class Header extends ExcelStateComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super(
        $root,
        {
          name: 'Header',
          listeners: ['change', 'click'],
          subscribes: ['currentTableState'],
          ...options,
        }
    );
  }

  prepare() {
    this.initState(defaultTableState);
  }

  get template() {
    return createHeader(this.store.getState());
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentTableState);
  }

  updateTitleInStore(value) {
    this.$dispatch(actions.changeTitle(value));
  }

  onChange(evt) {
    const value = {'title': evt.target.value};
    this.updateTitleInStore(value);
  }

  onClick(evt) {
    let decision;
    switch (evt.target.dataset.action) {
      case "destroy":
        decision = confirm('DELETE this table?');
        if (decision) {
          localStorage.removeItem('excel:' + ActiveRoute.param);
          window.location.href = window.location.origin +
            window.location.pathname;
        }
        break;
      case "exit":
        window.location.href = window.location.origin +
          window.location.pathname;
        break;
    }
  }
}
