var current = 0;
var pages = 0;
var datas;
const ulTag = document.querySelector("ul");

getData(current);

function getData(current) {
    const loadPic = document.querySelector('#loading');
    loadPic.setAttribute('class', 'loading')
    const api = './data/data.json';
    datas = fetch(api).then(resp => resp.json())
        .then(data => {
            pages = Math.ceil(data.length / 10);
            build(data);
            pagination(current);
            loadPic.className = 'invisible';
            return data;
        });
}

function build(data) {
    let dataStr = '';
    const table = document.querySelector('#table');
    var i = 1;
    for (var n = 0; n < 10; n += 1) {
        dataStr += `
        <tr id="row_cell" class="row_cell">
        <td class="id border text_center">${i}</td>
        <td class="city border text_center">${data[n].City}</td>
        <td class="pic border mx-auto"><div class="img_inner mx-auto"><img class="img_resp" src="${data[n].PicURL}" alt="${data[n].Name}" wiidth="78" height="52" >
        <img class="img_resp_zoom mx-auto" src="${data[n].PicURL}" alt="${data[n].Name}" wiidth="280" height="187" >
        </div>
        </td>
        <td id="name" class="name border p_1"></td>
        <td class="intro border p_1">${data[n].HostWords.substring(0, 50)}...</td>
      </tr>`;
        i += 1;

    }
    table.innerHTML += dataStr;
    var arr = document.querySelectorAll('#name');
    for (var n = 0; n < 10; n += 1) {
        if (data[n].Url !== '') {
            arr[n].innerHTML = `<a class="link" href="${data[n].Url}" target="_blank">${data[n].Name}</a>`
        } else {
            arr[n].textContent = `${data[n].Name}`
        }
    }
}

function pagination(current) {
    let liTag = "";
    for (let i = 0; i < pages; i += 1) {
        if (i === 0) {
            liTag += `<li class="page_item active">${i + 1}</li>`;
        } else {
            liTag += `<li class="page_item">${i + 1}</li>`;
        }
    }
    ulTag.innerHTML = liTag;
}

const elePages = document.querySelector('.pages');
elePages.addEventListener('click', select);

function select(e) {
    const arr = elePages.children;
    if (e.target.className.indexOf("page_item") === -1) {
        return;
    }
    current = parseInt(e.target.textContent) - 1;
    for (var i = 0; i < arr.length; i += 1) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].classList.remove('active');
        }
        arr[current].classList.add('active');
    }

    change(current);
}

function change(index) {
    datas.then(data => {
        remove(data);
        let str = '';
        const retable = document.querySelector('#table');
        var start = index * 10;
        var end = index * 10 + 10;
        for (var i = start; i < end; i += 1) {
            if (data[i] !== undefined) {
                str += `
                <tr id="row_cell" class="row_cell">
                <td class="id border text_center">${i + 1}</td>
                <td class="city border text_center">${data[i].City}</td>
                <td class="pic border mx-auto"><div class="img_inner mx-auto"><img class="img_resp" src="${data[i].PicURL}" alt="${data[i].Name}" wiidth="78" height="52" >
                <img class="img_resp_zoom mx-auto" src="${data[i].PicURL}" alt="${data[i].Name}" wiidth="280" height="187" >
                </div></td>
                <td id="name" class="name border p_1"></td>
                <td class="intro border p_1">${data[i].HostWords.substring(0, 50)}...</td>
              </tr>`;
            }
        }
        retable.innerHTML += str;
        const rearr = document.querySelectorAll('#name');
        var count = 0;
        for (var i = start; i < end; i += 1) {
            if (data[i] !== undefined) {
                if (data[i].Url !== '') {
                    rearr[count].innerHTML = `<a class="link" href="${data[i].Url}" target="_blank">${data[i].Name}</a>`
                } else {
                    rearr[count].textContent = `${data[i].Name}`
                }
                count += 1;
            }
        }
    })
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
