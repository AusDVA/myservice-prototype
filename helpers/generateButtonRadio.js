module.exports = box => {
  let { modifiers, 
        text, 
        toggle,
        rToggle,
        baseID,
        boxID,
        suppliedID,
        labelPos
       } = box;

  let generatedID = suppliedID ? boxID : `${baseID}-${boxID}`;

  let html = `
    <label class="${labelPos}">
      <input
        type="radio"
        id="${generatedID}"
        name="${baseID}"
        ${toggle ? `data-toggle="${toggle}"` : ""}
        ${rToggle ? `data-r-toggle="${rToggle}"` : ""}
        ${modifiers.includes("checked") ? "checked" : ""}
        ${modifiers.includes("disabled") ? "disabled" : ""}
      >
      <span>${text}</span>
    </label>
  `;

  return {
    html,
    toggle,
    rToggle,
  }

}