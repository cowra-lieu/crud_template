export function _(s) { return document.querySelector(s); };
export function __(s) { return Array.prototype.slice.call(document.querySelectorAll(s), 0); };
export function _s2d(s) { return document.createRange().createContextualFragment(s); };

export function _fire(elem, evt_name, bubbles=false, cancelable=true) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(evt_name, bubbles, cancelable);
    elem.dispatchEvent(evt);
};
