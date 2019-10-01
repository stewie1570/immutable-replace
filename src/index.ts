function mapObject(obj: any, propMap: any) {
    var ret: any = {};
    for (var propName in obj) {
        ret[propName] = propMap(obj[propName], propName);
    }

    return ret;
}

function some(obj: any, isMatch: any) {
    for (var name in obj) {
        if (isMatch(obj[name], name)) {
            return true;
        }
    }

    return false;
}

function processReplacement({ target, updated, haystack }: any) {
    return haystack === target ? updated
        : Array.isArray(haystack) ? processArray()
            : typeof haystack === "object" ? processObject()
                : haystack

    function processObject() {
        var updatedHaystack = mapObject(haystack, (obj: any) => processReplacement({ target, updated, haystack: obj }));

        return some(updatedHaystack, (prop: any, name: string) => prop !== haystack[name])
            ? updatedHaystack
            : haystack;
    }

    function processArray() {
        var updatedHaystack = haystack.map((item: any) => item === target ? updated : processReplacement({ target, updated, haystack: item }));

        return updatedHaystack.some((item: any, index: number) => item !== haystack[index])
            ? updatedHaystack
            : haystack;
    }
}

export function replace(old: any) {
    return {
        with: function (updated: any) {
            return {
                in: function (haystack: any) {
                    return processReplacement({ target: old, updated, haystack });
                }
            }
        }
    }
}