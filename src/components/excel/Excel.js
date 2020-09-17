import {$} from "../../core/dom";

export class Excel {
  constructor(selector, options) {
    this.$app = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRootElement() {
    const $rootElement = $.create('div', 'excel');

    this.components.forEach((Component) => {
      const $component = $.create('div', Component.className);
      const component = new Component($component);
      $component.html(component.toHTML());
      $rootElement.appendChild($component);
    });

    return $rootElement;
  }

  render() {
    this.$app.appendChild(this.getRootElement().$element);
  }
}
