const func = ()=>{
    console.log("aaa")
}

func();

function debounce(fn, delay) {
    let timer = null;

    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}

function throttle(fn, delay) {
    let previous = 0;
    return function () {
        const now = Date.now();
        const context = this;
        const args = arguments;
        if(now - previous > delay){
            fn.apply(context, args);
            previous = now;
        }
    }
}

const cache = {};
let preValue;
const something = (value) => {
    // check whether the value has changed
    if (!cache.current || value !== preValue) {
        cache.current = () => {
            console.log(value);
        };
    }
    preValue = value;
    return cache.current;
};

const first = something('first');
const anotherFirst = something('first');
const second = something('third');

first();
second();
console.log(first === anotherFirst);