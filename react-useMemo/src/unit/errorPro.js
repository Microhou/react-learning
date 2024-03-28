new Promise((resolve, reject) => {
    throw new Error("Whoops!");
}).catch(function (error) {
    console.log("The error is handled, continue normally");
}).then(() => console.log("Next successful handler runs"))