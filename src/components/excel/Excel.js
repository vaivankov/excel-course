import {$} from '../../core/dom';
import {Emitter} from '../../core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.$app = document.querySelector(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRootElement() {
    const $rootElement = $.create(
        'div',
        'excel'
    );

    const componentOptions = {
      emitter: this.emitter,
    };

    this.components = this.components.map((Component) => {
      const $component = $.create(
          'div',
          Component.className
      );
      const component = new Component(
          $component,
          componentOptions
      );
      $component.html(component.toHTML());
      $rootElement.appendChild($component);
      return component;
    });

    return $rootElement;
  }

  render() {
    this.$app.appendChild(this.getRootElement().$element);
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
