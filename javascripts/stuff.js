// Generated by CoffeeScript 1.4.0
console.log("Letsa go.")
jQuery(function() {
  $(window).resize();
  $.each($("pre"), function(index, code) {
    return new CodeMirror(function(node) {
      if (code instanceof jQuery) {
        code = code.get(0);
      }
      return code.parentNode.replaceChild(node, code);
    }, {
      value: $.trim(code.textContent.split("||")[1]),
      readOnly: true,
      mode: $.trim(code.textContent.split("||")[0]),
      theme: "monokai",
      lineNumbers: $.trim(code.textContent.split("||")[1]).match("\\n"),
      matchBrackets: true
    });
  });
  $.each($("a[id]"), function(index, ele) {
    return $(ele).click(function(e) {
      e.stopImmediatePropagation();
      return _gaq.push(["_trackEvent", "Links", "Clicked on " + e.target.id]);
    });
  });
  return $.each($("[data-time]"), function(index, ele) {
    return $(ele).html(prettyDate(new Date($(this).data("time"))));
  });
});
