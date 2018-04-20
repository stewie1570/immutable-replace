function mapObject(obj, propMap) {
    var ret = {};
    for (var propName in obj) {
        ret[propName] = propMap(obj[propName], propName);
    }

    return ret;
}

function some(obj, isMatch) {
    for (var name in obj) {
        if (isMatch(obj[name], name)) {
            return true;
        }
    }

    return false;
}

function processReplacement({ target, updated, haystack }) {
    return haystack === target ? updated
        : Array.isArray(haystack) ? processArray()
            : typeof haystack === "object" ? processObject()
                : haystack

    function processObject() {
        var updatedHaystack = mapObject(haystack, obj => processReplacement({ target, updated, haystack: obj }));

        return some(updatedHaystack, (prop, name) => prop !== haystack[name])
            ? updatedHaystack
            : haystack;
    }

    function processArray() {
        var updatedHaystack = haystack.map(item => item === target ? updated : processReplacement({ target, updated, haystack: item }));

        return updatedHaystack.some((item, index) => item !== haystack[index])
            ? updatedHaystack
            : haystack;
    }
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