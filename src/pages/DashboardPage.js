import {$} from "../core/dom";
import {Page} from "../core/Page";

export class DashboardPage extends Page {
  getRoot() {
    return $
        .create(
            'div',
            'dashboard'
        )
        .html(`
          <div class="dashboard__header"><h1>Excel Dashboard</h1></div>
          <div class="dashboard__new">
            <div class="dashboard__view">
              <a class="dashboard__create" href="#"
                >Create <br />
                new table</a
              >
            </div>
          </div>
          <div class="dashboard__tables dashboard__view">
            <div class="dashboard__list-header">
              <span>Name</span>
              <span>Date</span>
            </div>
            <ul class="dashboard__list">
              <li class="dashboard__record">
                <a class="dashboard__link" href="#">Table 1</a>
                <time datetime="2020-12-06">
                  <b>12.06.2020</b>
                </time>
              </li>

              <li class="dashboard__record">
                <a class="dashboard__link" href="#">Table 2</a>
                <time datetime="2020-12-06">
                  <b>12.06.2020</b>
                </time>
              </li>
            </ul>
          </div>
      `);
  }
}
