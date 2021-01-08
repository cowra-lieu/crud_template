import { _, __, _s2d, _fire } from './base.js'

HTMLElement.prototype._on = function (evtname, handler) {
    this.addEventListener(evtname, handler);
};
HTMLElement.prototype._attr = function (k, v) {
    if (!!v) {
        this.setAttribute(k, v);
    } else {
        this.removeAttribute(k);
    }
};
HTMLElement.prototype._ac = function (className) {
    this.classList.add(className);
};
HTMLElement.prototype._rc = function (className) {
    this.classList.remove(className);
};
HTMLElement.prototype._cc = function (className) {
    return this.classList.contains(className);
};
HTMLElement.prototype._h = function (htmltext) {
    this.innerHTML = htmltext;
};
HTMLElement.prototype._csstext = function (key, value) {
    const old_csstext = this.style.cssText;
    if (!!old_csstext) {
        const kv = new Map();
        old_csstext.split(';').forEach(item => {
            item = item.trim();
            if (!!item) {
                const k_v = item.split(':');
                kv.set(k_v[0].trim(), k_v[1].trim());
            }
        });
        if (value != '') {
            kv.set(key, value);
        } else {
            kv.delete(key);
        }
        const kvlist = [];
        kv.forEach((v, k) => kvlist.push(`${k}:${v}`));
        this.style.cssText = kvlist.join(';');
    } else if (value != '') {
        this.style.cssText = `${key}:${value}`;
    }
};

const _table_data = {
    cols: ['c1', 'c2', 'c3', 'c4', 'c5'],
    rows: [[1,2,3,4,5],[2,3,4,5,6],[3,4,5,6,7],[4,5,6,7,8],[5,6,7,8,9],[6,7,8,9,10],[7,8,9,10,11]],
    page: {
        total: 7
    }
};

let _current_page = 1;
let _current_pagesize = 10;

const _load_data = function() {
    // TODO load real data
    _init_table_head();
    _init_table_body();
    _init_table_foot();
};

const _init_table_head = function() {
    let heads = [];
    _table_data.cols.forEach(function(item) {
        heads.push(`<th>${item}</th>`);
    });
    heads.push('<th class="right aligned collapsing"></th>');
    _('#table_head')._h(heads.join(''));
};

const _init_table_body = function() {
    let last_td = 
    `<td class="right aligned collapsing">
        <button class="ui compact icon button"><i class="edit icon"></i></button>
        <button class="ui compact icon button"><i class="trash icon"></i></button>
    </td>`;
    let trs = [];
    _table_data.rows.forEach(function(items){
        let tds = [];
        items.forEach(function(item){
            tds.push(`<td>${item}</td>`);
        });
        tds.push(last_td);
        trs.push(`<tr>${tds.join('')}</tr>`);
    });
    _('#table_body')._h(trs.join(''));
};

const _init_table_foot = function() {
    _('#table_foot_lastcolumn')._attr('colspan', _table_data.cols.length);
    _init_pagination_menu();
};

const _init_pagination_menu = function() {
    let uipaginationmenu = _('.ui.pagination.menu');
    let uipaginationmenu_content = 
        `<a class="icon item" id="pagine_first"><i class="angle double left icon"></i></a>
        <a class="icon item" id="pagine_previous"><i class="angle left icon"></i></a>
        #
        <a class="icon item" id="pagine_next"><i class="angle right icon"></i></a>
        <a class="icon item" id="pagine_last"><i class="angle double right icon"></i></a>`;
    let uipaignationmenu_item = `<a class="item@" id="pagine_#">#</a>`;
    let pages = [];
    let t = _table_data.page.total;
    let page_number = 0;
    while (t && page_number<5) {
        t -= 1;
        page_number += 1
        pages.push(uipaignationmenu_item.replaceAll('#', page_number).replace('@', page_number == 1 ? ' active' : ''));
    }
    uipaginationmenu._h(uipaginationmenu_content.replace('#', pages.join('')));
    uipaginationmenu._on('click', _pagination_handler);
};

const _init_pagesize = function() {
    let pagesize = $('#table_pagesize');
    pagesize.dropdown({
        onChange: function(val) {
            _current_pagesize = parseInt(val);
        }
    });
};

const _pagination_handler = function(e) {
    let target = e.target;
    if (target.tagName === 'I') {
        target = target.parentNode;
    }
    let action = target.id.split('_')[1];
    console.log(action);
};

document.addEventListener('DOMContentLoaded', function () {
    _init_pagesize();
    _load_data();
});
