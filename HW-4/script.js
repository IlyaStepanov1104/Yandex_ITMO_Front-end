// 1
const getNewObjWithPrototype = (obj) => {
    return {
        __proto__: obj,
    }
}

// 2
const getEmptyObj = () => {
    return Object.create(null);
}

// 3
const setPrototypeChain = ({ programmer, student, teacher, person }) => {
    teacher.__proto__ = person;
    student.__proto__ = teacher;
    programmer.__proto__ = student;
}

// 4
const getObjWithEnumerableProperty = () => {
    const obj = {
        name: 'Alex',
        age: 18,
        work: 'empty',
    };
    Object.defineProperties(obj, {
        'age': { enumerable: true },
        'name': { enumerable: false },
        'work': { enumerable: false },
    });
    return obj;
}

// 5
const getWelcomeObject = (person) => {
    return {
        voice: () => {return "Hello, my name is " +  person.name + ". I am " + person.age + "."},
        __proto__: person,
    }
}

// 6
class Singleton {
    constructor(id) {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        this.id = id;
        Singleton.instance = this;
    }
}

// 7
const defineTimes = () => {
    Number.prototype.times = function (callback) {
        for (let i = 1; i <= this; i++) {
            callback(i, this);
        }
    };
}

// 8
const defineUniq = () => {
    Object.defineProperty(Array.prototype, 'uniq', {
        get: function (){
            return [...new Set(this)];
        }
    })
}

// 9
const defineUniqSelf = () => {
    Object.defineProperty(Array.prototype, 'uniqSelf', {
        get: function (){
            this.length = 0;
            this.push(...new Set(this));
            return this;
        }
    })
}

module.exports = {
    getNewObjWithPrototype,
    getEmptyObj,
    setPrototypeChain,
    getObjWithEnumerableProperty,
    getWelcomeObject,
    Singleton,
    defineTimes,
    defineUniq,
    defineUniqSelf,
}