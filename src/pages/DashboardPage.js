import {$} from "../core/dom";
import {Page} from "../core/Page";
import {createTableRecords} from "./dashboard_functions";

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();
    return $
        .create(
            'div',
            'dashboard'
        )
        .html(`
          <div class="dashboard__header"><h1>Excel Dashboard</h1></div>
          <div class="dashboard__new">
            <div class="dashboard__view">
              <a class="dashboard__create" href="#excel/${now}"
                >Create <br />
                new table</a
              >
            </div>
          </div>
          <div class="dashboard__tables dashboard__view">
            ${createTableRecords()}
          </div>
      `);
  }
}
