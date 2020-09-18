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
      if (!this[methodName]) {
        throw new Error(
            `Method ${methodName} does not exist in ${this.name} Component!`
        );
      }
      this[methodName] = this[methodName].bind(this);
      this.$root.on(listener, this[methodName]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const methodName = getMethodName(listener);
      this.$root.off(listener, this[methodName]);
    });
  }
}

function getMethodName(eventName) {
  return 'on'+ capitalize(eventName);
}
