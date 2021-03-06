export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = [];
    this.current = null;
  }

  select($element) {
    this.clear();
    $element.focusCell().addClass(TableSelection.className);
    this.group.push($element);
    this.current = $element;
  }

  clear() {
    this.group.forEach(($element)=>{
      $element.removeClass(TableSelection.className);
    });
    this.group = [];
  }

  get selectedIds() {
    return this.group.map(($element)=>$element.getId());
  }

  selectGroup($group = []) {
    this.clear();

    this.group = $group;
    this.group.forEach(($element) => {
      $element.addClass(TableSelection.className);
    });
  }

  applyStyle(style) {
    this.group.forEach(($element)=>$element.css(style));
  }
}
