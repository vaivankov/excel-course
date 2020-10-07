import {checkStorage} from "../core/utils";

function toHTML(key) {
  const state = checkStorage(key);
  const ms = +key.split(':')[1];
  const date = new Date(Date.parse(state.openedDate));
  const title = state.currentTableState.title;
  const dateISO = date.toISOString();
  const dateTime = date.toLocaleTimeString();
  const dateDate = date.toLocaleDateString();

  return `
      <li>
        <a class="dashboard__record" href="#excel/${ms}">
          ${title}
          <time datetime="${dateISO}">
            <b>${dateTime + ' ' + dateDate}</b>
          </time>
        </a>
      </li>  
  `;
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

  return keys;
}

export function createTableRecords() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p>There are no any tables</p>`;
  }

  return `<div class="dashboard__list-header">
            <span>Name</span>
            <span>Last opened</span>
          </div>
          <ul class="dashboard__list">
            ${keys.map(toHTML).join('')}
          </ul>`;
}
