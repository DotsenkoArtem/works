(function () {
  (function c(d, w, m, i) {
    window.supportAPIMethod = m;
    var s = d.createElement("script");
    s.id = "supportScript";
    var id = "fd6922be76d7493856221a79d1a41ce5";
    s.src =
      (!i
        ? "https://admin.verbox.ru/support/support.js"
        : "https://static.site-chat.me/support/support.int.js") +
      "?h=" +
      id;
    s.onerror = i
      ? undefined
      : function () {
          c(d, w, m, true);
        };
    w[m] = w[m]
      ? w[m]
      : function () {
          (w[m].q = w[m].q ? w[m].q : []).push(arguments);
        };
    (d.head ? d.head : d.body).appendChild(s);
  })(document, window, "Verbox");
})();
