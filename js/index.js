let left = document.querySelector(".left");
let right = document.querySelector(".right");
let btn = document.getElementById("open");
let home = document.querySelector(".data-container .row")
let load = document.querySelector(".load")
let sideBar = document.getElementById("sidebar")
let lis = document.querySelectorAll("li")

btn.addEventListener("click", openAndClose);



function openAndClose() {
left.classList.toggle("close");
right.classList.toggle("close");
sideBar.classList.toggle("close");
document.querySelector(".open-close .open").classList.toggle("none")
document.querySelector(".open-close .close").classList.toggle("block")
lis.forEach((ele) => {
    ele.onclick = openAndClose
    ele.classList.toggle("open")
    
})
}

// home Page
fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
.then((res) => {
    let newData = res.json();
    return newData;
})
.then((newData) => {
    let data = newData.meals;
    let allData = ``
    for(let i = 0; i < data.length; i++) {
        allData += `
            <div class="box col-lg-3 col-sm-12">
                <img src="${data[i].strMealThumb}">
                <span class="hover">${data[i].strMeal}</span>
            </div>
        `
    }
    home.innerHTML = allData
    if(allData !== ``) {
        load.style.display = "none"
    }
})

// details page
fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=").then ((res) => {
    let data = res.json()
    return data
}).then ((data) => {
    data.meals.map((ele) => {
        let detailsPage = ``
        document.addEventListener("click" , function (e) {
            if(e.target.innerHTML === ele.strMeal){ 
                detailsPage += `
                    <div class="details">
                        <div class="image">
                            <img src="${ele.strMealThumb}">
                            <p>${ele.strMeal}</p>
                        </div>
                        <div class="desc">
                            <h2>Instructions</h2>
                            <span>
                                ${ele.strInstructions}
                            </span>
                            <p>Area : ${ele.strArea}</p> 
                            <p>Category : ${ele.strCategory}</p>
                            <p>Recipes :
                                <ul>
                                </ul>
                            </p>
                            <p>Tags : 
                            </p>
                            <a class="btn btn-success" href="${ele.strSource}" target="_blank">Source</a>
                            <a class="btn btn-danger" href="${ele.strYoutube}" target="_blank">Youtube</a>
                        </div>
                    </div>
                `
                home.innerHTML = detailsPage
            }
        })
    })
})

//Category Page 
let category = document.getElementById("category")
function categories() {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => {
    let newData = res.json()
    return newData
}).then((newData) => {
    let data = newData.categories
    let categoriesData = ``
    for(let i = 0; i < data.length; i++) {
        categoriesData += `
        <div class="box col-lg-3 col-sm-12">
            <img src="${data[i].strCategoryThumb}">
            <div class="info text-center">
                <span class="d-block fw-bold">${data[i].strCategory}</span>
                <span>${data[i].strCategoryDescription.slice(0, 200)}</span>
            </div>
        </div>
        `

    }
    load.style.display = "block"
    home.innerHTML = categoriesData;
    if(categoriesData !== ``) {
        load.style.display = "none"
    }
})
}
category.addEventListener("click", function () {
    load.style.display = "block"
    categories()
})
//Area Page 
let Area = document.getElementById("area")
function area () {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list").then((res) => {
        let newData = res.json()
        return newData
    }).then ((newData) => {
        let data = newData.meals
        let areaPage = ``
        for(let i = 0; i < data.length; i++) {
            areaPage += `
            <div class=" box col-lg-3 col-sm-12 text-white">
            <i class="fa-solid fa-house-laptop fa-4x"></i>    
            <span class="d-block fs-5 fw-bold  ">${data[i].strArea}</span>
            </div>
            `
        }
        home.innerHTML = areaPage;
        load.style.display = "block"
        if(areaPage !== ``) {
            load.style.display = "none"
        }
    })
}
Area.addEventListener("click", function () {
    load.style.display = "block"
    area()
})

// Ingredients Page
let Ingredients = document.getElementById("ingredients");
function ingredients () {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list").then ((res) => {
        let newData = res.json()
        return newData
    }).then((newData) => {
        let data = newData.meals
        let ingredientsPage = ``
        for(let i = 0; i < 20; i++) {
            ingredientsPage += `
            <div class=" box col-lg-3 col-sm-12 text-white">
                <div class="text-center">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i> 
                    <h2>${data[i].strIngredient}</h2>
                    <p>${data[i].strDescription.slice(0, 200)}</p>
                </div>   
            </div>
            `
        }
        load.style.display = "block"
        home.innerHTML = ingredientsPage;
        if(ingredientsPage !== ``) {
            load.style.display = "none"
        }
    })
}
Ingredients.addEventListener("click", function () {
    load.style.display = "block"
    ingredients()
})

// Search Page 

let Search = document.getElementById("search");
function search () {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=").then((res) => {
        let newData = res.json()
        return newData
    }).then((newData) => {
        let data = newData.meals
        let searchPage  = ``
        let searchOne = document.getElementById("name")
        let searchTwo = document.getElementById("f-letter")
        searchOne.addEventListener("change", function () {
            console.log(searchOne.value)
            for(let i = 0; i < data.length; i++) {
                searchPage += `
                <div class="box col-lg-3 col-sm-12">
                    <span class="a">${data[i].strMeal.includes(searchOne.value)}</span>
                </div>
                `
            }
            home.innerHTML = searchPage
            if(searchPage !== ``) {
                load.style.display = "none"
            }
        })

    })
}

Search.addEventListener("click", function () {
    document.querySelector(".search").style.display = "block"
    // load.style.display = "block"
    search()
})

// contact Page 

let contact = document.getElementById("contact")
let contactPage = `
    <div class="contact vh-100 d-flex align-items-center justify-content-center">
    <div class=" col-lg-8 d-flex flex-wrap ">
    <input class="me-3 p-2 rounded-3 mb-4 w-40" type="text" placeholder="Enter Your Name" required>
    <input class="ms-3 p-2 rounded-3 mb-4 w-40" type="email" placeholder="Enter Your Email" required>
    <input class="me-3 p-2 rounded-3 mb-4 w-40" type="tel" placeholder="Enter Your phone" required>
    <input class="ms-3 p-2 rounded-3 mb-4 w-40" type="number" placeholder="Enter Your Age" required>
    <input class="me-3 p-2 rounded-3 mb-4 w-40" type="password" placeholder="Enter Your password" required>
    <input class="ms-3 p-2 rounded-3 mb-4 w-40" type="password" placeholder="Enter Your Re-password" required>
    <button class="m-auto px-3 py-2 rounded-3 bg-black text-danger border-danger fs-5">
        Submit
    </button>
</div>
    </div>
`
contact.addEventListener("click", function(e) {
    home.innerHTML = contactPage
})

function returnHome(e) {
    e.target.onclick = function () {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then((res) => {
        let newData = res.json();
        return newData;
})
.then((newData) => {
    let data = newData.meals;
    let allData = ``
    for(let i = 0; i < data.length; i++) {
        allData += `
            <div class="box col-lg-3 col-sm-12">
                <img src="${data[i].strMealThumb}">
                <span class="hover">${data[i].strMeal}</span>
            </div>
        `
    }
    home.innerHTML = allData
    if(allData !== ``) {
        load.style.display = "none"
    }
})
}
}




