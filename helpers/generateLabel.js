const generateTooltip = require('./generateTooltip');
if (typeof modifiers === "undefined") var modifiers = []; 
if (typeof modifiers === "string") modifiers = [modifiers]; 

module.exports = formLabel => {
  var {
    id,
    modifiers,
    label,
    tooltip,
    hint
  } = formLabel;

  var html = "";

  let legend = modifiers.includes("legend") ? true : false;
  let legendLabel = modifiers.includes("legendLabel") ? true : false;

  if (legend || legendLabel) {
    html += `
      <legend class="uikit-text-input__label ${label === "" ? "hidden" : ""} ${legendLabel ? "legend-override" : ""}">
    `
  } else {
    html += `
      <label for="${id}" class="uikit-text-input__label">
    `
  }

  html += label !== null ? label : "";


  if (tooltip !== null && (!(modifiers.includes("tooltipOnHint")))) {
    html += generateTooltip({
      content: tooltip.content,
      screenreaderText: tooltip.screenreaderText,
      modifiers,
      id
    })
  }

  if (hint) {
    html += `<span class="hint`;

    if (modifiers.includes("hintNewline")) html += " display-block margin-above--none margin-below--none";

    html += `"> ${hint} </span>`
  }

  if (tooltip !== null && (modifiers.includes("tooltipOnHint"))) {
    html += generateTooltip({
      content: tooltip.content,
      screenreaderText: tooltip.screenreaderText,
      modifiers,
      id
    })
  }

  if (legend || legendLabel) {
    html += "</legend>";
  } else {
    html += "</label>";
  }

  return html;
}
