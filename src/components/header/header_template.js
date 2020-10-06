function toButton(button) {
  return `
    <button 
      class="button header__button" 
      type="button"
      data-action="${button.action}"
    >
      <span
        class="material-icons"
        data-action="${button.action}"
      >
        ${button.icon}
      </span>
    </button>
  `;
}

export function createHeader(state) {
  const buttons = [
    {
      icon: "delete",
      action: "destroy",
    },
    {
      icon: "exit_to_app",
      action: "exit",
    },
  ];
  return `
      <div class="header__input-wrapper">
        <input
          type="text"
          class="header__input"
          value="${state.currentTableState.title}" 
        />
      </div>
      <div class="header__buttons-wrapper">
        ${buttons.map(toButton).join('')}
      </div>`;
}
