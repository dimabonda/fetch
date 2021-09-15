const URL = 'https://randomuser.me/api/?results=10';
const btnUsers = document.querySelector('.btn-users');
const ul = document.querySelector('.users');
const pagesWrapper = document.querySelector('.pages-wrapper');
let selectedPage;
let indexPage = 1;
let subArray = [];

addUsers(URL, getAllUsers);
addPage(indexPage, 'div')
btnUsers.addEventListener('click', () => addUsers(URL, getAllUsers));

btnUsers.addEventListener('click', () => {
    indexPage++;
    addPage(indexPage ,'div');
})



pagesWrapper.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('page')) {
        showPage(target)
        hideUsers(subArray, target.innerHTML-1)
    }
})

function showPage(tar){
    if(selectedPage){
        selectedPage.classList.remove('page_active')
    }
    selectedPage = tar;
    selectedPage.classList.add('page_active')
}



function getAllUsers(){
    let allUsers = Array.from(document.querySelectorAll('ul.users > li'));
    slicedArray(allUsers);
}

function slicedArray(array){
    let size = 10;
    for(let i = 0; i < array.length/size; i++){
        subArray[i] = array.slice(i * size, (i * size) + size);
    }
    hideUsers(subArray, subArray.length-1);
}


function hideUsers (arr, numberPage){
    arr.forEach(element => {
        element.forEach(elem => {
            elem.style.display = 'none';
        });
    });
    arr[numberPage].forEach(element => {
        element.style.display = 'block'
    });
}

function addPage(number, elem){
    let div = createElement(elem);
    div.classList.add('page');
    div.innerHTML = number;
    addElement(pagesWrapper, div)
    showPage(div);
}

function createElement (element){
    return document.createElement(element)
}

function addElement(parent, elem){
    return parent.appendChild(elem);
}


function addUsers(url, callback){
    fetch(url)
    .then(response => response.json())
    .then(function (data) {
        let users = data.results;
        return users.map(function(user){
            let li = createElement('li');
            let img = createElement('img');
            let div = createElement('div');
            img.src = user.picture.medium;
            div.innerHTML = `${user.name.first} ${user.name.last}`
            addElement(ul, li);
            addElement(li, img);
            addElement(li, div);
        })
    })
    .then(() => {
        callback()
    })
}

    


//---------------with async await-----------------------

// async function getUsers(url){

//     const response = await fetch(url);
//     const data = await response.json();
//     let users = data.results;
//     users.map((user) => {
//         let li = createElement('li');
//         let img = createElement('img');
//         let div = createElement('div');
//         img.src = user.picture.medium;
//         div.innerHTML = `${user.name.first} ${user.name.last}`
//         addElement(ul, li);
//         addElement(li, img);
//         addElement(li, div);
//     })

// }

//*********************************************************************** */







