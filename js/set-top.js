(function () {
  var table = document.getElementsByClassName("table")[0];
  const H = table.getAttribute("h-template");
  var h = table.offsetTop + table.offsetHeight;
  var arr = [];

  function getnextsibling(el) {
    if (el.nextElementSibling !== null) {
      arr.push(el.nextElementSibling);
      getnextsibling(el.nextElementSibling);
    }
  }

  getnextsibling(table);
  console.log(arr);
  arr.forEach(function (v, i) {
    v.style.top = v.offsetTop - H + h + "px";
  })
})();