async function delay() {
    let promise  = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done"), 1000);
    })

    let result = await promise;

    console.log("result--", result)
}

delay();

let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done!'), 1000);
})

promise.finally(() => console.log("先触发")).then(result => console.log(result), error => console.log(error)); // 代码会自动执行。

// new Promise((resolve, reject) => {
//     throw new Error('error');
// })
// .finally(() => { throw new Error('finally')}) // 当finally 抛出error 时，执行将转到最近的error 的处理程序。
// .catch(error => console.log(error));


function loadScript(src) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));

        document.head.append(script);
    })
}

let scriptPromise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

scriptPromise.then(
    script => console.log(`${script.src} is loaded`),
    error => console.log(`Error: ${error.message}`)
)

scriptPromise.then(script => alert('Another handler...'));