import {capitalize} from "./utils";

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DOMListener!`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const methodName = getMethodName(listener);
      this.$root.on(listener, this[methodName]);
    });
  }

  removeDOMListeners() { }
}

function getMethodName(eventName) {
  return 'on'+ capitalize(eventName);
}
