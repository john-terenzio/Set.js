(function(global, undefined) {

    'use strict';

    var

    objectId = 1000000,

    getHash = function(value) {
        if (typeof value === 'number' || typeof value === 'boolean') {
            return value;
        } else if (typeof value === 'string') {
            return '"' + value + '"';
        } else if (value === undefined) {
            return 'undefined';
        } else if (value === null) {
            return 'null';
        } else {
            value._hash = value._hash || ('[object ' + (objectId++) + ']');
            return value._hash;
        }
    },

    Set = function(/* values */) {
        this._members = {};
        this._length = 0;
        this.update.apply(this, arguments);
    };

    Set.prototype.length = function() {
        return this._length;
    };

    Set.prototype.contains = function(value) {
        return this._members.hasOwnProperty(getHash(value));
    };

    Set.prototype.add = function(value) {
        if (value !== undefined) {
            var hash = getHash(value);
            if (!this._members.hasOwnProperty(hash)) {
                this._members[hash] = value;
                ++this._length;
            }
        }
        return this;
    };

    Set.prototype.remove = function(value) {
        if (value !== undefined) {
            var hash = getHash(value);
            if (this._members.hasOwnProperty(hash)) {
                delete this._members[hash];
                --this._length;
            }
        }
        return this;
    };

    Set.prototype.pop = function() {
        var i, value;
        for (i in this._members) {
            if (this._members.hasOwnProperty(i)) {
                value = this._members[i];
                this.remove(value);
                return value;
            }
        }
    };

    Set.prototype.clear = function() {
        this._members = {};
        this._length = 0;
        return this;
    };

    Set.prototype.copy = function() {
        var i, copy = new Set();
        for (i in this._members) {
            if (this._members.hasOwnProperty(i)) {
                copy._members[i] = this._members[i];
                ++copy._length;
            }
        }
        return copy;
    };

    Set.prototype.update = function(/* values */) {
        var i, j;
        for (i = 0; i < arguments.length; ++i) {
            if (arguments[i] instanceof Set) {
                for (j in arguments[i]._members) {
                    if (arguments[i]._members.hasOwnProperty(j) && !this._members.hasOwnProperty(j)) {
                        this._members[j] = arguments[i]._members[j]
                        ++this._length;
                    }
                }
            } else if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
                for (j = 0; j < arguments[i].length; ++j) {
                    this.add(arguments[i][j]);
                }
            } else {
                this.add(arguments[i]);
            }
        }
        return this;
    };

    Set.prototype.equals = function(other) {
        var i;
        if (!(other instanceof Set)) {
            other = new Set(other);
        }
        if (this._length !== other._length) {
            return false;
        }
        for (i in this._members) {
            if (this._members.hasOwnProperty(i) && !other._members.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    };

    Set.prototype.union = function(other) {
        var i, union = this.copy();
        if (!(other instanceof Set)) {
            other = new Set(other);
        }
        for (i in other._members) {
            if (other._members.hasOwnProperty(i) && !union._members.hasOwnProperty(i)) {
                union._members[i] = other._members[i];
                ++union._length;
            }
        }
        return union;
    };

    Set.prototype.intersection = function(other) {
        var i, intersection = new Set();
        if (!(other instanceof Set)) {
            other = new Set(other);
        }
        for (i in this._members) {
            if (this._members.hasOwnProperty(i) && other._members.hasOwnProperty(i)) {
                intersection._members[i] = this._members[i];
                ++intersection._length;
            }
        }
        return intersection;
    };

    Set.prototype.difference = function(other) {
        var i, difference = new Set();
        if (!(other instanceof Set)) {
            other = new Set(other);
        }
        for (i in this._members) {
            if (this._members.hasOwnProperty(i) && !other._members.hasOwnProperty(i)) {
                difference._members[i] = this._members[i];
                ++difference._length;
            }
        }
        return difference;
    };

    Set.prototype.complement = function(other) {
        var i, complement = new Set();
        if (!(other instanceof Set)) {
            other = new Set(other);
        }
        for (i in other._members) {
            if (!this._members.hasOwnProperty(i) && other._members.hasOwnProperty(i)) {
                complement._members[i] = other._members[i];
                ++complement._length;
            }
        }
        return complement;
    };

    Set.prototype.symmetricDifference = function(other) {
        if (!(other instanceof Set)) {
            other = new Set(other);
        }
        return this.union(other).difference(this.intersection(other));
    };

    Set.prototype.isEmpty = function() {
        return this._length === 0;
    };

    Set.prototype.isDisjoint = function(other) {
        return this.intersection(other)._length === 0;
    };

    Set.prototype.isSubset = function(other) {
        return this.union(other)._length === other._length;
    };

    Set.prototype.isProperSubset = function(other) {
        return this._length < other._length && this.isSubset(other);
    };

    Set.prototype.isSuperset = function(other) {
        return this._length === this.union(other)._length;
    };

    Set.prototype.isProperSuperset = function(other) {
        return other._length < this._length && this.isSuperset(other);
    };

    Set.prototype.forEach = function(fn, context) {
        var i, n = 0;
        for (i in this._members) {
            if (this._members.hasOwnProperty(i)) {
                fn.call(context, this._members[i], n++, this);
            }
        }
    };

    Set.prototype.toArray = function() {
        var i, members = [];
        for (i in this._members) {
            if (this._members.hasOwnProperty(i)) {
                members.push(this._members[i]);
            }
        }
        return members;
    };

    Set.prototype.toString = function() {
        var i, members = [];
        for (i in this._members) {
            if (this._members.hasOwnProperty(i)) {
                members.push(i);
            }
        }
        return 'Set([' + members.join(', ') + '])';
    };

    global.Set = Set;

}(this));
