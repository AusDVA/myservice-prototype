module.exports = box => {
  let { modifiers, 
        text, 
        hint,
        toggle,
        rToggle,
        inject,
        type,
        baseID,
        boxID,
        icons
       } = box;


  if (typeof icon === "object") {
    icon = `<i class="fa-3x ${icon.weight} ${icon.icon}"></i>` ;
  } else if (typeof icon === "string") {
    icon = `<i class="fa-3x fas ${icon}"></i>`;
  }

  let html =  `
  <div class="radio-icon">
    <input type="${type}" name="${baseID}" id="${baseID}-${boxID}" class="radio-icon__control"
      ${toggle ? `data-toggle="${toggle}"` : ""}
      ${rToggle ? `data-r-toggle="${rToggle}"` : ""}
      ${inject ? `data-inject="${inject}"` : ""}
      ${modifiers && modifiers.includes("disabled") ? "disabled" : ""}
      ${modifiers && modifiers.includes("hidden") ? "hidden" : ""}
      ${modifiers && modifiers.includes("checked") ? "checked" : ""}
    >
    <label for="${baseID}-${boxID}" class="radio-icon__label">
      ${icon}
      <span class="radio-icon__text">${text}</span>
    </label>
  </div>
  <label class="mys-radio">
    <input type="${type}" name="${baseID}" id="${baseID}-${boxID}" class="mys-radio__control"
      ${toggle ? `data-toggle="${toggle}"` : ""}
      ${rToggle ? `data-r-toggle="${rToggle}"` : ""}
      ${inject ? `data-inject="${inject}"` : ""}
      ${modifiers && modifiers.includes("disabled") ? "disabled" : ""}
      ${modifiers && modifiers.includes("hidden") ? "hidden" : ""}
      ${modifiers && modifiers.includes("checked") ? "checked" : ""}>
    <span class="mys-radio__box mys-radio__box--large">
      ${icon}
      <div class="margin-above">${text}</div>
    </span>
  </label>`

  return {
    html,
    toggle,
    rToggle,
    inject
  }

}