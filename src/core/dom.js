class Dom {
  constructor() {

  }
}

export function $() {
  return new Dom();
}

$.create = (tagName, className = '') => {
  const el = document.createElement(tagName);

  if (className) {
    el.classList.add(className);
  }

  return el;
};
