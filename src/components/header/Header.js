import {ExcelComponent} from "@core/ExcelComponent";

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super(
        $root,
        {
          name: 'Header',
          ...options,
        }
    );
  }

  toHTML() {
    return `
      <div class="header__input-wrapper">
        <input type="text" class="header__input" value="New table" />
      </div>
      <div class="header__buttons-wrapper">
        <button class="button header__button" type="button">
          <span class="material-icons">delete</span>
        </button>
        <button class="button header__button" type="button">
          <span class="material-icons">exit_to_app</span>
        </button>
      </div>`;
  }
}
