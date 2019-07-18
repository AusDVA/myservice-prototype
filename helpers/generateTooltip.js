module.exports = tooltip => {

	let { screenreaderText, content, id, modifiers } = tooltip;

	if (!screenreaderText || !content || !id) return "All fields mandatory";

	let tooltipHtml = `
	<div class="tooltip">
		<div id="${id}__label" aria-controls="${id}__message" class="tooltip__control" tabindex="0" role="button" aria-expanded="false">
      <div class="tooltip__label ${modifiers && modifiers.includes("tooltipIconOnly") ? "tooltip__label--icon-only" : ""}">
        <a>${screenreaderText}</a>
      </div>
      <div class="tooltip__tab"></div>
    </div>
  <div id="${id}__message" class="tooltip__content" aria-labelledby="${id}__label" role="region" tabindex="-1" aria-hidden="true">
    <div class="tooltip__message">${content}
      <div class="tooltip__close" role="button" tabindex="0">Close</div>
    }
    </div>
  </div>
	</div>`;

  return tooltipHtml
}