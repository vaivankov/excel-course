function toButton(button) {
  return `
    <button 
      class="button header__button" 
      type="button" 
    >
      <span class="material-icons">${button.icon}</span>
    </button>
  `;
}

export function createHeader(state) {
  const buttons = [
    {icon: "delete"},
    {icon: "exit_to_app"},
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
