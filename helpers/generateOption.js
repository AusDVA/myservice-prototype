const replaceNonAlphanumeric = require('../helpers/replaceNonAlphanumeric');

module.exports = (option) => {
  let { modifiers, 
        text, 
        toggle, 
        value
       } = option;

  if (!value) value = replaceNonAlphanumeric(text);

  let html = `
    <option value="${value}"
      ${modifiers && modifiers.includes("disabled") ? "disabled" : "" } 
      ${modifiers && modifiers.includes("selected") ? "selected" : "" } 
      ${modifiers && modifiers.includes("hidden") ? "hidden" : "" } 
      ${toggle ? `data-toggle="${toggle}"` : "" }>
      ${toggle ? `data-r-toggle="${rToggle}"` : "" }>
        ${text}
    </option>`;

  return {
    toggle,
    rToggle,
    html
  }

}
