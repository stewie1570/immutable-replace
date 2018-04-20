import { replace } from '../src'

describe("Replace", () => {
    it("should return the new object when the haystack is the old object", () => {
        var old = { value: "old" };
        var updated = { value: "updated" };

        expect(replace(old).with(updated).in(old)).toBe(updated);
    });

    it("should find and replace the object in a complex object", () => {
        //Arrange
        var old = { value: "old" };
        var haystack = {
            untouched: { wrapper: "something" },
            targetWrapper: {
                target: old
            }
        };
        var updated = { value: "updated" };

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
        var old = { value: "old" };
        var haystack = {
            untouched: [{ untouched: "something" }],
            target: [old]
        };
        var updated = { value: "updated" };

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
        var old = { value: "old" };
        var haystack = {
            untouched: [{ untouched: "something" }],
            target: [{ targetWrapper: old }]
        };
        var updated = { value: "updated" };

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
        var old = { value: "old" };
        var haystack = {
            untouched: [{ untouched: "something" }],
            target: [{ targetWrapper: old }],
            secondTarget: old
        };
        var updated = { value: "updated" };

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
});