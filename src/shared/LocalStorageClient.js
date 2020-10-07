import {checkStorage} from "../core/utils";

function storageName(param) {
  return 'excel:' + param;
}

export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name);
  }

  save(state) {
    checkStorage(
        this.name,
        state
    );

    return Promise.resolve();
  }

  get() {
    return new Promise((resolve, reject) => {
      const state = checkStorage(this.name);

      setTimeout(
          () => {
            resolve(state);
          },
          1000
      );
    });
  }
}
