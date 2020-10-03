import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super(
        $root,
        options.listeners
    );
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribes = options.subscribes || [];
    this.store = options.store;
    this.unsubscribers = [];

    this.prepare();
  }

  prepare() {
    return;
  }

  $emit(event, ...args) {
    this.emitter.emit(
        event,
        ...args
    );
  }

  $on(event, func) {
    const unsub = this.emitter.subscribe(
        event,
        func
    );
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  isWatching(key) {
    return this.subscribes.includes(key);
  }

  storeChanged() {
    return;
  }

  toHTML() {
    return "";
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
