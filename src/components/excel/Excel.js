import {$} from '../../core/dom';
import {Emitter} from '../../core/Emitter';
import {StoreSubscriber} from '../../core/StoreSubscriber';

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRootElement() {
    const $rootElement = $.create(
        'div',
        'excel'
    );

    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
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

  init() {
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach((component) => component.destroy());
  }
}
