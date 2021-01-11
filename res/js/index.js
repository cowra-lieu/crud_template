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

document.addEventListener('DOMContentLoaded', function () {
    console.log("You're welcome!");
});
