module.exports = box => {
  let { modifiers, 
        text, 
        hint,
        toggle,
        rToggle,
        inject,
        type,
        baseID,
        boxID
       } = box;


  let html = `
    <div class="uiToolKitCheckBox">
      <label class="uikit-control-input">
        <input 
          type="${type}" 
          class="uikit-control-input__input" 
          id="${baseID}-${boxID}" 
          name="${baseID}"
          ${toggle ? `data-toggle="${toggle}"` : ""}
          ${rToggle ? `data-r-toggle="${rToggle}"` : ""}
          ${inject ? `data-inject="${inject}"` : ""}
          ${modifiers && modifiers.includes("disabled") ? "disabled" : ""}
          ${modifiers && modifiers.includes("hidden") ? "hidden" : ""}
        >
        <span 
          class="uikit-control-input__text">
            ${text}
            ${hint ? `${modifiers && modifiers.includes("hintNewLine") ? "<br>" : ""} <span class="hint">${hint}</span>` : ""}
          </span>
      </label>
    </div>
  `;

  return {
    html,
    toggle,
    rToggle,
    inject
  }

}
