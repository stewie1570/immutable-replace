function mapObject(obj, propMap) {
    var ret = {};
    for (var propName in obj) {
        ret[propName] = propMap(obj[propName], propName);
    }

    return ret;
}

function processReplacement({ target, updated, haystack }) {
    return haystack === target ? updated
        : Array.isArray(haystack)
            ? haystack.map(item => item === target ? updated : processReplacement({ target, updated, haystack: item }))
            : typeof haystack === "object"
                ? mapObject(haystack, obj => processReplacement({ target, updated, haystack: obj }))
                : haystack
}

export function replace(old) {
    return {
        with: function (updated) {
            return {
                in: function (haystack) {
                    return processReplacement({ target: old, updated, haystack });
                }
            }
        }
    }
}