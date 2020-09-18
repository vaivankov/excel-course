import {$} from "../../core/dom";

export class Excel {
  constructor(selector, options) {
    this.$app = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRootElement() {
    const $rootElement = $.create('div', 'excel');

    this.components = this.components.map((Component) => {
      const $component = $.create('div', Component.className);
      const component = new Component($component);
      $component.html(component.toHTML());
      $rootElement.appendChild($component);
      return component;
    });

    return $rootElement;
  }

  render() {
    this.$app.appendChild(this.getRootElement().$element);
    this.components.forEach((component) => component.init());
    this.components.forEach((component) => component.destroy());
  }
}
