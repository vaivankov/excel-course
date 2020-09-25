class Dom {
  constructor(selector) {
    this.$element = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$element.innerHTML = html;
      return this;
    }
    return this.$element.outerHTML.trim();
  }

  text(text) {
    if (typeof text === 'string') {
      this.$element.textContent = text;
      return this;
    }
    if (this.$element.tagName.toLowerCase() === 'input') {
      return this.$element.value.trim();
    }
    return this.$element.textContent.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$element.addEventListener(
        eventType,
        callback
    );
  }

  off(eventType, callback) {
    this.$element.removeEventListener(
        eventType,
        callback
    );
  }

  appendChild(node) {
    if (Element.prototype.appendChild) {
      this.$element.appendChild(node.$element);
    }
  }

  closest(selector) {
    return $(this.$element.closest(selector));
  }

  getCoords() {
    return this.$element.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$element.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.$element.querySelector(selector));
  }

  getId(parse) {
    if (parse) {
      const parsed = this.getId().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.$element.dataset.id;
  }

  focusCell() {
    this.$element.focus();
    return this;
  }

  css(styles = {}) {
    Object
        .keys(styles)
        .forEach((key) =>
          this.$element.style[key] = styles[key]);
  }

  addClass(className) {
    this.$element.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$element.classList.remove(className);
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, className = '') => {
  const el = document.createElement(tagName);

  if (className) {
    el.classList.add(className);
  }

  return $(el);
};
