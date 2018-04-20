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
            value: "something",
            targetWrapper: {
                target: old
            }
        };
        var updated = { value: "updated" };

        //Act
        const result = replace(old).with(updated).in(haystack);

        //Assert
        expect(result).toEqual({
            value: "something",
            targetWrapper: {
                target: updated
            }
        });
        expect(result.targetWrapper.target).toBe(updated);
    });

    it("should find and replace the object in an array in a complex object", () => {
        //Arrange
        var old = { value: "old" };
        var haystack = {
            value: "something",
            target: [old]
        };
        var updated = { value: "updated" };

        //Act
        const result = replace(old).with(updated).in(haystack);

        //Assert
        expect(result).toEqual({
            value: "something",
            target: [updated]
        });
        expect(result.target[0]).toBe(updated);
    });

    it("should find and replace the object in a complex object in an array in another complex object", () => {
        //Arrange
        var old = { value: "old" };
        var haystack = {
            value: "something",
            target: [{ targetWrapper: old }]
        };
        var updated = { value: "updated" };

        //Act
        const result = replace(old).with(updated).in(haystack);

        //Assert
        expect(result).toEqual({
            value: "something",
            target: [{ targetWrapper: updated }]
        });
        expect(result.target[0].targetWrapper).toBe(updated);
    });
});