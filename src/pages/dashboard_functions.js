import {checkStorage} from "../core/utils";

function toHTML(key) {
  const state = checkStorage(key);
  const ms = parseTime(key);
  const date = new Date(ms);

  return `
      <li>
        <a
          class="dashboard__record"
          href="#excel/${ms}"
        >
          ${state.currentTableState.title}
          <time datetime="${date.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]}">
            <b>
              ${date.toLocaleTimeString() +
              ' ' + date.toLocaleDateString()}
            </b>
          </time>
        </a>
      </li>  
  `;
}

function parseTime(key) {
  return +key.match(/\d+/)[0];
}

function getAllKeys() {
  const keys = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }

  return keys.reverse();
}

export function createTableRecords() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p>There are no any tables</p>`;
  }

  return `<div class="dashboard__list-header">
            <span>Name</span>
            <span>Date</span>
          </div>
          <ul class="dashboard__list">
            ${keys.map(toHTML).join('')}
          </ul>`;
}
