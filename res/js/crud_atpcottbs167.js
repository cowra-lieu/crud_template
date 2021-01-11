import { _, __, _s2d, _fire, _find_ancestor, _remove_sibling_class } from './base.js'

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

const __tbl_url = 'http://localhost:9082/demo1672/v1/atpcottbs167';
const __tbl_search = 'TBL_NO,VARCHAR2;APPL,VARCHAR2;EQP,VERCHAR2';
const __tbl_display = 'TBL_NO,VARCHAR2;APPL,VARCHAR2;EQP,VARCHAR2;RULE,VARCHAR2;EFFECTIVE_DATE,VARCHAR2;EXPIRY_DATE,VARCHAR2;HEADER_ID,VARCHAR2;LINENO,VARCHAR2';
const __tbl_edit = 'TBL_NO,VARCHAR2;APPL,VARCHAR2;EQP,VARCHAR2;RULE,VARCHAR2;MD5,VARCHAR2';
const __tbl_primary = 'MD5,VARCHAR2;HEADER_ID,VARCHAR2;LINENO,VARCHAR2';


const PAGINE_BTN_NUM = 5;

const _table_data = {
    details: [
    ],
    total: 7,
    current: 1
};

const _init_search_form = function() {
    let pattern = '<div class="ui mini labeled input"><div class="ui label">@0</div><input type="text" id="tbl_search_@0"></div>';
    let fs = [];
    __tbl_search.split(';').forEach(function(item){
        let nt = item.split(',');
        fs.push(pattern.replaceAll('@0', nt[0]));
    });
    _('#search_form')._h(fs.join(''));
};

let _current_page = 1;
let _current_pagesize = 10;
let _query_condition = '';

const _build_where = function() {
    let cs = [];
    __tbl_search.split(';').forEach(function(item) {
        let nt = item.split(',');
        let value = _(`#tbl_search_${nt[0]}`).value.trim();
        if (value.length > 0) {
            if (nt[1].indexOf('CHAR') >= 0) {
                cs.push(`${nt[0]}='${value}'`);
            } else {
                cs.push(`${nt[0]}=${value}`);
            }
        }
    });
    return encodeURIComponent(cs.join(' and '));
};

const _build_fields = function() {
    let cols = __tbl_display.split(';');
    let pks = __tbl_primary.split(';');
    let fs = [];
    cols.forEach(function(item){
        fs.push(item.split(',')[0]);
    });
    pks.forEach(function(item){
        if (!cols.includes(item)) {
            fs.push(item.split(',')[0]);
        }
    });
    return fs.join(',').toLowerCase();
};

const _load_data = function() {
    _('#table_loader')._ac('active');
    let where = _build_where();
    let fields = _build_fields();
    let url = `${__tbl_url}/${_current_pagesize}/${_current_page}?where=${where}&fields=${fields}`;
    console.log(url);
    fetch(url).then(function(resp){
        return resp.json();
    }).then(function(jsondata){
        Object.assign(_table_data, jsondata);
        if (_table_data.total > 0) {
            _table_data.pages = (_table_data.total / _current_pagesize) + ((_table_data.total % _current_pagesize) == 0 ? 0 : 1);
            _current_page = _table_data.current;
        } else {
            _table_data.pages = 0;
            _current_page = 0;
        }
        _init_table_head();
        _init_table_body();
        _init_table_foot();
        _('#table_loader')._rc('active');
    });
};

const _init_table_head = function() {
    let heads = [];
    __tbl_display.split(';').forEach(function(item) {
        let nt = item.split(',');
        heads.push(`<th data-type="${nt[1]}">${nt[0]}</th>`);
    });
    heads.push('<th class="right aligned collapsing"></th>');
    _('#table_head')._h(`<tr>${heads.join('')}</tr>`);
};

const _init_table_body = function() {
    let last_td = 
    `<td class="right aligned collapsing">
        <button class="mini ui black compact icon button" data-primary="@0" data-fields="@1"><i class="edit icon"></i></button>
        <button class="mini ui orange compact icon button" data-primary="@0"><i class="trash icon"></i></button>
    </td>`;
    let trs = [];
    _table_data.details.forEach(function(row){
        let tds = [];
        __tbl_display.split(';').forEach(function(item){
            let nt = item.split(',');
            let txt = row[nt[0].toLowerCase()];
            if (txt == null) {
                txt = '';
            }
            tds.push(`<td>${txt}</td>`);
        });
        let pks = [];
        __tbl_primary.split(';').forEach(function(item){
            let nt = item.split(',');
            pks.push(`${nt[0]}=${row[nt[0].toLowerCase()]}`);
        });
        tds.push(last_td.replaceAll('@1', __tbl_edit).replaceAll('@0', pks.join(',')));
        trs.push(`<tr>${tds.join('')}</tr>`);
    });
    _('#table_body')._h(trs.join(''));
};

const _last_pageno = function() {
    let mod = _table_data.total % _current_pagesize;
    let pc =  parseInt(_table_data.total / _current_pagesize);
    if (mod > 0) {
        pc += 1
    }
    return pc;
};

const _init_table_foot = function() {
    _('#table_total_records')._h(_table_data.total);
    _('#table_total_pages')._h(`${_table_data.current}/${_last_pageno()}`);
    _('#table_foot_lastcolumn')._attr('colspan', __tbl_display.split(';').length);
    if (_('.ui.pagination.menu').innerHTML == '' || 1 >= _current_page) {
        _init_pagination_menu();
    }
};

const _init_pagination_menu = function() {
    let uipaginationmenu = _('.ui.pagination.menu');
    let uipaginationmenu_content = 
        `<a class="icon item" id="pagine_first"><i class="angle double left icon"></i></a>
        <a class="icon item" id="pagine_previous"><i class="angle left icon"></i></a>
        #
        <a class="icon item" id="pagine_next"><i class="angle right icon"></i></a>
        <a class="icon item" id="pagine_last"><i class="angle double right icon"></i></a>`;
    let uipaignationmenu_item = `<a class="number item@" id="pagine_#">#</a>`;
    let pages = [];
    let t = _table_data.total;
    let page_number = 0;
    while (t && page_number< PAGINE_BTN_NUM) {
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
            _current_page = 1;
            _load_data();
        }
    });
};

const _pagination_handler = function(e) {
    let target = _find_ancestor(e.target, 'A', null);
    _remove_sibling_class(target.parentNode, 'A', 'active');

    if (_table_data.total == 0) {
        return;
    }

    let action = target.id.split('_')[1];
    let pageno = 1;
    let lastno = _last_pageno();
    if (action === 'previous') {
        if (_current_page > 1) {
            pageno = _current_page - 1;
        }
    } else if (action === 'next') {
        if (_current_page < lastno) {
            pageno = _current_page + 1;
        } else {
            pageno = lastno
        }
    } else if (action === 'last') {
        pageno = lastno;
    } else  if (action !== 'first'){
        pageno = parseInt(action);
    }

    if (target._cc('number')) {
        target._ac('active');
    } else {
        let p = _(`#pagine_${pageno}`);
        if (p) {
            p._ac('active');
        } else {
            let nums = target.parentNode.querySelectorAll('a.number.item');
            let nlen = nums.length;
            if (nlen > 0) {
                let min = parseInt(nums[0].innerHTML);
                let max = parseInt(nums[nlen-1].innerHTML);
                let start = pageno;
                if (pageno > max) {
                    start = pageno - (nlen - 1);
                }
                for (let i = 0; i<nlen; i++) {
                    nums[i].setAttribute('id', `pagine_${start}`);
                    nums[i].innerHTML = start;
                    start += 1;
                }
                p = _(`#pagine_${pageno}`);
                if (p) {
                    p._ac('active');
                }
            }
        }
    }

    if (pageno != _current_page) {
        _current_page = pageno;
        _load_data();
    }
};

const _do_search = function() {
    _current_page = 1;
    _load_data();
};

document.addEventListener('DOMContentLoaded', function () {
    _init_search_form();
    _init_pagesize();
    _load_data();
    _('#btn_tbl_query')._on('click', _do_search);
});
