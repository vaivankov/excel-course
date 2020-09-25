import "./less/style.less";
import {Excel} from "./components/excel/Excel";
import {Header} from "./components/header/Header";
import {Toolbar} from "./components/toolbar/Toolbar";
import {Formula} from "./components/formula/Formula";
import {Table} from "./components/table/Table";
import {createStore} from "./core/createStore";
import {storage} from "./core/utils";
import {rootReducer} from "./redux/rootReducer";

const store = createStore(
    rootReducer,
    {
      colState: {},
    }
);

store.subscribe((state) => {
  console.log(
      'AppState',
      state
  );
  storage(
      'excel-state',
      state
  );
});

const excel = new Excel(
    "#app",
    {
      components: [Header, Toolbar, Formula, Table],
      store,
    }
);

excel.render();
