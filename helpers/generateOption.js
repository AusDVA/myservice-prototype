module.exports = (option) => {
  if (typeof option === "object") {
    let {disabled, hidden, selected, modifiers, text, toggle, value} = option;
  } else {
    let text = option;
  }

  if (!text) return "Must specify the option text"

  if (!value) value = replaceNonAlphanumeric(value);

  if (toggle && modifiers.includes("toggleRev")) {
    toggleStr = `data-r-toggle="${toggle}"`;
  } else if (toggle && !modifiers.includes("toggleRev")) {
    toggleStr = `data-toggle="${toggle}"`;
  }

  let html = `
    <option value="${value}"
      ${disabled ? "disabled" : "" } 
      ${selected ? "selected" : "" } 
      ${hidden ? "hidden" : "" } 
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
