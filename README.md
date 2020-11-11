# immutable-replace

[![Build](https://github.com/stewie1570/immutable-replace/workflows/Build/badge.svg)](https://github.com/stewie1570/immutable-replace/actions)
[![Coverage Status](https://coveralls.io/repos/github/stewie1570/immutable-replace/badge.svg?branch=master)](https://coveralls.io/github/stewie1570/immutable-replace?branch=master)
[![npm version](https://badge.fury.io/js/immutable-replace.svg)](https://badge.fury.io/js/immutable-replace)
[![Package Size](https://badgen.net/bundlephobia/minzip/immutable-replace)](https://bundlephobia.com/result?p=immutable-replace)

If you don't want to nest or recurse usage of the spread operator to get an updated object then you may like this package.

**General Usage**
```javascript
import { replace } from 'immutable-replace'

const result = replace(old).with(updated).in(haystack);
```

**Examples from unit tests:**
```javascript
it("should return the new object when the haystack is the old object", () => {
    const old = { value: "old" };
    const updated = { value: "updated" };

    expect(replace(old).with(updated).in(old)).toBe(updated);
});

it("should find and replace the object in a complex object", () => {
    //Arrange
    const old = { value: "old" };
    const updated = { value: "updated" };
    const haystack = {
        untouched: { wrapper: "something" },
        targetWrapper: {
            target: old
        }
    };

    //Act
    const result = replace(old).with(updated).in(haystack);

    //Assert
    expect(result).toEqual({
        untouched: { wrapper: "something" },
        targetWrapper: {
            target: updated
        }
    });
    expect(result.targetWrapper.target).toBe(updated);
    expect(result.untouched).toBe(haystack.untouched);
});

it("should find and replace the object in an array in a complex object", () => {
    //Arrange
    const old = { value: "old" };
    const updated = { value: "updated" };
    const haystack = {
        untouched: [{ untouched: "something" }],
        target: [old]
    };

    //Act
    const result = replace(old).with(updated).in(haystack);

    //Assert
    expect(result).toEqual({
        untouched: [{ untouched: "something" }],
        target: [updated]
    });
    expect(result.untouched).toBe(haystack.untouched);
    expect(result.target[0]).toBe(updated);
});

it("should find and replace the object in a complex object in an array in another complex object", () => {
    //Arrange
    const old = { value: "old" };
    const updated = { value: "updated" };
    const haystack = {
        untouched: [{ untouched: "something" }],
        target: [{ targetWrapper: old }]
    };

    //Act
    const result = replace(old).with(updated).in(haystack);

    //Assert
    expect(result).toEqual({
        untouched: [{ untouched: "something" }],
        target: [{ targetWrapper: updated }]
    });
    expect(result.untouched[0]).toBe(haystack.untouched[0]);
    expect(result.target[0].targetWrapper).toBe(updated);
});

it("should find and replace multiple targets in a complex structure", () => {
    //Arrange
    const old = { value: "old" };
    const updated = { value: "updated" };
    const haystack = {
        untouched: [{ untouched: "something" }],
        target: [{ targetWrapper: old }],
        secondTarget: old
    };

    //Act
    const result = replace(old).with(updated).in(haystack);

    //Assert
    expect(result).toEqual({
        untouched: [{ untouched: "something" }],
        target: [{ targetWrapper: updated }],
        secondTarget: updated
    });
    expect(result.untouched[0]).toBe(haystack.untouched[0]);
    expect(result.target[0].targetWrapper).toBe(updated);
    expect(result.secondTarget).toBe(updated);
});
```
