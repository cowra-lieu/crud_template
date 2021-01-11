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

const __tbl_url = '';
const __tbl_search = 'TBL_NO,VARCHAR2;APPL,VARCHAR2;EQP,VERCHAR2';
const __tbl_display = 'TBL_NO,VARCHAR2;APPL,VARCHAR2;EQP,VARCHAR2;RULE,VARCHAR2;EFFECTIVE_DATE,VARCHAR2;EXPIRY_DATE,VARCHAR2';
const __tbl_edit = 'TBL_NO,VARCHAR2;APPL,VARCHAR2;EQP,VARCHAR2;RULE,VARCHAR2;MD5,VARCHAR2';
const __tbl_primary = 'MD5,VARCHAR2;HEADER_ID,VARCHAR2;LINENO,VARCHAR2';

const _table_data = {
    details: [
        {
            "rec_type": "3",
            "action": "2",
            "tbl_id": "167",
            "tbl_no": "00010750",
            "ticket_code": null,
            "appl": "Y",
            "fbtd": "-/ID00N*",
            "eqp": null,
            "cabin": null,
            "rbd": null,
            "fare_type": null,
            "tariff": null,
            "fare_owning_carrier": null,
            "rule": "STDN",
            "rest": null,
            "md5": "8c5bdc0b5a4090a0f238397b11ec9db8",
            "header_id": "TAX.1908231200.txt",
            "effective_date": "2019-08-23",
            "lineno": "2988",
            "expiry_date": "4000-12-31"
        },
        {
            "rec_type": "3",
            "action": "2",
            "tbl_id": "167",
            "tbl_no": "00010750",
            "ticket_code": null,
            "appl": "Y",
            "fbtd": "-/ID00R*",
            "eqp": null,
            "cabin": null,
            "rbd": null,
            "fare_type": null,
            "tariff": null,
            "fare_owning_carrier": null,
            "rule": "MATD",
            "rest": null,
            "md5": "1b73083c9c99728a940045050479b483",
            "header_id": "TAX.1908231200.txt",
            "effective_date": "2019-08-23",
            "lineno": "2996",
            "expiry_date": "4000-12-31"
        },
        {
            "rec_type": "3",
            "action": "2",
            "tbl_id": "167",
            "tbl_no": "00010750",
            "ticket_code": null,
            "appl": "Y",
            "fbtd": "-/ID75N*",
            "eqp": null,
            "cabin": null,
            "rbd": null,
            "fare_type": null,
            "tariff": null,
            "fare_owning_carrier": null,
            "rule": "MATD",
            "rest": null,
            "md5": "8bc3805d76e8b1978929bfa30940be41",
            "header_id": "TAX.1908231200.txt",
            "effective_date": "2019-08-23",
            "lineno": "2997",
            "expiry_date": "4000-12-31"
        },
        {
            "rec_type": "3",
            "action": "2",
            "tbl_id": "167",
            "tbl_no": "00010750",
            "ticket_code": null,
            "appl": "Y",
            "fbtd": "-/ID75R*",
            "eqp": null,
            "cabin": null,
            "rbd": null,
            "fare_type": null,
            "tariff": null,
            "fare_owning_carrier": null,
            "rule": "MATI",
            "rest": null,
            "md5": "686dcf281a805c39b548fe9e438e5a99",
            "header_id": "TAX.1908231200.txt",
            "effective_date": "2019-08-23",
            "lineno": "3017",
            "expiry_date": "4000-12-31"
        },
        {
            "rec_type": "3",
            "action": "2",
            "tbl_id": "167",
            "tbl_no": "00010750",
            "ticket_code": null,
            "appl": "Y",
            "fbtd": "-/ID00N*",
            "eqp": null,
            "cabin": null,
            "rbd": null,
            "fare_type": null,
            "tariff": null,
            "fare_owning_carrier": null,
            "rule": "MIOA",
            "rest": null,
            "md5": "6b6cd826a2dfaaf0dc0383b16673804f",
            "header_id": "TAX.1908231200.txt",
            "effective_date": "2019-08-23",
            "lineno": "3048",
            "expiry_date": "4000-12-31"
        },
        {
            "rec_type": "3",
            "action": "2",
            "tbl_id": "167",
            "tbl_no": "00010750",
            "ticket_code": null,
            "appl": "Y",
            "fbtd": "-/ID90R*",
            "eqp": null,
            "cabin": null,
            "rbd": null,
            "fare_type": null,
            "tariff": null,
            "fare_owning_carrier": null,
            "rule": "MAA5",
            "rest": null,
            "md5": "1a055f8536b8f2b7d5feac42e233d74b",
            "header_id": "TAX.1908231200.txt",
            "effective_date": "2019-08-23",
            "lineno": "3055",
            "expiry_date": "4000-12-31"
        },
        {
            "rec_type": "3",
            "action": "2",
            "tbl_id": "167",
            "tbl_no": "00011278",
            "ticket_code": null,
            "appl": "Y",
            "fbtd": "-/WS05",
            "eqp": null,
            "cabin": null,
            "rbd": null,
            "fare_type": null,
            "tariff": "191",
            "fare_owning_carrier": null,
            "rule": "JPS5",
            "rest": null,
            "md5": "a1a3763e8798dbef55452d0818659b1b",
            "header_id": "TAX.2001031500.txt",
            "effective_date": "2020-01-03",
            "lineno": "87",
            "expiry_date": "4000-12-31"
        },
        {
            "rec_type": "3",
            "action": "2",
            "tbl_id": "167",
            "tbl_no": "00011279",
            "ticket_code": null,
            "appl": "Y",
            "fbtd": "-/WS05",
            "eqp": null,
            "cabin": null,
            "rbd": null,
            "fare_type": null,
            "tariff": "864",
            "fare_owning_carrier": null,
            "rule": "JPST",
            "rest": null,
            "md5": "d663a9854202507e2c2cc205c24578bb",
            "header_id": "TAX.2001031500.txt",
            "effective_date": "2020-01-03",
            "lineno": "117",
            "expiry_date": "4000-12-31"
        },
        {
            "rec_type": "3",
            "action": "2",
            "tbl_id": "167",
            "tbl_no": "00011279",
            "ticket_code": null,
            "appl": "Y",
            "fbtd": "-/WS05",
            "eqp": null,
            "cabin": null,
            "rbd": null,
            "fare_type": null,
            "tariff": "191",
            "fare_owning_carrier": null,
            "rule": "JPS5",
            "rest": null,
            "md5": "8fbdf8680bda2412d4037b25fa45bb53",
            "header_id": "TAX.2001031500.txt",
            "effective_date": "2020-01-03",
            "lineno": "123",
            "expiry_date": "4000-12-31"
        },
        {
            "rec_type": "3",
            "action": "2",
            "tbl_id": "167",
            "tbl_no": "00011279",
            "ticket_code": null,
            "appl": "Y",
            "fbtd": "-/WS01",
            "eqp": null,
            "cabin": null,
            "rbd": null,
            "fare_type": null,
            "tariff": "864",
            "fare_owning_carrier": null,
            "rule": "JPST",
            "rest": null,
            "md5": "51cecd258dde597381fd2842b6ddc014",
            "header_id": "TAX.2001031500.txt",
            "effective_date": "2020-01-03",
            "lineno": "113",
            "expiry_date": "4000-12-31"
        }
    ],
    total: 7,
    current: 1
};

const _init_search_form = function() {
    let pattern = '<div class="ui mini labeled input"><div class="ui label">@0</div><input type="text" data-name="@1"></div>';
    let fs = [];
    __tbl_search.split(';').forEach(function(item){
        let nt = item.split(',');
        fs.push(pattern.replaceAll('@0', nt[0]).replaceAll('@1', nt[1]));
    });
    _('#search_form')._h(fs.join(''));
};

let _current_page = 1;
let _current_pagesize = 10;
let _query_condition = '';

const _load_data = function() {
    // TODO load real data
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
            tds.push(`<td>${row[nt[0].toLowerCase()]}</td>`);
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

const _init_table_foot = function() {
    _('#table_foot_lastcolumn')._attr('colspan', __tbl_display.split(';').length);
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
    let t = _table_data.total;
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
    let pageno = 1;
    if (action === 'previous') {
        if (_current_page > 1) {
            pageno = _current_page - 1;
        }
    } else if (action === 'next') {
        if (_current_page < _table_data.total) {
            pageno = _current_page + 1;
        } else {
            pageno = _table_data.total
        }
    } else if (action === 'last') {
        pageno = _table_data.total;
    } else {
        pageno = action;
    }
    let reqpath = `/${_current_pagesize}/${pageno}` + (_query_condition != '' ? `?${_query_condition}` : '');
    console.log(reqpath);
    _('#table_loader')._ac('active');
};

document.addEventListener('DOMContentLoaded', function () {
    _init_search_form();
    _init_pagesize();
    _load_data();
});
