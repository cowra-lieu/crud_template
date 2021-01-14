import { _, __, _s2d, _fire, _find_ancestor, _remove_sibling_class, _remote } from './base.js'

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

const __tbl_url = 'http://localhost:9085/demo005/v1/atpcottbs167';
const __tbl_search = 'TBL_NO,VARCHAR2;APPL,VARCHAR2;EQP,VARCHAR2';
const __tbl_display = 'TBL_NO,VARCHAR2;TICKET_CODE,VARCHAR2;APPL,VARCHAR2;FBTD,VARCHAR2;EQP,VARCHAR2;CABIN,VARCHAR2;RBD,VARCHAR2;FARE_TYPE,VARCHAR2;TARIFF,VARCHAR2;FARE_OWNING_CARRIER,VARCHAR2;RULE,VARCHAR2;REST,VARCHAR2;MD5,VARCHAR2;HEADER_ID,VARCHAR2;EFFECTIVE_DATE,DATE;LINENO,VARCHAR2;EXPIRY_DATE,DATE';
const __tbl_edit = 'REC_TYPE,VARCHAR2;ACTION,VARCHAR2;TBL_ID,VARCHAR2;TBL_NO,VARCHAR2;TICKET_CODE,VARCHAR2;APPL,VARCHAR2;FBTD,VARCHAR2;EQP,VARCHAR2;CABIN,VARCHAR2;RBD,VARCHAR2;FARE_TYPE,VARCHAR2;TARIFF,VARCHAR2;FARE_OWNING_CARRIER,VARCHAR2;RULE,VARCHAR2;REST,VARCHAR2;MD5,VARCHAR2;HEADER_ID,VARCHAR2;EFFECTIVE_DATE,DATE;LINENO,VARCHAR2;EXPIRY_DATE,DATE';
const __tbl_primary = 'HEADER_ID,VARCHAR2;LINENO,VARCHAR2;MD5,VARCHAR2';


const PAGINE_BTN_NUM = 7;

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

const _get_sql_value = function(v, t) {
    if (t.indexOf('NUMBER') >= 0) {
        return v;
    } else if (t.indexOf('DATE') >= 0) {
        return `to_date('${v}','yyyy-MM-dd')`;
    } else {
        return `'${v.replaceAll("'", "''")}'`;
    }
}

const _build_where = function() {
    let cs = [];
    __tbl_search.split(';').forEach(function(item) {
        let nt = item.split(',');
        let value = _(`#tbl_search_${nt[0]}`).value.trim();
        if (value.length > 0) {
            value = _get_sql_value(value, nt[1]);
            cs.push(`${nt[0]}=${value}`);
        }
    });
    return encodeURIComponent(cs.join(' and '));
};

const _build_fields = function() {
    let cols = __tbl_display.split(';');
    let edts = __tbl_edit.split(';');
    let pks = __tbl_primary.split(';');
    let fs = [];
    cols.forEach(function(item){
        fs.push(item.split(',')[0]);
    });
    edts.forEach(function(item){
        let n = item.split(',')[0];
        if (!fs.includes(n)) {
            fs.push(n);
        }
    });
    pks.forEach(function(item){
        let n = item.split(',')[0];
        if (!fs.includes(n)) {
            fs.push(n);
        }
    });
    return fs.join(',').toLowerCase();
};

const _load_data = function() {
    _('#table_loader')._ac('active');
    _('#crud_table_area')._csstext('display');
    let where = _build_where();
    let fields = _build_fields();
    let url = `${__tbl_url}/${_current_pagesize}/${_current_page}?where=${where}&fields=${fields}`;
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
        
        __('.ui.modal.create input').forEach(function(ipt){
            ipt.value = '';
            _find_ancestor(ipt, null, 'field').dataset['init'] = '';
        });

        _('#table_loader')._rc('active');
    }).catch(function(error){
        _show_global_msg('Encounter Some Error', error, true);
        _('#table_loader')._rc('active');
        _('#crud_table_area')._csstext('display', 'none');
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
    `<td class="right aligned collapsing" data-primary="@0">
        <button class="mini ui black compact icon button crud_edit" data-index="@1"><i class="edit icon"></i></button>
        <button class="mini ui orange compact icon button crud_del"><i class="trash icon"></i></button>
    </td>`;
    let trs = [];
    let index = 0;
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
            let v = row[nt[0].toLowerCase()];
            v = _get_sql_value(v, nt[1]);
            pks.push(`${nt[0]}=${v}`);
        });
        tds.push(last_td.replace('@0', pks.join(' and ')).replace('@1', index));
        trs.push(`<tr>${tds.join('')}</tr>`);
        index += 1;
    });
    _('#table_body')._h(trs.join(''));
    _bind_edit_del_handlers();
};

const _bind_edit_del_handlers = function() {
    __('#table_body button.crud_edit').forEach(function(btn){
        btn._on('click', _open_edit_modal);
    });
    __('#table_body button.crud_del').forEach(function(btn){
        btn._on('click', _confirm_delete);
    });
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
    // _('#table_foot_lastcolumn')._attr('colspan', __tbl_display.split(';').length+1);
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
    let t = _last_pageno();
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

    let nums = target.parentNode.querySelectorAll('a.number.item');
    let nlen = nums.length;
    let start = 1;
    let min = parseInt(nums[0].innerHTML);
    let max = parseInt(nums[nlen-1].innerHTML);
    let p;
    if (target._cc('number')) {
        if (nlen > 0) {
            if (pageno == min || pageno == max) {
                start = pageno - (PAGINE_BTN_NUM - 1)/2;
                if (start < 1) {
                    start = 1;
                } else if (pageno == lastno) {
                    start = lastno - (nlen - 1);
                }
                for (let i = 0; i<nlen; i++) {
                    nums[i].setAttribute('id', `pagine_${start}`);
                    nums[i].innerHTML = start;
                    start += 1;
                }
                p = _(`#pagine_${pageno}`);
                if (p) {
                    target._rc('active');
                    p._ac('active');
                }
            } else {
                target._ac('active');
            }
        }
    } else {
        if (nlen > 0) {
            if (pageno == min || pageno == max) {
                start = pageno - (PAGINE_BTN_NUM - 1)/2;
                if (start < 1) {
                    start = 1;
                } else if (pageno == lastno) {
                    start = lastno - (nlen - 1);
                }
                for (let i = 0; i<nlen; i++) {
                    nums[i].setAttribute('id', `pagine_${start}`);
                    nums[i].innerHTML = start;
                    start += 1;
                }
                p = _(`#pagine_${pageno}`);
                if (p) {
                    target._rc('active');
                    p._ac('active');
                }
            } else {
                p = _(`#pagine_${pageno}`);
                if (p) {
                    p._ac('active');
                } else {
                    start = pageno;
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
                        target._rc('active');
                        p._ac('active');
                    }
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

const _init_edit_form = function(init_data={}) {
    let input_p = 
    `<div class="field" data-init="@0" data-type="@2">
        <label>@1</label>
        <div class="ui mini input">
        <input name="@1" type="text">
        </div>
    </div>`;
    let fields_p = `<div class="six fields">@0</div>`;
    let fields_list = [];
    let tmp_list = [];
    let edits = __tbl_edit.split(';');
    let nt, n, t, init;
    for(let i = 0; i<edits.length; i++) {
        nt = edits[i].split(',');
        n = nt[0];
        t = nt[1];
        init = init_data[n] == null ? '' : init_data[n];
        tmp_list.push(input_p.replaceAll('@0', init).replaceAll('@1', n).replaceAll('@2', t));
        if (tmp_list.length == 6) {
            fields_list.push(fields_p.replace('@0', tmp_list.join('')));
            tmp_list.length = 0;
        }
    }
    if (tmp_list.length) {
        fields_list.push(fields_p.replace('@0', tmp_list.join('')));
        tmp_list.length = 0;
    }
    _('#frm_edit')._h(fields_list.join(''));
};

const _open_create_modal = function() {
    let mheader = _('#mdl_edit_header');
    if (mheader.innerHTML.indexOf('edit')>=0) {
        __('.ui.modal.create input').forEach(function(ipt){
            ipt.value = '';
            _find_ancestor(ipt, null, 'field').dataset['init'] = '';
        });
    }
    _('#mdl_edit_header')._h('<i class="plus icon"></i> 新建');
    $('.ui.modal.create').modal('show');
};

let _where_edit;
const _open_edit_modal = function(e) {
    let target = _find_ancestor(e.target, 'BUTTON', null);
    _where_edit = target.parentNode.dataset['primary'];
    let init_data = _table_data.details[parseInt(target.dataset['index'])];
    __tbl_edit.split(';').forEach(function(item){
        let nt = item.split(',');
        let n = nt[0];
        let v = init_data[n.toLowerCase()];
        if (v == null) {
            v = '';
        }
        let ipt = _(`#frm_edit input[name="${n}"]`);
        ipt.value = v;
        _find_ancestor(ipt, null, 'field').dataset['init'] = v;
    });
    _('#mdl_edit_header')._h('<i class="edit icon"></i> 修改');
    $('.ui.modal.create').modal('show');
};

let _where_del;
const _confirm_delete = function(e) {
    let target = _find_ancestor(e.target, 'TD', null);
    _where_del = target.dataset['primary'];
    $('.ui.modal.confirm_del').modal('show');
};

const _do_del = function() {
    let data = {
        whereclause: _where_del
    };
    _remote(__tbl_url, data, 'DELETE').then(function(data){
        if (data.status != 204) {
            _show_global_msg(data.error, data.message, true);
        } else {
            _load_data();
        }
    }).catch(function(error){
        _show_global_msg('Encounter Some Error', error, true);
    });
};

const _do_submit = function() {
    if (_('#mdl_edit_header').innerHTML.indexOf('edit')>=0) {
        _submit_edit();
    } else {
        _submit_create();
    }
};

const _submit_edit = function() {
    let sets = [];
    __('form .fields .field').forEach(function(f) {
        let ipt = f.querySelector('input');
        let v = ipt.value.trim();
        if (v != f.dataset['init']) {
            v = _get_sql_value(v, f.dataset['type']);
            sets.push(`${ipt.name}=${v}`);
        }
    });
    let data = {
        setclause: sets.join(', '),
        whereclause: _where_edit
    };
    _remote(__tbl_url, data, 'PUT').then(function(data){
        if (data.status != 200) {
            _show_modal_edit_error(data.error, data.message);
        } else {
            $('.ui.modal.create').modal('hide');
            _load_data();
        }
    }).catch(function(error){
        _show_modal_edit_error('Encounter Some Error', error);
    });
};

const _submit_create = function() {
    let data = {};
    __('form .fields .field').forEach(function(f) {
        let input = f.querySelector('input');
        data[input.getAttribute('name').toLowerCase()] = input.value.trim();
    });
    _remote(__tbl_url, data).then(function(data){
        if (data.status != 201) {
            _show_modal_edit_error(data.error, data.message);
        } else {
            $('.ui.modal.create').modal('hide');
            _load_data();
        }
    }).catch(function(error){
        _show_modal_edit_error('Encounter Some Error', error);
    });
};

const _reset_edit = function() {
    __('form .fields .field').forEach(function(f) {
        f.querySelector('input').value = f.dataset['init'];
    });
};

const _show_modal_edit_error = function(error, message) {
    let msgnode = _('.ui.modal.create .ui.negative.message');
    msgnode.querySelector('.header').innerHTML = error;
    msgnode.querySelector('.error_details').innerHTML = message;
    msgnode._csstext('display');
};

const _show_global_msg = function(title, content, isError) {
    let msgnode = _('#msg_area');
    msgnode.querySelector('.header').innerHTML = title;
    msgnode.querySelector('.error_details').innerHTML = content;
    if (isError) {
        msgnode._rc('positive');
        msgnode._ac('negative');
    } else {
        msgnode._rc('negative');
        msgnode._ac('positive');
    }
    msgnode._csstext('display');
};

const _after_modal_hidden = function() {
    // console.log('After edit modal hidden...')
};

document.addEventListener('DOMContentLoaded', function () {
    
    $('.ui.modal.create').modal({
        centered: false,
        transition: 'horizontal flip',
        onHidden: _after_modal_hidden
    });

    $('.ui.modal.confirm_del').modal({
        closable: false,
        onDeny: function(){
            // console.log('deny');
        },
        onApprove: _do_del
    });

    $('.message .close').on('click', function() {
        $(this).closest('.message').fadeOut();
    });

    _init_edit_form();
    _init_search_form();
    _init_pagesize();
    _load_data();

    _('#btn_tbl_query')._on('click', _do_search);
    _('#btn_tbl_create')._on('click', _open_create_modal);
    _('#btn_edit_submit')._on('click', _do_submit);
    _('#btn_edit_reset')._on('click', _reset_edit);
});