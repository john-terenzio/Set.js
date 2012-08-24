describe('Set(initial)', function() {
    it('should init with one or more arguments of any type except undefined', function() {

        // should add any value except undefined, iterables are taken apart
        var o = {test: 'yes'};
        var s1 = new Set([1, 2, 3], 4, true, false, null, o, undefined);
        expect(s1.size()).toBe(8);

        // should work with another set, since it's an iterable
        var s2 = new Set(1, s1);
        expect(s1.equals(s2)).toBe(true);
        expect(s1).not.toBe(s2);

    });
});

describe('Set.prototype.size()', function() {
    it('should return the cardinality of the set', function() {

        // should return the size
        var s1 = new Set([1, 2, 3], {test: 'yes'});
        var s2 = new Set();
        expect(s1.size()).toBe(4);
        expect(s2.size()).toBe(0);

        // make sure duplicates are not added
        var s1 = new Set([1, 2, 3], {test: 'yes'}, 3, 2, 1);
        var s2 = new Set();
        expect(s1.size()).toBe(4);
        expect(s2.size()).toBe(0);

    });
});

describe('Set.prototype.contains(value)', function() {
    it('should return true if the value is a member of the set', function() {

        // test all types
        var o = {test: 'yes'};
        var s1 = new Set([1, 2, o, false], true, null);
        expect(s1.contains(1)).toBe(true);
        expect(s1.contains(o)).toBe(true);
        expect(s1.contains(false)).toBe(true);
        expect(s1.contains(true)).toBe(true);
        expect(s1.contains(null)).toBe(true);
        expect(s1.contains(3)).toBe(false);
        expect(s1.contains()).toBe(false);

    });
});

describe('Set.prototype.add(value)', function() {
    it('should add the value to the set as-is (won\'t iterate)', function() {

        // test adding different types
        var s1 = new Set();
        s1.add(3);
        expect(s1.size()).toBe(1);
        expect(s1.equals(3)).toBe(true);
        s1.add([1, 2, 3]); // add array as-is
        expect(s1.equals([1, 2, 3])).toBe(false);

        // sets are added as-is
        var s2 = new Set();
        s2.add(s1);
        expect(s1.equals(s2)).toBe(false);
        expect(s2.contains(s1)).toBe(true);

    });
});

describe('Set.prototype.remove(value)', function() {
    it('should remove the value from the set', function() {

        // test primatives
        var s1 = new Set([1, 2, 3]);
        s1.remove(2);
        expect(s1.equals([1, 3])).toBe(true);

        // test reference values
        var o = {test: 'yes'};
        var s1 = new Set([1, 2, o]);
        s1.remove(o);
        expect(s1.equals([1, 2])).toBe(true);

        // fail silenty if nothing happened
        var s1 = new Set([1, 2, 3]);
        s1.remove(4);
        expect(s1.equals([1, 2, 3])).toBe(true);

    });
});

describe('Set.prototype.equals(other)', function() {
    it('should return true if the set has the exact same members as other (any type)', function() {

        // should work with empty sets
        var s1 = new Set();
        var s2 = new Set();
        expect(s1.equals(s2)).toBe(true);

        // should work with primatives
        var s1 = new Set([1, 2, 3]);
        var s2 = new Set([3, 2, 1]);
        var s3 = new Set(['a', {}, 2]);
        var s4 = new Set(4);
        var s5 = new Set();
        expect(s1.equals(s2)).toBe(true);
        expect(s2.equals(s3)).toBe(false);
        expect(s3.equals(s4)).toBe(false);
        expect(s4.equals(4)).toBe(true);
        expect(s5.equals(4)).toBe(false);

        // should work with reference values
        var o = {test: 'yes'};
        var s1 = new Set([1, 2, 3, o]);
        var s2 = new Set([3, 2, 1, o]);
        expect(s1.equals(s2)).toBe(true);

        // should work with sets and arrays
        var s1 = new Set([1, 2, 3]);
        var s2 = [3, 2, 1];
        expect(s1.equals(s2)).toBe(true);

    });
});

describe('Set.prototype.update(other)', function() {
    it('should update the set with members from other', function() {

        // test arrays
        var s1 = new Set([1, 2, 3]);
        s1.update([1, 2, 3, 4, 5, 6]);
        expect(s1.equals([1, 2, 3, 4, 5, 6])).toBe(true);
        expect(s1.size()).toBe(6);

        // test sets
        var s1 = new Set([1, 2, 3]);
        var s2 = new Set([4, 5, 6]);
        s1.update(s2);
        expect(s1.equals([1, 2, 3, 4, 5, 6])).toBe(true);
        expect(s1.size()).toBe(6);

        // test primatives
        var s1 = new Set([1, 2, 3]);
        s1.update(3, 4);
        expect(s1.equals([1, 2, 3, 4])).toBe(true);

        // undefined should not go in
        var s1 = new Set([1, 2, 3]);
        s1.update();
        expect(s1.equals([1, 2, 3])).toBe(true);

        // null and false should go in
        var s1 = new Set([1, 2, 3]);
        s1.update(null, false);
        expect(s1.equals([1, 2, 3, null, false])).toBe(true);

        // objects should go in
        var o = {test: 'yes'};
        var s1 = new Set([1, 2, 3]);
        s1.update(o);
        expect(s1.equals([o, 1, 2, 3])).toBe(true);

        // duplication should never happen
        var o = {test: 'yes'};
        var s1 = new Set([1, 2, 3, o, 1, 2, 3, o]);
        s1.update(o);
        expect(s1.equals([o, 3, 2, 1])).toBe(true);

    });
});

describe('Set.prototype.clear()', function() {
    it('should empty the set', function() {

        var s1 = new Set([1, 2, 3]);
        var s2 = new Set();
        s1.clear();
        expect(s1.size()).toBe(0);
        expect(s1.equals(s2)).toBe(true);

    });
});

describe('Set.prototype.copy()', function() {
    it('should return a new set with the same members as the set', function() {

        var s1 = new Set([1, 2, 3]);
        var s2 = s1.copy();
        expect(s1).not.toBe(s2);
        expect(s1.equals(s2)).toBe(true);

    });
});

describe('Set.prototype.union(other)', function() {
    it('should return a new set with members from the set and other', function() {

        var s1 = new Set([1, 2, 3]);
        var s2 = new Set([3, 4, 5]);
        var s3 = s1.union(s2);
        var s4 = s3.union(7);
        expect(s3).not.toBe(s1);
        expect(s3).not.toBe(s2);
        expect(s3.equals([1, 2, 3, 4, 5])).toBe(true);
        expect(s4.equals([1, 2, 3, 4, 5, 7])).toBe(true);

    });
});

describe('Set.prototype.intersection(other)', function() {
    it('should return a new set with memebers common to the set and other', function() {

        // test primatives
        var s1 = new Set([1, 2, 3]);
        var s2 = new Set([3, 4, 5]);
        var s3 = s1.intersection(s2);
        expect(s3).not.toBe(s1);
        expect(s3).not.toBe(s2);
        expect(s3.equals([3])).toBe(true);

        // test reference values
        var o = {test: 'yes'};
        var s1 = new Set([1, 2, 3, o]);
        var s2 = new Set([3, 4, 5, o]);
        var s3 = s1.intersection(s2);
        expect(s3).not.toBe(s1);
        expect(s3).not.toBe(s2);
        expect(s3.equals([3, o])).toBe(true);

    });
});

describe('Set.prototype.difference(other)', function() {
    it('should return a new set with members in the set that are not in other', function() {

        var s1 = new Set([1, 2, 3]);
        var s2 = new Set([3, 4, 5]);
        var s3 = s1.difference(s2);
        expect(s3).not.toBe(s1);
        expect(s3).not.toBe(s2);
        expect(s3.equals([1, 2])).toBe(true);
        expect(s3.equals(6)).toBe(false);

    });
});

describe('Set.prototype.complement(other)', function() {
    it('should return a new set with members in other that are not in the set', function() {

        var s1 = new Set([1, 2, 3]);
        var s2 = new Set([3, 4, 5]);
        var s3 = s1.complement(s2);
        expect(s3).not.toBe(s1);
        expect(s3).not.toBe(s2);
        expect(s3.equals([4, 5])).toBe(true);
        expect(s3.equals(6)).toBe(false);

    });
});

describe('Set.prototype.symmetricDifference(other)', function() {
    it('should return a new set with memebers in either the set or other but not both', function() {

        var s1 = new Set([1, 2, 3]);
        var s2 = new Set([3, 4, 5]);
        var s3 = s1.symmetricDifference(s2);
        expect(s3).not.toBe(s1);
        expect(s3).not.toBe(s2);
        expect(s3.equals([1, 2, 4, 5])).toBe(true);
        expect(s3.equals(6)).toBe(false);

    });
});

describe('Set.prototype.isEmpty()', function() {
    it('should return true if the set has no members', function() {

        var s1 = new Set([1, 2, 3]);
        var s2 = new Set();
        expect(s1.isEmpty()).toBe(false);
        expect(s2.isEmpty()).toBe(true);

    });
});

describe('Set.prototype.isDisjoint(other)', function() {
    it('should return true if the set has no members in common with other', function() {

        var s1 = new Set([1, 2, 3]);
        var s2 = new Set([3, 4, 5]);
        var s3 = new Set([6, 7, 8]);
        expect(s1.isDisjoint(s2)).toBe(false);
        expect(s2.isDisjoint(s3)).toBe(true);
        expect(s2.isDisjoint(9)).toBe(true);

    });
});

describe('Set.prototype.isSubset(other)', function() {
    it('should return true if every member of the set is also a member of other', function() {

        var s1 = new Set([1, 2, 3, 4]);
        var s2 = new Set([1, 2, 3, 4]);
        var s3 = new Set([1, 2]);
        expect(s1.isSubset(s2)).toBe(true);
        expect(s2.isSubset(s1)).toBe(true);
        expect(s1.isSubset(s3)).toBe(false);
        expect(s3.isSubset(s2)).toBe(true);

    });
});

describe('Set.prototype.isProperSubset(other)', function() {
    it('should return true if every member of the set is also a member of other and the set does not equal other', function() {

        var s1 = new Set([1, 2, 3, 4]);
        var s2 = new Set([1, 2, 3, 4]);
        var s3 = new Set([1, 2]);
        expect(s1.isProperSubset(s2)).toBe(false);
        expect(s2.isProperSubset(s1)).toBe(false);
        expect(s1.isProperSubset(s3)).toBe(false);
        expect(s3.isProperSubset(s2)).toBe(true);

    });
});

describe('Set.prototype.isSuperset(other)', function() {
    it('should return true if every member of other is also a member of the set', function() {

        var s1 = new Set([1, 2, 3, 4]);
        var s2 = new Set([1, 2, 3, 4]);
        var s3 = new Set([1, 2]);
        expect(s1.isSuperset(s2)).toBe(true);
        expect(s2.isSuperset(s1)).toBe(true);
        expect(s1.isSuperset(s3)).toBe(true);
        expect(s3.isSuperset(s2)).toBe(false);

    });
});

describe('Set.prototype.isProperSuperset(other)', function() {
    it('should return true if every member of other is also a member of the set and the set does not equal other', function() {

        var s1 = new Set([1, 2, 3, 4]);
        var s2 = new Set([1, 2, 3, 4]);
        var s3 = new Set([1, 2]);
        expect(s1.isProperSuperset(s2)).toBe(false);
        expect(s2.isProperSuperset(s1)).toBe(false);
        expect(s1.isProperSuperset(s3)).toBe(true);
        expect(s3.isProperSuperset(s2)).toBe(false);

    });
});

describe('Set.prototype.forEach(fn)', function() {
    it('should iterate over the members of the set', function() {

        var s1 = new Set(1, 2, 3);
        s1.forEach(function(member, i, set) {
            expect(member).toBe(i + 1);
            expect(set).toBe(s1);
        });

    });
});

describe('Set.prototype.toArray()', function() {

    beforeEach(function() {
        this.addMatchers({
            toBeAnArray: function() {
                return Object.prototype.toString.call(this.actual) === '[object Array]';
            }
        });
    });

    it('should return an array of the sets members', function() {

        var s1 = new Set([1, 2, 3]);
        var s2 = new Set();
        expect(s1.toArray()).toBeAnArray();
        expect(s1.toArray().length).toBe(s1.size());
        expect(s1.toArray()[1]).toBe(2);
        expect(s2.toArray()).toBeAnArray();
        expect(s2.toArray().length).toBe(0);

    });

});

describe('Set.prototype.toString()', function() {
    it('should return a human-readable string representing the set', function() {

        var s1 = new Set([1, 2, 3, 'a', true, false, null]);
        var s2 = new Set();
        expect(s1.toString()).toBe('Set([1, 2, 3, "a", true, false, null])');
        expect(s2.toString()).toBe('Set([])');

    });
});

