const cache = {};
let prevValue;

const something = (value) => {
    if(!cache.current || prevValue !== value){
        cache.current = () => {
            console.log(value);
        }
    }
    prevValue = value;
    return cache.current;
}

const first = something('first');
const anotherFirst = something('first');
const second = something('second');
const third = something('third');

first();
second();
third();
console.log(first === anotherFirst);