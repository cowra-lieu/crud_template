export function _(s) { return document.querySelector(s); };
export function __(s) { return Array.prototype.slice.call(document.querySelectorAll(s), 0); };
export function _s2d(s) { return document.createRange().createContextualFragment(s); };

export function _fire(elem, evt_name, bubbles=false, cancelable=true) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(evt_name, bubbles, cancelable);
    elem.dispatchEvent(evt);
};

export function _find_ancestor(start, endtagname, endclassname) {
    while (1) {
        if (start === document.body) {
            return null;
        } else if ( (endtagname == null || start.tagName === endtagname) &&
            (endclassname == null || start._cc(endclassname)) ) {
            return start;
        } else {
            start = start.parentNode;
        }
    }
};

export function _remove_sibling_class(pnode, tagname, cname) {
    pnode.querySelectorAll(tagname).forEach(function(item){
        if (item._cc(cname))
          item._rc(cname)
    });
};

export function _remote(url, data={}, method='POST') {
    return fetch(url, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json'
        },
        method: method,
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer'
    }).then(resp => resp.json());
};
