// button radio

$("body .formPartials_buttonRadio").change("input[type=radio]", function() {
  $($(this).data("all-toggle")).show();

  $("input[type=radio]:checked", this).each(function() {
    $($(this).data("toggle")).removeAttr("hidden").show();
    $($(this).data("r-toggle")).hide();
  });

  $("input[type=radio]:not(:checked)", this).each(function() {
    $($(this).data("toggle")).hide();
    $($(this).data("r-toggle")).show();
  });
})

// checkbox / radio
$("body .formPartials_checkRadio").change("input", function() {
  $($(this).data("all-toggle")).show();

  $("input:checked", this).each(function() {
    $($(this).data("toggle")).removeAttr("hidden").show();
    $($(this).data("r-toggle")).hide();
    $(this).closest("fieldset").find($(this).data("inject")).remove();
    $($(this).data("inject")).clone().insertAfter($(this).closest(".uiToolKitCheckBox"));
    if ($(this).data("inject-indent") !== false) {
      $($(this).data("inject")).addClass("injected");
    }
    $($(this).data("inject")).addClass("injected-elem");
    $(".injected-elem").change("input, select", function(e) {
      e.stopPropagation();
    })
    $(this).parent().find(".hidden-hint").show();
    $(this).closest("fieldset").find($($(this).data("inject"))).show();
  });

  $("input:not(:checked)", this).each(function() {
    $($(this).data("toggle")).hide();
    $($(this).data("r-toggle")).show();
    $(this).closest("fieldset").find($(this).data("inject")).remove();
    $(this).parent().find(".hidden-hint").hide();
  });


})

$("body .formPartials_checkRadio").on("click", ".tooltip", function(e) {
  e.preventDefault();
});

// checkbox / radio with icon
$("body .formPartials_checkRadioIcon").change("input", function() {
  $($(this).data("all-toggle")).show();

  $("input:checked", this).each(function() {
    $($(this).data("toggle")).removeAttr("hidden").show();
    $($(this).data("r-toggle")).hide();
    $(this).parent().find(".hidden-hint").show();
  });

  $("input:not(:checked)", this).each(function() {
    $($(this).data("toggle")).hide();
    $($(this).data("r-toggle")).show();
    $(this).parent().find(".hidden-hint").hide();
  });


})

$("body .formPartials_checkRadioIcon").on("click", ".tooltip", function(e) {
  e.preventDefault();
});

// date

$("body .formPartials_date").on("keyup", ".dd", function(e) {
  if ((e.which >= 49 && e.which <= 57) || (e.which >= 96 && e.which <= 105) || e.which === 46 || e.which === 8) {
    if ($(this).val().length === 2) {
      $(this).parent().find(".mm").focus();
    }
  }
})

$("body .formPartials_date").on("keyup", ".mm", function(e) {
  if ((e.which >= 49 && e.which <= 57) || (e.which >= 96 && e.which <= 105) || e.which === 46 || e.which === 8) {
    if ($(this).parent().has(".dd")) { 
      if ($(this).val().length === 0) {
        $(this).parent().find(".dd").focus();
      }
    }
    if ($(this).val().length === 2) {
      $(this).parent().find(".yyyy").focus();
    }
  }
})

$("body .formPartials_date").on("keyup", ".yyyy",function(e) {
  if ((e.which >= 49 && e.which <= 57) || (e.which >= 96 && e.which <= 105) || e.which === 46 || e.which === 8) {
    if ($(this).val().length === 0) {
      $(this).parent().find(".mm").focus();
    }
  }
})

$("body .formPartials_date").on("click", "input[type=checkbox]", function() {
  if ($(this).prop("checked")) {
    $(this).closest(".form-group").find(".dd").attr("disabled", "true");
    $(this).closest(".form-group").find(".dd").val("");
    $(this).closest(".form-group").find(".mm").attr("disabled", "true");
    $(this).closest(".form-group").find(".mm").val("");
    $(this).closest(".form-group").find(".yyyy").attr("disabled", "true");
    $(this).closest(".form-group").find(".yyyy").val("");
  } else {
    $(this).closest(".form-group").find(".dd").removeAttr("disabled");
    $(this).closest(".form-group").find(".mm").removeAttr("disabled");
    $(this).closest(".form-group").find(".yyyy").removeAttr("disabled");
  }
})

// dropdown
$("body .formPartials_dropdown").change("select", function () {

  $("option:selected", this).each(function () {
    $($(this).data("toggle")).show();
    $($(this).data("r-toggle")).hide();
  });

  $("option:not(:selected)", this).each(function () {
    $($(this).data("toggle")).hide();
    $($(this).data("r-toggle")).show();
  });
})

// leave dates

$(document).ready(function() {
  $("#multi-date__template").clone().removeAttr("id").removeAttr("style").insertBefore(".formPartials_leavedates .multi-date__button--add");
})

$("body .formPartials_leavedates").on("click", ".multi-date__checkbox", function() {
  if ($(this).prop("checked")) {
    $(this).closest(".multi-date__row").find(".dd").attr("disabled", "true");
    $(this).closest(".multi-date__row").find(".dd").val("");
    $(this).closest(".multi-date__row").find(".mm").attr("disabled", "true");
    $(this).closest(".multi-date__row").find(".mm").val("");
    $(this).closest(".multi-date__row").find(".yyyy").attr("disabled", "true");
    $(this).closest(".multi-date__row").find(".yyyy").val("");
  } else {
    $(this).closest(".multi-date__row").find(".dd").removeAttr("disabled");
    $(this).closest(".multi-date__row").find(".mm").removeAttr("disabled");
    $(this).closest(".multi-date__row").find(".yyyy").removeAttr("disabled");
  }
});

$("body .formPartials_leavedates").on("click", ".multi-date__button--add", function() {
  $("#multi-date__template").clone().removeAttr("id").removeAttr("style").insertBefore($(this));
  $(this).closest(".multi-date__container").find(".multi-date").last().find(".multi-date__input").val("");
  $(this).closest(".multi-date__container").find(".multi-date").last().find(".multi-date__input").removeAttr("disabled");

  $(".formPartials_leavedates .multi-date", this).each(function(i) {
    $(this).removeClass("multi-date--static");
    $(this).find("input").removeAttr("disabled")
    if (i < ($(".formPartials_leavedates .multi-date").length) - 1) {
      $(this).addClass("multi-date--static")
      $(this).find("input").attr("disabled", "true")
    }

  })
})

$("body .formPartials_leavedates").on("click", ".multi-date__button--remove", function() {
  if ($(this).closest(".multi-date").find(".multi-date__checkbox").prop("checked")) {
    checkbox.insertBefore($(".multi-date__container").find(".multi-date").last().find(".multi-date--end").find(".multi-date__button"));
  }
  $(this).closest(".multi-date").remove();
});

// legacy upload
$("body .formPartials_legacyUpload").on("click", ".btnFileUpload", function() {
  $(this).closest(".mys-file-uploads__item-border").find(".mys-file-uploads__status").addClass("mys-file-uploads__status--active").removeClass("mys-file-uploads__status--pending");
  $(this).closest(".mys-file-uploads__item-border").find(".mys-file-uploads__status-sr").text("Active");

  $(this).parent().find(".fileUpload").trigger("click");

  checkFiles();
})

$("body .formPartials_legacyUpload").on("click", ".btnFileRemove", function() {
  $(this).closest(".mys-file-uploads__item").find(".uploadedFiles").html("");
  $(this).closest(".mys-file-uploads__item-border").find(".mys-file-uploads__status-sr").text("Required");

  $(this).hide();
  $(this).parent().find(".btnFileUpload").show();
  $(this).closest(".mys-file-uploads__item-border").removeClass("mys-file-uploads__item-uploaded");
  $(this).closest(".mys-file-uploads__item-border").find(".mys-file-uploads__status").removeClass("mys-file-uploads__status--success").addClass("mys-file-uploads__status--pending");

  checkFiles();
})

$("body .formPartials_legacyUpload").on("change", ".fileUpload", function(e) {
  const file = e.target.files[0];

  $(this).closest(".mys-file-uploads__item-border").find(".uploadedFiles").append(`
          <div class="mys-file-uploads__info">
            <div class="mys-file-uploads__info-item">
              <label for="" class="mys-file-uploads__label">File name</label>
              <div class="mys-file-uploads__value">
                <a href="#">${file.name}</a>
              </div>
            </div>
          </div>`)

  $(this).closest(".mys-file-uploads__item-border").find("")

  $(this).closest(".mys-file-uploads__item-border").find(".mys-file-uploads__status").removeClass("mys-file-uploads__status--active").addClass("mys-file-uploads__status--success");
  $(this).closest(".mys-file-uploads__item-border").find(".mys-file-uploads__status-sr").text("Success");
  $(this).parent().find(".btnFileUpload").hide();
  $(this).parent().find(".btnFileRemove").show();
  $(this).closest(".mys-file-uploads__item-border").addClass("mys-file-uploads__item-uploaded");

  checkFiles();
})

function checkFiles() {
  $(".formPartials_legacyUpload .mys-file-uploads__item-border").each(function(index, elem) {
    if ($(this).find(".uploadedFiles").html().length > 0) {
      $(this).closest(".mys-file-uploads__item-border").find(".descAfterUpload").show();
      $(this).closest(".mys-file-uploads__item-border").find(".descBeforeUpload").hide();
    } else {
      $(this).closest(".mys-file-uploads__item-border").find(".descAfterUpload").hide();
      $(this).closest(".mys-file-uploads__item-border").find(".descBeforeUpload").show();
    }
  })
}

// previous names
$(document).ready(function() {
  $("#multi-name__template").clone().removeAttr("id").removeAttr("style").insertBefore(".formPartials_previousNames .multi-date__button--add");
})

$("body .formPartials_previousNames").on("click", ".multi-date__button--add", function() {
  $("#multi-name__template").clone().removeAttr("id").removeAttr("style").insertBefore($(this));
  $(this).closest(".multi-date__container").find(".multi-date").last().find(".multi-date__input").val("");
  $(this).closest(".multi-date__container").find(".multi-date").last().find(".multi-date__input").removeAttr("disabled");

  $(".formPartials_previousNames .multi-date").each(function(i) {
    $(this).removeClass("multi-date--static");
    $(this).find("input").removeAttr("disabled")
    if (i < ($(".formPartials_previousNames .multi-date").length) - 1) {
      $(this).addClass("multi-date--static")
      $(this).find("input").attr("disabled", "true")
    }
  })
})

$("body .formPartials_previousNames").on("click", ".multi-date__button--remove", function() {
  $(this).closest(".multi-date").remove();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmb3JtcGFydGlhbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gYnV0dG9uIHJhZGlvXG5cbiQoXCJib2R5IC5mb3JtUGFydGlhbHNfYnV0dG9uUmFkaW9cIikuY2hhbmdlKFwiaW5wdXRbdHlwZT1yYWRpb11cIiwgZnVuY3Rpb24oKSB7XG4gICQoJCh0aGlzKS5kYXRhKFwiYWxsLXRvZ2dsZVwiKSkuc2hvdygpO1xuXG4gICQoXCJpbnB1dFt0eXBlPXJhZGlvXTpjaGVja2VkXCIsIHRoaXMpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgJCgkKHRoaXMpLmRhdGEoXCJ0b2dnbGVcIikpLnJlbW92ZUF0dHIoXCJoaWRkZW5cIikuc2hvdygpO1xuICAgICQoJCh0aGlzKS5kYXRhKFwici10b2dnbGVcIikpLmhpZGUoKTtcbiAgfSk7XG5cbiAgJChcImlucHV0W3R5cGU9cmFkaW9dOm5vdCg6Y2hlY2tlZClcIiwgdGhpcykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAkKCQodGhpcykuZGF0YShcInRvZ2dsZVwiKSkuaGlkZSgpO1xuICAgICQoJCh0aGlzKS5kYXRhKFwici10b2dnbGVcIikpLnNob3coKTtcbiAgfSk7XG59KVxuXG4vLyBjaGVja2JveCAvIHJhZGlvXG4kKFwiYm9keSAuZm9ybVBhcnRpYWxzX2NoZWNrUmFkaW9cIikuY2hhbmdlKFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICQoJCh0aGlzKS5kYXRhKFwiYWxsLXRvZ2dsZVwiKSkuc2hvdygpO1xuXG4gICQoXCJpbnB1dDpjaGVja2VkXCIsIHRoaXMpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgJCgkKHRoaXMpLmRhdGEoXCJ0b2dnbGVcIikpLnJlbW92ZUF0dHIoXCJoaWRkZW5cIikuc2hvdygpO1xuICAgICQoJCh0aGlzKS5kYXRhKFwici10b2dnbGVcIikpLmhpZGUoKTtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoXCJmaWVsZHNldFwiKS5maW5kKCQodGhpcykuZGF0YShcImluamVjdFwiKSkucmVtb3ZlKCk7XG4gICAgJCgkKHRoaXMpLmRhdGEoXCJpbmplY3RcIikpLmNsb25lKCkuaW5zZXJ0QWZ0ZXIoJCh0aGlzKS5jbG9zZXN0KFwiLnVpVG9vbEtpdENoZWNrQm94XCIpKTtcbiAgICBpZiAoJCh0aGlzKS5kYXRhKFwiaW5qZWN0LWluZGVudFwiKSAhPT0gZmFsc2UpIHtcbiAgICAgICQoJCh0aGlzKS5kYXRhKFwiaW5qZWN0XCIpKS5hZGRDbGFzcyhcImluamVjdGVkXCIpO1xuICAgIH1cbiAgICAkKCQodGhpcykuZGF0YShcImluamVjdFwiKSkuYWRkQ2xhc3MoXCJpbmplY3RlZC1lbGVtXCIpO1xuICAgICQoXCIuaW5qZWN0ZWQtZWxlbVwiKS5jaGFuZ2UoXCJpbnB1dCwgc2VsZWN0XCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSlcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuaGlkZGVuLWhpbnRcIikuc2hvdygpO1xuICAgICQodGhpcykuY2xvc2VzdChcImZpZWxkc2V0XCIpLmZpbmQoJCgkKHRoaXMpLmRhdGEoXCJpbmplY3RcIikpKS5zaG93KCk7XG4gIH0pO1xuXG4gICQoXCJpbnB1dDpub3QoOmNoZWNrZWQpXCIsIHRoaXMpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgJCgkKHRoaXMpLmRhdGEoXCJ0b2dnbGVcIikpLmhpZGUoKTtcbiAgICAkKCQodGhpcykuZGF0YShcInItdG9nZ2xlXCIpKS5zaG93KCk7XG4gICAgJCh0aGlzKS5jbG9zZXN0KFwiZmllbGRzZXRcIikuZmluZCgkKHRoaXMpLmRhdGEoXCJpbmplY3RcIikpLnJlbW92ZSgpO1xuICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5oaWRkZW4taGludFwiKS5oaWRlKCk7XG4gIH0pO1xuXG5cbn0pXG5cbiQoXCJib2R5IC5mb3JtUGFydGlhbHNfY2hlY2tSYWRpb1wiKS5vbihcImNsaWNrXCIsIFwiLnRvb2x0aXBcIiwgZnVuY3Rpb24oZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuLy8gY2hlY2tib3ggLyByYWRpbyB3aXRoIGljb25cbiQoXCJib2R5IC5mb3JtUGFydGlhbHNfY2hlY2tSYWRpb0ljb25cIikuY2hhbmdlKFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICQoJCh0aGlzKS5kYXRhKFwiYWxsLXRvZ2dsZVwiKSkuc2hvdygpO1xuXG4gICQoXCJpbnB1dDpjaGVja2VkXCIsIHRoaXMpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgJCgkKHRoaXMpLmRhdGEoXCJ0b2dnbGVcIikpLnJlbW92ZUF0dHIoXCJoaWRkZW5cIikuc2hvdygpO1xuICAgICQoJCh0aGlzKS5kYXRhKFwici10b2dnbGVcIikpLmhpZGUoKTtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuaGlkZGVuLWhpbnRcIikuc2hvdygpO1xuICB9KTtcblxuICAkKFwiaW5wdXQ6bm90KDpjaGVja2VkKVwiLCB0aGlzKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICQoJCh0aGlzKS5kYXRhKFwidG9nZ2xlXCIpKS5oaWRlKCk7XG4gICAgJCgkKHRoaXMpLmRhdGEoXCJyLXRvZ2dsZVwiKSkuc2hvdygpO1xuICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5oaWRkZW4taGludFwiKS5oaWRlKCk7XG4gIH0pO1xuXG5cbn0pXG5cbiQoXCJib2R5IC5mb3JtUGFydGlhbHNfY2hlY2tSYWRpb0ljb25cIikub24oXCJjbGlja1wiLCBcIi50b29sdGlwXCIsIGZ1bmN0aW9uKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbi8vIGRhdGVcblxuJChcImJvZHkgLmZvcm1QYXJ0aWFsc19kYXRlXCIpLm9uKFwia2V5dXBcIiwgXCIuZGRcIiwgZnVuY3Rpb24oZSkge1xuICBpZiAoKGUud2hpY2ggPj0gNDkgJiYgZS53aGljaCA8PSA1NykgfHwgKGUud2hpY2ggPj0gOTYgJiYgZS53aGljaCA8PSAxMDUpIHx8IGUud2hpY2ggPT09IDQ2IHx8IGUud2hpY2ggPT09IDgpIHtcbiAgICBpZiAoJCh0aGlzKS52YWwoKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5tbVwiKS5mb2N1cygpO1xuICAgIH1cbiAgfVxufSlcblxuJChcImJvZHkgLmZvcm1QYXJ0aWFsc19kYXRlXCIpLm9uKFwia2V5dXBcIiwgXCIubW1cIiwgZnVuY3Rpb24oZSkge1xuICBpZiAoKGUud2hpY2ggPj0gNDkgJiYgZS53aGljaCA8PSA1NykgfHwgKGUud2hpY2ggPj0gOTYgJiYgZS53aGljaCA8PSAxMDUpIHx8IGUud2hpY2ggPT09IDQ2IHx8IGUud2hpY2ggPT09IDgpIHtcbiAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5oYXMoXCIuZGRcIikpIHsgXG4gICAgICBpZiAoJCh0aGlzKS52YWwoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLmRkXCIpLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgkKHRoaXMpLnZhbCgpLmxlbmd0aCA9PT0gMikge1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLnl5eXlcIikuZm9jdXMoKTtcbiAgICB9XG4gIH1cbn0pXG5cbiQoXCJib2R5IC5mb3JtUGFydGlhbHNfZGF0ZVwiKS5vbihcImtleXVwXCIsIFwiLnl5eXlcIixmdW5jdGlvbihlKSB7XG4gIGlmICgoZS53aGljaCA+PSA0OSAmJiBlLndoaWNoIDw9IDU3KSB8fCAoZS53aGljaCA+PSA5NiAmJiBlLndoaWNoIDw9IDEwNSkgfHwgZS53aGljaCA9PT0gNDYgfHwgZS53aGljaCA9PT0gOCkge1xuICAgIGlmICgkKHRoaXMpLnZhbCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLm1tXCIpLmZvY3VzKCk7XG4gICAgfVxuICB9XG59KVxuXG4kKFwiYm9keSAuZm9ybVBhcnRpYWxzX2RhdGVcIikub24oXCJjbGlja1wiLCBcImlucHV0W3R5cGU9Y2hlY2tib3hdXCIsIGZ1bmN0aW9uKCkge1xuICBpZiAoJCh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiKSkge1xuICAgICQodGhpcykuY2xvc2VzdChcIi5mb3JtLWdyb3VwXCIpLmZpbmQoXCIuZGRcIikuYXR0cihcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoXCIuZm9ybS1ncm91cFwiKS5maW5kKFwiLmRkXCIpLnZhbChcIlwiKTtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoXCIuZm9ybS1ncm91cFwiKS5maW5kKFwiLm1tXCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgJCh0aGlzKS5jbG9zZXN0KFwiLmZvcm0tZ3JvdXBcIikuZmluZChcIi5tbVwiKS52YWwoXCJcIik7XG4gICAgJCh0aGlzKS5jbG9zZXN0KFwiLmZvcm0tZ3JvdXBcIikuZmluZChcIi55eXl5XCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgJCh0aGlzKS5jbG9zZXN0KFwiLmZvcm0tZ3JvdXBcIikuZmluZChcIi55eXl5XCIpLnZhbChcIlwiKTtcbiAgfSBlbHNlIHtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoXCIuZm9ybS1ncm91cFwiKS5maW5kKFwiLmRkXCIpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoXCIuZm9ybS1ncm91cFwiKS5maW5kKFwiLm1tXCIpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoXCIuZm9ybS1ncm91cFwiKS5maW5kKFwiLnl5eXlcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICB9XG59KVxuXG4vLyBkcm9wZG93blxuJChcImJvZHkgLmZvcm1QYXJ0aWFsc19kcm9wZG93blwiKS5jaGFuZ2UoXCJzZWxlY3RcIiwgZnVuY3Rpb24gKCkge1xuXG4gICQoXCJvcHRpb246c2VsZWN0ZWRcIiwgdGhpcykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgJCgkKHRoaXMpLmRhdGEoXCJ0b2dnbGVcIikpLnNob3coKTtcbiAgICAkKCQodGhpcykuZGF0YShcInItdG9nZ2xlXCIpKS5oaWRlKCk7XG4gIH0pO1xuXG4gICQoXCJvcHRpb246bm90KDpzZWxlY3RlZClcIiwgdGhpcykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgJCgkKHRoaXMpLmRhdGEoXCJ0b2dnbGVcIikpLmhpZGUoKTtcbiAgICAkKCQodGhpcykuZGF0YShcInItdG9nZ2xlXCIpKS5zaG93KCk7XG4gIH0pO1xufSlcblxuLy8gbGVhdmUgZGF0ZXNcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICQoXCIjbXVsdGktZGF0ZV9fdGVtcGxhdGVcIikuY2xvbmUoKS5yZW1vdmVBdHRyKFwiaWRcIikucmVtb3ZlQXR0cihcInN0eWxlXCIpLmluc2VydEJlZm9yZShcIi5mb3JtUGFydGlhbHNfbGVhdmVkYXRlcyAubXVsdGktZGF0ZV9fYnV0dG9uLS1hZGRcIik7XG59KVxuXG4kKFwiYm9keSAuZm9ybVBhcnRpYWxzX2xlYXZlZGF0ZXNcIikub24oXCJjbGlja1wiLCBcIi5tdWx0aS1kYXRlX19jaGVja2JveFwiLCBmdW5jdGlvbigpIHtcbiAgaWYgKCQodGhpcykucHJvcChcImNoZWNrZWRcIikpIHtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoXCIubXVsdGktZGF0ZV9fcm93XCIpLmZpbmQoXCIuZGRcIikuYXR0cihcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoXCIubXVsdGktZGF0ZV9fcm93XCIpLmZpbmQoXCIuZGRcIikudmFsKFwiXCIpO1xuICAgICQodGhpcykuY2xvc2VzdChcIi5tdWx0aS1kYXRlX19yb3dcIikuZmluZChcIi5tbVwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgICQodGhpcykuY2xvc2VzdChcIi5tdWx0aS1kYXRlX19yb3dcIikuZmluZChcIi5tbVwiKS52YWwoXCJcIik7XG4gICAgJCh0aGlzKS5jbG9zZXN0KFwiLm11bHRpLWRhdGVfX3Jvd1wiKS5maW5kKFwiLnl5eXlcIikuYXR0cihcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoXCIubXVsdGktZGF0ZV9fcm93XCIpLmZpbmQoXCIueXl5eVwiKS52YWwoXCJcIik7XG4gIH0gZWxzZSB7XG4gICAgJCh0aGlzKS5jbG9zZXN0KFwiLm11bHRpLWRhdGVfX3Jvd1wiKS5maW5kKFwiLmRkXCIpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoXCIubXVsdGktZGF0ZV9fcm93XCIpLmZpbmQoXCIubW1cIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAgICQodGhpcykuY2xvc2VzdChcIi5tdWx0aS1kYXRlX19yb3dcIikuZmluZChcIi55eXl5XCIpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgfVxufSk7XG5cbiQoXCJib2R5IC5mb3JtUGFydGlhbHNfbGVhdmVkYXRlc1wiKS5vbihcImNsaWNrXCIsIFwiLm11bHRpLWRhdGVfX2J1dHRvbi0tYWRkXCIsIGZ1bmN0aW9uKCkge1xuICAkKFwiI211bHRpLWRhdGVfX3RlbXBsYXRlXCIpLmNsb25lKCkucmVtb3ZlQXR0cihcImlkXCIpLnJlbW92ZUF0dHIoXCJzdHlsZVwiKS5pbnNlcnRCZWZvcmUoJCh0aGlzKSk7XG4gICQodGhpcykuY2xvc2VzdChcIi5tdWx0aS1kYXRlX19jb250YWluZXJcIikuZmluZChcIi5tdWx0aS1kYXRlXCIpLmxhc3QoKS5maW5kKFwiLm11bHRpLWRhdGVfX2lucHV0XCIpLnZhbChcIlwiKTtcbiAgJCh0aGlzKS5jbG9zZXN0KFwiLm11bHRpLWRhdGVfX2NvbnRhaW5lclwiKS5maW5kKFwiLm11bHRpLWRhdGVcIikubGFzdCgpLmZpbmQoXCIubXVsdGktZGF0ZV9faW5wdXRcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuXG4gICQoXCIuZm9ybVBhcnRpYWxzX2xlYXZlZGF0ZXMgLm11bHRpLWRhdGVcIiwgdGhpcykuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcIm11bHRpLWRhdGUtLXN0YXRpY1wiKTtcbiAgICAkKHRoaXMpLmZpbmQoXCJpbnB1dFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIilcbiAgICBpZiAoaSA8ICgkKFwiLmZvcm1QYXJ0aWFsc19sZWF2ZWRhdGVzIC5tdWx0aS1kYXRlXCIpLmxlbmd0aCkgLSAxKSB7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKFwibXVsdGktZGF0ZS0tc3RhdGljXCIpXG4gICAgICAkKHRoaXMpLmZpbmQoXCJpbnB1dFwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpXG4gICAgfVxuXG4gIH0pXG59KVxuXG4kKFwiYm9keSAuZm9ybVBhcnRpYWxzX2xlYXZlZGF0ZXNcIikub24oXCJjbGlja1wiLCBcIi5tdWx0aS1kYXRlX19idXR0b24tLXJlbW92ZVwiLCBmdW5jdGlvbigpIHtcbiAgaWYgKCQodGhpcykuY2xvc2VzdChcIi5tdWx0aS1kYXRlXCIpLmZpbmQoXCIubXVsdGktZGF0ZV9fY2hlY2tib3hcIikucHJvcChcImNoZWNrZWRcIikpIHtcbiAgICBjaGVja2JveC5pbnNlcnRCZWZvcmUoJChcIi5tdWx0aS1kYXRlX19jb250YWluZXJcIikuZmluZChcIi5tdWx0aS1kYXRlXCIpLmxhc3QoKS5maW5kKFwiLm11bHRpLWRhdGUtLWVuZFwiKS5maW5kKFwiLm11bHRpLWRhdGVfX2J1dHRvblwiKSk7XG4gIH1cbiAgJCh0aGlzKS5jbG9zZXN0KFwiLm11bHRpLWRhdGVcIikucmVtb3ZlKCk7XG59KTtcblxuLy8gbGVnYWN5IHVwbG9hZFxuJChcImJvZHkgLmZvcm1QYXJ0aWFsc19sZWdhY3lVcGxvYWRcIikub24oXCJjbGlja1wiLCBcIi5idG5GaWxlVXBsb2FkXCIsIGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLmNsb3Nlc3QoXCIubXlzLWZpbGUtdXBsb2Fkc19faXRlbS1ib3JkZXJcIikuZmluZChcIi5teXMtZmlsZS11cGxvYWRzX19zdGF0dXNcIikuYWRkQ2xhc3MoXCJteXMtZmlsZS11cGxvYWRzX19zdGF0dXMtLWFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcIm15cy1maWxlLXVwbG9hZHNfX3N0YXR1cy0tcGVuZGluZ1wiKTtcbiAgJCh0aGlzKS5jbG9zZXN0KFwiLm15cy1maWxlLXVwbG9hZHNfX2l0ZW0tYm9yZGVyXCIpLmZpbmQoXCIubXlzLWZpbGUtdXBsb2Fkc19fc3RhdHVzLXNyXCIpLnRleHQoXCJBY3RpdmVcIik7XG5cbiAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLmZpbGVVcGxvYWRcIikudHJpZ2dlcihcImNsaWNrXCIpO1xuXG4gIGNoZWNrRmlsZXMoKTtcbn0pXG5cbiQoXCJib2R5IC5mb3JtUGFydGlhbHNfbGVnYWN5VXBsb2FkXCIpLm9uKFwiY2xpY2tcIiwgXCIuYnRuRmlsZVJlbW92ZVwiLCBmdW5jdGlvbigpIHtcbiAgJCh0aGlzKS5jbG9zZXN0KFwiLm15cy1maWxlLXVwbG9hZHNfX2l0ZW1cIikuZmluZChcIi51cGxvYWRlZEZpbGVzXCIpLmh0bWwoXCJcIik7XG4gICQodGhpcykuY2xvc2VzdChcIi5teXMtZmlsZS11cGxvYWRzX19pdGVtLWJvcmRlclwiKS5maW5kKFwiLm15cy1maWxlLXVwbG9hZHNfX3N0YXR1cy1zclwiKS50ZXh0KFwiUmVxdWlyZWRcIik7XG5cbiAgJCh0aGlzKS5oaWRlKCk7XG4gICQodGhpcykucGFyZW50KCkuZmluZChcIi5idG5GaWxlVXBsb2FkXCIpLnNob3coKTtcbiAgJCh0aGlzKS5jbG9zZXN0KFwiLm15cy1maWxlLXVwbG9hZHNfX2l0ZW0tYm9yZGVyXCIpLnJlbW92ZUNsYXNzKFwibXlzLWZpbGUtdXBsb2Fkc19faXRlbS11cGxvYWRlZFwiKTtcbiAgJCh0aGlzKS5jbG9zZXN0KFwiLm15cy1maWxlLXVwbG9hZHNfX2l0ZW0tYm9yZGVyXCIpLmZpbmQoXCIubXlzLWZpbGUtdXBsb2Fkc19fc3RhdHVzXCIpLnJlbW92ZUNsYXNzKFwibXlzLWZpbGUtdXBsb2Fkc19fc3RhdHVzLS1zdWNjZXNzXCIpLmFkZENsYXNzKFwibXlzLWZpbGUtdXBsb2Fkc19fc3RhdHVzLS1wZW5kaW5nXCIpO1xuXG4gIGNoZWNrRmlsZXMoKTtcbn0pXG5cbiQoXCJib2R5IC5mb3JtUGFydGlhbHNfbGVnYWN5VXBsb2FkXCIpLm9uKFwiY2hhbmdlXCIsIFwiLmZpbGVVcGxvYWRcIiwgZnVuY3Rpb24oZSkge1xuICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF07XG5cbiAgJCh0aGlzKS5jbG9zZXN0KFwiLm15cy1maWxlLXVwbG9hZHNfX2l0ZW0tYm9yZGVyXCIpLmZpbmQoXCIudXBsb2FkZWRGaWxlc1wiKS5hcHBlbmQoYFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJteXMtZmlsZS11cGxvYWRzX19pbmZvXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXlzLWZpbGUtdXBsb2Fkc19faW5mby1pdGVtXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJcIiBjbGFzcz1cIm15cy1maWxlLXVwbG9hZHNfX2xhYmVsXCI+RmlsZSBuYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm15cy1maWxlLXVwbG9hZHNfX3ZhbHVlXCI+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj4ke2ZpbGUubmFtZX08L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+YClcblxuICAkKHRoaXMpLmNsb3Nlc3QoXCIubXlzLWZpbGUtdXBsb2Fkc19faXRlbS1ib3JkZXJcIikuZmluZChcIlwiKVxuXG4gICQodGhpcykuY2xvc2VzdChcIi5teXMtZmlsZS11cGxvYWRzX19pdGVtLWJvcmRlclwiKS5maW5kKFwiLm15cy1maWxlLXVwbG9hZHNfX3N0YXR1c1wiKS5yZW1vdmVDbGFzcyhcIm15cy1maWxlLXVwbG9hZHNfX3N0YXR1cy0tYWN0aXZlXCIpLmFkZENsYXNzKFwibXlzLWZpbGUtdXBsb2Fkc19fc3RhdHVzLS1zdWNjZXNzXCIpO1xuICAkKHRoaXMpLmNsb3Nlc3QoXCIubXlzLWZpbGUtdXBsb2Fkc19faXRlbS1ib3JkZXJcIikuZmluZChcIi5teXMtZmlsZS11cGxvYWRzX19zdGF0dXMtc3JcIikudGV4dChcIlN1Y2Nlc3NcIik7XG4gICQodGhpcykucGFyZW50KCkuZmluZChcIi5idG5GaWxlVXBsb2FkXCIpLmhpZGUoKTtcbiAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLmJ0bkZpbGVSZW1vdmVcIikuc2hvdygpO1xuICAkKHRoaXMpLmNsb3Nlc3QoXCIubXlzLWZpbGUtdXBsb2Fkc19faXRlbS1ib3JkZXJcIikuYWRkQ2xhc3MoXCJteXMtZmlsZS11cGxvYWRzX19pdGVtLXVwbG9hZGVkXCIpO1xuXG4gIGNoZWNrRmlsZXMoKTtcbn0pXG5cbmZ1bmN0aW9uIGNoZWNrRmlsZXMoKSB7XG4gICQoXCIuZm9ybVBhcnRpYWxzX2xlZ2FjeVVwbG9hZCAubXlzLWZpbGUtdXBsb2Fkc19faXRlbS1ib3JkZXJcIikuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbSkge1xuICAgIGlmICgkKHRoaXMpLmZpbmQoXCIudXBsb2FkZWRGaWxlc1wiKS5odG1sKCkubGVuZ3RoID4gMCkge1xuICAgICAgJCh0aGlzKS5jbG9zZXN0KFwiLm15cy1maWxlLXVwbG9hZHNfX2l0ZW0tYm9yZGVyXCIpLmZpbmQoXCIuZGVzY0FmdGVyVXBsb2FkXCIpLnNob3coKTtcbiAgICAgICQodGhpcykuY2xvc2VzdChcIi5teXMtZmlsZS11cGxvYWRzX19pdGVtLWJvcmRlclwiKS5maW5kKFwiLmRlc2NCZWZvcmVVcGxvYWRcIikuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoXCIubXlzLWZpbGUtdXBsb2Fkc19faXRlbS1ib3JkZXJcIikuZmluZChcIi5kZXNjQWZ0ZXJVcGxvYWRcIikuaGlkZSgpO1xuICAgICAgJCh0aGlzKS5jbG9zZXN0KFwiLm15cy1maWxlLXVwbG9hZHNfX2l0ZW0tYm9yZGVyXCIpLmZpbmQoXCIuZGVzY0JlZm9yZVVwbG9hZFwiKS5zaG93KCk7XG4gICAgfVxuICB9KVxufVxuXG4vLyBwcmV2aW91cyBuYW1lc1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICQoXCIjbXVsdGktbmFtZV9fdGVtcGxhdGVcIikuY2xvbmUoKS5yZW1vdmVBdHRyKFwiaWRcIikucmVtb3ZlQXR0cihcInN0eWxlXCIpLmluc2VydEJlZm9yZShcIi5mb3JtUGFydGlhbHNfcHJldmlvdXNOYW1lcyAubXVsdGktZGF0ZV9fYnV0dG9uLS1hZGRcIik7XG59KVxuXG4kKFwiYm9keSAuZm9ybVBhcnRpYWxzX3ByZXZpb3VzTmFtZXNcIikub24oXCJjbGlja1wiLCBcIi5tdWx0aS1kYXRlX19idXR0b24tLWFkZFwiLCBmdW5jdGlvbigpIHtcbiAgJChcIiNtdWx0aS1uYW1lX190ZW1wbGF0ZVwiKS5jbG9uZSgpLnJlbW92ZUF0dHIoXCJpZFwiKS5yZW1vdmVBdHRyKFwic3R5bGVcIikuaW5zZXJ0QmVmb3JlKCQodGhpcykpO1xuICAkKHRoaXMpLmNsb3Nlc3QoXCIubXVsdGktZGF0ZV9fY29udGFpbmVyXCIpLmZpbmQoXCIubXVsdGktZGF0ZVwiKS5sYXN0KCkuZmluZChcIi5tdWx0aS1kYXRlX19pbnB1dFwiKS52YWwoXCJcIik7XG4gICQodGhpcykuY2xvc2VzdChcIi5tdWx0aS1kYXRlX19jb250YWluZXJcIikuZmluZChcIi5tdWx0aS1kYXRlXCIpLmxhc3QoKS5maW5kKFwiLm11bHRpLWRhdGVfX2lucHV0XCIpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcblxuICAkKFwiLmZvcm1QYXJ0aWFsc19wcmV2aW91c05hbWVzIC5tdWx0aS1kYXRlXCIpLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJtdWx0aS1kYXRlLS1zdGF0aWNcIik7XG4gICAgJCh0aGlzKS5maW5kKFwiaW5wdXRcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpXG4gICAgaWYgKGkgPCAoJChcIi5mb3JtUGFydGlhbHNfcHJldmlvdXNOYW1lcyAubXVsdGktZGF0ZVwiKS5sZW5ndGgpIC0gMSkge1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcIm11bHRpLWRhdGUtLXN0YXRpY1wiKVxuICAgICAgJCh0aGlzKS5maW5kKFwiaW5wdXRcIikuYXR0cihcImRpc2FibGVkXCIsIFwidHJ1ZVwiKVxuICAgIH1cbiAgfSlcbn0pXG5cbiQoXCJib2R5IC5mb3JtUGFydGlhbHNfcHJldmlvdXNOYW1lc1wiKS5vbihcImNsaWNrXCIsIFwiLm11bHRpLWRhdGVfX2J1dHRvbi0tcmVtb3ZlXCIsIGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLmNsb3Nlc3QoXCIubXVsdGktZGF0ZVwiKS5yZW1vdmUoKTtcbn0pOyJdLCJmaWxlIjoiZm9ybXBhcnRpYWxzLmpzIn0=
