import {defaultToolbarStyles} from '../../constants';
import {$} from '../../core/dom';
import {ExcelStateComponent} from '../../core/ExcelStateComponent';
import {createToolbar} from './toolbar_template';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super(
        $root,
        {
          name: 'Toolbar',
          listeners: ['click'],
          subscribes: ['currentToolbarStyles'],
          ...options,
        }
    );
  }

  prepare() {
    this.initState(defaultToolbarStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentToolbarStyles);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit(
          'toolbar:applyStyle',
          value
      );
      const key = Object.keys(value)[0];
      this.setState({[key]: value[key]});
    }
  }
}
