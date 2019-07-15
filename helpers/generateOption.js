const replaceNonAlphanumeric = require('../helpers/replaceNonAlphanumeric');

module.exports = (option) => {
  let { modifiers, 
        text, 
        toggle, 
        value
       } = option;

  if (!value) value = replaceNonAlphanumeric(text);

  if (toggle && modifiers && modifiers.includes("toggleRev")) {
    toggleStr = `data-r-toggle="${toggle}"`;
  } else if (toggle && (!modifiers || modifiers) && !modifiers.includes("toggleRev")) {
    toggleStr = `data-toggle="${toggle}"`;
  }

  let html = `
    <option value="${value}"
      ${modifiers && modifiers.includes("disabled") ? "disabled" : "" } 
      ${modifiers && modifiers.includes("selected") ? "selected" : "" } 
      ${modifiers && modifiers.includes("hidden") ? "hidden" : "" } 
      ${toggle ? toggleStr : "" }>
        ${text}
    </option>`;

  if (toggle) {
    if (modifiers.includes("toggleRev")) {
      return {
        "rToggle": toggle,
        html
      }
    } else {
      return {
        toggle,
        html
      }
    }
  } else {
    return {
      html
    }
  }
}
