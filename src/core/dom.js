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

  clear() {
    this.html('');
    return this;
  }

  appendChild(node) {
    if (Element.prototype.appendChild) {
      this.$element.appendChild(node.$element);
    }
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
