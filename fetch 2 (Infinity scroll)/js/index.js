const URL = 'https://randomuser.me/api/?results=10';
const btnUsers = document.querySelector('.btn-users');
const ul = document.querySelector('.users')

function createElement (element){
    return document.createElement(element)
}

function addElement(parent, elem){
    return parent.appendChild(elem);
}

// function getUsers(url){

//     return fetch(URL)
//     .then(response => response.json())
//     .then(function (data) {
//         let users = data.results;
//         return users.map(function(user){
//             let li = createElement('li');
//             let img = createElement('img');
//             let div = createElement('div');
//             img.src = user.picture.medium;
//             div.innerHTML = `${user.name.first} ${user.name.last}`
//             addElement(ul, li);
//             addElement(li, img);
//             addElement(li, div);
//         })
//     })

// }

//---------------with async await-----------------------

async function getUsers(url){

    const response = await fetch(url);
    const data = await response.json();
    let users = data.results;
    users.map((user) => {
        let li = createElement('li');
        let img = createElement('img');
        let div = createElement('div');
        img.src = user.picture.medium;
        div.innerHTML = `${user.name.first} ${user.name.last}`
        addElement(ul, li);
        addElement(li, img);
        addElement(li, div);
    })

}


//*********************************************************************** */


let timer;
function infinityScroll () {

    // console.log('количество скроллов')
    clearTimeout(timer);
    timer = setTimeout(() => {
        // console.log('количество таймеров')
        const offset = 500;
        const endOfDocument = document.body.offsetHeight - offset;
        const carrentScrollPosition = window.innerHeight + window.scrollY
        if(carrentScrollPosition > endOfDocument){
            getUsers(URL);
            // console.log('вызов')
        }
    },50)
}
getUsers(URL);
window.addEventListener('scroll', () => infinityScroll())


