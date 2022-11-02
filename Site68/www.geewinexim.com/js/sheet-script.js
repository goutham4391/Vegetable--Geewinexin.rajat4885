let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.responseText).feed.entry;

    let i;
    for (i = 0; i < data.length; i++) {
      let producttitle = data[i]["gsx$_cn6ca"]["$t"];
      let category = data[i]["gsx$_cokwr"]["$t"];
      let sku = data[i]["gsx$_cpzh4"]["$t"];
      let price = data[i]["gsx$_cre1l"]["$t"];

      document.getElementById("demo").innerHTML +=
        "<tr>" +
        "<td>" +
        producttitle +
        "</td>" +
        "<td>" +
        category +
        "</td>" +
        "<td>" +
        sku +
        "</td>" +
        "<td>" +
        price +
        "</td>" +
        "</tr>";
    }
  }
};

xmlhttp.open(
  "GET",
  "https://spreadsheets.google.com/feeds/list/1pnCi13dDb1DgZRlb7nzBq37avffQJvzdwZLBVMCGq60/od6/public/values?alt=json",
  true
);
xmlhttp.send();