const generateTooltip = require('./generateTooltip');

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
  let legendLabel = typeof modifiers !== "undefined" && modifiers.includes("legendLabel") ? true : false;

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

  let hintNewLine = typeof modifiers !== "undefined" && modifiers.includes("hintNewLine") ? true : false;

  if (hint !== null) html += `${hintNewLine ? "<br>" : ""}<span class="hint display-block margin-above--none margin-below--none"> ${hint}</span>`;

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
