new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
}).then(function (result) {
    console.log(result);//1

   return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000) 
   })
}).then((result) => {
    console.log(result);//2

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(result * 2)
        }, 1000);
    })
}).then((result) => {
    console.log(result); // 4
})

// 返回promise 时我们能够构建异步行为链。

function loadJson(url) {
    return fetch(url).then(response => response.json());
}

function loadGithubUser(name) {
    return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
    return new Promise(function (resolve, reject) {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);
    
        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
    })
}