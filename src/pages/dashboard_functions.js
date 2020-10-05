function toHTML() {
  return `
      <li class="dashboard__record">
        <a class="dashboard__link" href="#">Table 1</a>
        <time datetime="2020-12-06">
          <b>12.06.2020</b>
        </time>
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
            <span>Date</span>
          </div>
          <ul class="dashboard__list">
            ${keys.map(toHTML).join('')}
          </ul>`;
}
