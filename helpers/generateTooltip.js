module.exports = tooltip => {

	let { screenreaderText, content, id, modifiers } = tooltip;

	// if (!screenreaderText || !content || !id) return "All fields mandatory";

	return `
    <div class="tooltip">
      <button id="${id}__label" class="tooltip__control" aria-describedby="${id}__message" aria-expanded="false">
        <div class="tooltip__label ${modifiers && modifiers.includes("tooltipShowText") ? "" : "tooltip__label--icon-only"}">
          ${screenreaderText}
        </div>
        <div class="tooltip__tab"></div>
      </button>
      <div id="${id}__message" class="tooltip__content" aria-labelledby="${id}__label" aria-hidden="true" role="tooltip" tabindex="-1" >
        <div class="tooltip__message">
          ${content}
        </div>
        <button class="tooltip__close">Close</button>
      </div>
    </div>
  `;
}