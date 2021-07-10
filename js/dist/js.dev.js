"use strict";

var current = 0;
var pages = 0;
var datas;
var ulTag = document.querySelector("ul");
getData(current);

function getData(current) {
  var loadPic = document.querySelector('#loading');
  loadPic.setAttribute('class', 'loading');
  var api = './data/data.json';
  datas = fetch(api).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    pages = Math.ceil(data.length / 10);
    build(data);
    pagination(current);
    loadPic.className = 'invisible';
    return data;
  });
}

function build(data) {
  var dataStr = '';
  var table = document.querySelector('#table');
  var i = 1;

  for (var n = 0; n < 10; n += 1) {
    dataStr += "\n        <tr id=\"row_cell\" class=\"row_cell\">\n        <td class=\"id border text_center\">".concat(i, "</td>\n        <td class=\"city border text_center\">").concat(data[n].City, "</td>\n        <td class=\"pic border mx-auto\"><div class=\"img_inner mx-auto\"><img class=\"img_resp\" src=\"").concat(data[n].PicURL, "\" alt=\"").concat(data[n].Name, "\" wiidth=\"78\" height=\"52\" >\n        <img class=\"img_resp_zoom mx-auto\" src=\"").concat(data[n].PicURL, "\" alt=\"").concat(data[n].Name, "\" wiidth=\"280\" height=\"187\" >\n        </div>\n        </td>\n        <td id=\"name\" class=\"name border p_1\"></td>\n        <td class=\"intro border p_1\">").concat(data[n].HostWords.substring(0, 50), "...</td>\n      </tr>");
    i += 1;
  }

  table.innerHTML += dataStr;
  var arr = document.querySelectorAll('#name');

  for (var n = 0; n < 10; n += 1) {
    if (data[n].Url !== '') {
      arr[n].innerHTML = "<a class=\"link\" href=\"".concat(data[n].Url, "\" target=\"_blank\">").concat(data[n].Name, "</a>");
    } else {
      arr[n].textContent = "".concat(data[n].Name);
    }
  }
}

function pagination(current) {
  var liTag = "";

  for (var i = 0; i < pages; i += 1) {
    if (i === 0) {
      liTag += "<li class=\"page_item active\">".concat(i + 1, "</li>");
    } else {
      liTag += "<li class=\"page_item\">".concat(i + 1, "</li>");
    }
  }

  ulTag.innerHTML = liTag;
}

var elePages = document.querySelector('.pages');
elePages.addEventListener('click', select);

function select(e) {
  var arr = elePages.children;

  if (e.target.className.indexOf("page_item") === -1) {
    return;
  }

  current = parseInt(e.target.textContent) - 1;

  for (var i = 0; i < arr.length; i += 1) {
    for (var _i = 0; _i < arr.length; _i++) {
      arr[_i].classList.remove('active');
    }

    arr[current].classList.add('active');
  }

  change(current);
}

function change(index) {
  datas.then(function (data) {
    remove(data);
    var str = '';
    var retable = document.querySelector('#table');
    var start = index * 10;
    var end = index * 10 + 10;

    for (var i = start; i < end; i += 1) {
      if (data[i] !== undefined) {
        str += "\n                <tr id=\"row_cell\" class=\"row_cell\">\n                <td class=\"id border text_center\">".concat(i + 1, "</td>\n                <td class=\"city border text_center\">").concat(data[i].City, "</td>\n                <td class=\"pic border mx-auto\"><div class=\"img_inner mx-auto\"><img class=\"img_resp\" src=\"").concat(data[i].PicURL, "\" alt=\"").concat(data[i].Name, "\" wiidth=\"78\" height=\"52\" >\n                <img class=\"img_resp_zoom mx-auto\" src=\"").concat(data[i].PicURL, "\" alt=\"").concat(data[i].Name, "\" wiidth=\"280\" height=\"187\" >\n                </div></td>\n                <td id=\"name\" class=\"name border p_1\"></td>\n                <td class=\"intro border p_1\">").concat(data[i].HostWords.substring(0, 50), "...</td>\n              </tr>");
      }
    }

    retable.innerHTML += str;
    var rearr = document.querySelectorAll('#name');
    var count = 0;

    for (var i = start; i < end; i += 1) {
      if (data[i] !== undefined) {
        if (data[i].Url !== '') {
          rearr[count].innerHTML = "<a class=\"link\" href=\"".concat(data[i].Url, "\" target=\"_blank\">").concat(data[i].Name, "</a>");
        } else {
          rearr[count].textContent = "".concat(data[i].Name);
        }

        count += 1;
      }
    }
  });
}

function remove(data) {
  var elem = document.querySelectorAll('#row_cell');
  console.log(elem);

  for (var i = 0; i < 10; i += 1) {
    if (elem[i] !== undefined) {
      elem[i].parentNode.removeChild(elem[i]);
    }
  }
}