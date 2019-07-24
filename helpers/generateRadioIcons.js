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
          <i class="radio-tile__icon radio-tile__icon--padding fa-3x ${icon.weight} ${icon.icon}"></i>
        ` 
      } else if (typeof icon === "string") {
        return `
          <i class="radio-tile__icon radio-tile__icon--padding fa-3x fas ${icon}"></i>
        ` 
      }
    })

    return printedIcons.join("")
  }

  let html =  `

  <label class="radio-tile">
    <input type="${type}" name="${baseID}" id="${baseID}-${boxID}" class="sr"
      ${toggle ? `data-toggle="${toggle}"` : ""}
      ${rToggle ? `data-r-toggle="${rToggle}"` : ""}
      ${inject ? `data-inject="${inject}"` : ""}
      ${modifiers && modifiers.includes("disabled") ? "disabled" : ""}
      ${modifiers && modifiers.includes("hidden") ? "hidden" : ""}
      ${modifiers && modifiers.includes("checked") ? "checked" : ""}>
      <span>
        ${printIconBox(icons)}
        ${text}
      </span>
  </label>`

  return {
    html,
    toggle,
    rToggle,
    inject
  }

}