Set.js
======

A small, fast implementation of sets in JavaScript.
---------------------------------------------------

Set.js defines a new class `Set` which implements unordered, mutable sets in
JavaScript. It can be used on the client or server side (ex. with Node.js).
Set.js is somewhat inspired by Python sets and implements much of the same
functionality. It is also backed by a full suite of tests using Jasmine.

Some Notes
----------

Set.js uses native JavaScript objects to store data. Since these are true
hash tables, performance is close to what you would expect from a native
implemenation. For example, testing membership is constant time.

In addition to primatives, Set.js supports adding objects to sets. Like always,
objects are treated as reference values, so if an object is in two sets, each
set is really holding a reference to the same object. One thing to note
regarding this is that objects are "scribbled on" when being added to a set. A
property called `"_hash"` is added to the object and contains an int serving as
a unique identifier for that object. This was done in lieu of implementing a
full on hash function for objects, which is non-trivial and would most likely
impact performance.

Overview of Methods
-------------------

### new Set(initial1, initial2, ..., initialN)

Instantiates a new instance of `Set` with some initial members. The contructor
can take any number of arugments. If an argument is an instance of `Set` or
`Array`, each member is added individually to the new set, otherwise the
argument is added as-is. Arguments can be of any type, including `object`.

### .length()

Returns the number of members in the set (the cardinality of the set).

### .contains(value)

Returns `true` if the set contains `value`, `false` otherwise. `value` is
treated as-is and not iterated on.

### .add(value)

Adds `value` to the set as-is. The value won't be iterated on even if it is
another instance of `Set` or `Array`. Returns the set.

### .remove(value)

Removes `value` from the set as-is. `value` is treated as-is and not iterated
on. Remove fails silenty and always returns the set.

### .equals(other)

Returns `true` if the set equals `other`, `false` otherwise. To be equal, the
set must contain the exact same members as `other`. If either set contains
objects, they will be compared by reference. `other` can be another set, an
array, an object, or primative (the latter two will be converted into a set
containing one member).

### .update(other1, other2, ..., otherN)

Adds values to a set. The same argument-parsing that applies to the contructor
applies to update (since it is called by the contructor). Returns the set.

### .clear()

Empties the set and returns it.

### .copy()

Returns a new set containing the same members as the current set.

### .union(other)

Returns a new set containing members of the current set and `other`.

### .intersection(other)

Returns a new set containing members that are common to the current set and
`other`.

### .difference(other)

Returns a new set containing members in the current set that are not in
`other`.

### .complement(other)

Returns a new set containing members that are in `other` but not in the
current set.

### .symmetricDifference(other)

Returns a new set containing members that are in either set but not in both.

### .isEmpty()

Returns `true` if the set has no members, `false` otherwise.

### .isDisjoint(other)

Returns `true` if the set has no members in common with other, `false`
otherwise.

### .isSubset(other)
Returns `true` if every member of the set is also a member of `other`,
`false` otherwise.

### .isProperSubset(other)
Returns `true` if every member of the set is also a member of `other` and
the set does not equal `other`, `false` otherwise.

### .isSuperset(other)

Returns `true` if every member of `other` is also a member of the set, `false`
otherwise.

### .isProperSuperset(other)

Returns `true` if every member of `other` is also a member of the set and the
set does not equal `other`, `false` otherwise.

### .forEach(fn, [context])

Executes a callback for each member of the set. An optional context may be
specified (the value of `this` in the callback). The callback will be passed
three arguments: the member, the current "index" starting at 0, a reference to
the set. Returns `undefined`.

### .toArray()

Returns an array containing the members of the set. No specific order is
guaranteed.

### .toString()

Returns a string representing the set.
