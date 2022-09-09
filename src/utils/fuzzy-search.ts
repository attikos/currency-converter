/**
 * Match string for search substring
 * @param {string} str, where we search
 * @param {string} search, substring which we search
 * @return {boolean} true if string contents all substring letters in the same order
 */

export const fuzzySearch = (str, search) => {

    if ( typeof str !== 'string' || typeof search !== 'string' ) {
        return false;
    }

    let _str = str.toLowerCase();
    let n = -1;
    let l;
    let _s;
    _s = search.toLowerCase();
    for (let i = 0; _s[i]; i++) {
        l = _s[i];
        if (!~(n = _str.indexOf(l, n + 1))) {
            return false;
        }
    }

    return true;
};
