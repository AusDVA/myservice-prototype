const generateTooltip = require('./generateTooltip');

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
        suppliedID,
        tooltip
       } = box;

  let generatedID = suppliedID ? boxID : `${baseID}-${boxID}`;

  if (tooltip) {
    tooltip = generateTooltip({
      content: tooltip.content,
      screenreaderText: tooltip.screenreaderText,
      id: generatedID,
      modifiers
    })
  }

  let html = `
    <div class="uiToolKitCheckBox">
      <label class="uikit-control-input">
        <input 
          type="${type}" 
          class="uikit-control-input__input" 
          id="${generatedID}" 
          name="${baseID}"
          ${toggle ? `data-toggle="${toggle}"` : ""}
          ${rToggle ? `data-r-toggle="${rToggle}"` : ""}
          ${inject ? `data-inject="${inject}"` : ""}
          ${inject && modifiers.includes("noInjectIndent") ? `data-inject-indent="false"` : ""}
          ${modifiers.includes("disabled") ? "disabled" : ""}
          ${modifiers.includes("hidden") ? "hidden" : ""}
          ${modifiers.includes("checked") ? "checked" : ""}
        >
        <span 
          class="uikit-control-input__text">
            ${text} ${tooltip && !(modifiers.includes("tooltipOnHint")) ? tooltip : ""}
            ${hint && modifiers.includes("hintAfterTick") ? `<div class="hidden-hint" hidden>` : ""}
            ${hint ? `${modifiers.includes("hintNewLine") ? "<br>" : ""} <span class="hint">${hint}</span>` : ""}
            ${tooltip && modifiers.includes("tooltipOnHint") ? tooltip : ""}
            ${hint && modifiers.includes("hintAfterTick") ? `</div>` : ""}
          </span>
      </label>
    </div>
  `;

  var hintAfterTick = modifiers.includes("hintAfterTick") ? true : false;
  var tooltipOnHint = modifiers.includes("tooltipOnHint") ? true : false;

  return {
    html,
    hintAfterTick,
    toggle,
    rToggle,
    inject,
    tooltip,
    tooltipOnHint
  }

}