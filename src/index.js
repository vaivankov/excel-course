import "./less/style.less";
import {Excel} from "./components/excel/Excel";
import {Header} from "./components/header/Header";
import {Toolbar} from "./components/toolbar/Toolbar";
import {Formula} from "./components/formula/Formula";
import {Table} from "./components/table/Table";
import {createStore} from "./core/createStore";
import {checkStorage, debounce} from "./core/utils";
import {rootReducer} from "./redux/rootReducer";
import {initialState} from "./redux/initial_state";

const store = createStore(
    rootReducer,
    initialState
);

const stateListener = debounce(
    (state) => {
      checkStorage(
          'excel-state',
          state
      );
    },
    300
);

store.subscribe(stateListener);

const excel = new Excel(
    "#app",
    {
      components: [Header, Toolbar, Formula, Table],
      store,
    }
);

excel.render();
