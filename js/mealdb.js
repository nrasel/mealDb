const searchFood = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    console.log(searchText);
    searchField.value = ''

    if(searchText==''){
        document.getElementById('search-result').innerHTML=`
        <h1 class="text-center mt-4 text-danger"> please write something</h1>
        `
    }
    else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        // console.log(url);
    
        fetch(url)
            .then(response => response.json())
            .then(data => displayFood(data.meals,searchText))
    }

   
}

const displayFood = (meals,searchText) => {
    // console.log(meals);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = ''
    if (meals== null) {
         searchResult.innerHTML=`
        <h3 class="text-center mt-5 text-danger">${searchText} is Not Found</h3>
        ` 
    }
    else{
        for (const meal of meals) {
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
                <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                    </div>
                </div>
            `
            searchResult.appendChild(div)
        }
    }
    }
   

const loadMealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => displayMealDeatails(data.meals[0]))
}

const displayMealDeatails = meal => {
    const mealDetails = document.getElementById('meal-details')
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            <a href="${meal.strYoutube} class="btn btn-primary">Go Some Where </a>
            </div>
    `
    mealDetails.appendChild(div)

}


