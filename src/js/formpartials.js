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
  console.log($(this))
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