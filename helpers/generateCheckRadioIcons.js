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
        icon
       } = box;

  let generateID = box.id ? box.id : baseID + '-' + boxID;


  if (typeof icon === "object") {
    icon = `<i class="radio_icons__icon ${icon.weight ? icon.weight : 'fal'} ${icon.icon}"></i>` ;
  } else if (typeof icon === "string") {
    icon = `<i class="radio_icons__icon fal ${icon}"></i>`;
  }

  let html =  `
  <div class="radio-icon">
    <input type="${type}" name="${baseID}" id="${generateID}" class="radio-icon__control"
      ${toggle ? `data-toggle="${toggle}"` : ""}
      ${rToggle ? `data-r-toggle="${rToggle}"` : ""}
      ${inject ? `data-inject="${inject}"` : ""}
      ${modifiers && modifiers.includes("disabled") ? "disabled" : ""}
      ${modifiers && modifiers.includes("hidden") ? "hidden" : ""}
      ${modifiers && modifiers.includes("checked") ? "checked" : ""}
    >
    <label for="${generateID}" class="radio-icon__label">
      ${icon}
      <span class="radio-icon__text">${text}</span>
    </label>
  </div>`

  return {
    html,
    toggle,
    rToggle,
    inject
  }

}