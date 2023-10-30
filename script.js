const fruitForm = document.querySelector("#inputSection form")
fruitForm.addEventListener("submit", extractFruit)

function extractFruit(e) {
    e.preventDefault()
    fetchFruitData(e.target[0].value)
    e.target[0].value = ""
}

function fetchFruitData(fruit){
    fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
        // .then(processResponse)
        .then(resp => resp.json())
        .then(data => addFruit(data))
        .catch(err => console.log(err))
}

function processResponse(resp) {
    console.log(resp, "hello")
    if(resp.ok){
        return resp.json()
    } else {
        throw "Error: http status code = " + resp.status
    }
}

const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

let calories = 0

function addFruit(fruit) {
    console.log(fruit)
    if(!fruit){
        console.log("Invalid fruit")
    } else {
    const li = document.createElement("li")
    li.addEventListener("click", removeFruit, {once:true})
    li.textContent = fruit['name']
    fruitList.appendChild(li)

    calories += fruit.nutritions.calories
    fruitNutrition.textContent = calories
    } 
}

function removeFruit(e){
    e.target.remove()
}


