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


  let printIconBox = icons => {
    let printedIcons = icons.map(icon => {
      if (typeof icon === "object") {
        return `
          <i class="fa-3x ${icon.weight} ${icon.icon}"></i>
        ` 
      } else if (typeof icon === "string") {
        return `
          <i class="fa-3x fas ${icon}"></i>
        ` 
      }
    })

    return printedIcons.join("")
  }

  let html =  `

  <label class="mys-radio">
    <input type="${type}" name="${baseID}" id="${baseID}-${boxID}" class="mys-radio__control"
      ${toggle ? `data-toggle="${toggle}"` : ""}
      ${rToggle ? `data-r-toggle="${rToggle}"` : ""}
      ${inject ? `data-inject="${inject}"` : ""}
      ${modifiers && modifiers.includes("disabled") ? "disabled" : ""}
      ${modifiers && modifiers.includes("hidden") ? "hidden" : ""}
      ${modifiers && modifiers.includes("checked") ? "checked" : ""}>
    <span class="mys-radio__box mys-radio__box--large">
      ${printIconBox(icons)}
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