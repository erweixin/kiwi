import IntlMessageFormat from 'intl-messageformat';
import lodashGet from 'lodash.get';
import Observer from './Observer';
class I18N {
    constructor(lang, metas, defaultKey) {
        this.__lang__ = lang;
        this.__metas__ = metas;
        this.__data__ = metas[lang];
        this.__defaultKey__ = defaultKey || 'zh-CN';
    }
    setLang(lang) {
        this.__lang__ = lang;
        this.__data__ = this.__metas__[lang];
    }
    getProp(obj, path, value) {
        console.log(path);
        if (path.length === 1 && value !== undefined) {
            return (obj[path[0]] = value);
        }
        else if (path.length === 0) {
            return obj;
        }
        else {
            const prop = path.shift();
            if (value !== undefined && obj[prop] === undefined) {
                obj[prop] = {};
            }
            return this.getProp(obj[prop], path, value);
        }
    }
    template(str, args) {
        if (!str) {
            return '';
        }
        if (typeof (str) === 'string') {
            return str.replace(/\{(.+?)\}/g, (match, p1) => {
                return this.getProp(Object.assign({}, this.__data__, args), p1.split('.'));
            });
        }
        else {
            return '';
        }
    }
    get(str, args) {
        console.log(str);
        let msg = lodashGet(this.__data__, str);
        if (!msg) {
            msg = lodashGet(this.__metas__[this.__defaultKey__], str, str);
        }
        if (args) {
            try {
                const formatter = new IntlMessageFormat(msg, this.__lang__);
                return formatter.format(args);
            }
            catch (err) {
                console.warn(`kiwi-intl format message failed for key='${str}'`, err);
                return '';
            }
        }
        else {
            return msg;
        }
    }
}
const IntlFormat = {
    init: (lang, metas, defaultKey) => {
        const i18n = new I18N(lang, metas, defaultKey);
        return Observer(i18n, defaultKey);
    }
};
export { IntlFormat };
export default IntlFormat;
//# sourceMappingURL=index.js.map