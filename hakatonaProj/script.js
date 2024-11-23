
// šitais ie recepšu lists
const recipes = [
    {
        name: "Carbonara",
        image: "carbonara.webp",
        ingredients: ["egg", "bacon", "parmesan", "spaghetti"],
        vegan: false,
        vegeterian: true,
        description: "1. Boil the spaghetti. 2. Fry bacon. 3. Mix eggs with parmesan. 4. Combine everything and serve."
    },
    {
        name: "Chilli con carne",
        image: "chilli.jfif",
        ingredients: ["beef", "tomato", "beans", "chilli"],
        vegan: false,
        vegeterian: false,
        description: "1. Brown the beef. 2. Add tomatoes, beans, and chilli. 3. Simmer for 30 minutes and serve hot."
    },
    {
        name: "Chicken Curry",
        image: "chicken_curry.jpg",
        ingredients: ["chicken", "curry powder", "coconut milk", "onion"],
        vegan: false,
        vegetarian : false,
        description: "test"
    },
    {
        name: "Stuffed Peppers",
        image: "filled_pepper.jfif",
        ingredients: ["pepper", "rice", "cheese", "tomato"],
        vegan: false,
        vegetarian : true,
        description: "test"
    }
];

let ingredients = []; // šitajā masīvā ies visi ingredients ko tu rakstīsi

function addIngredient() { // funkicja kas addo sastāvdaļas masīvā
    const input = document.getElementById('ingredient-input');
    const ingredient = input.value.trim().toLowerCase();
    if (ingredient && !ingredients.includes(ingredient)) {
        ingredients.push(ingredient);
        displayIngredients();
    }
    input.value = '';
}

function displayIngredients() { // funkcija kas rāda sastāvdaļas kuras tu esi addojis
    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = '';
    ingredients.forEach((ingredient, index) => {
        const span = document.createElement('span');
        span.textContent = ingredient;
        span.title = "Click to remove";
        span.style.cursor = "pointer";
        span.onclick = () => removeIngredient(index);
        ingredientsList.appendChild(span);
    });
}

function removeIngredient(index) { // funkcija kas noņem sastāvdaļu kad tu noklikšķini uz viņa
    ingredients.splice(index, 1);
    displayIngredients();
}

function findRecipes() { // funkicja kas sameklē recepti ar kādu no tām sastāvdaļam ko tu esi pielicis
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = ''; // Clear previous results

    const matchingRecipes = recipes.filter(recipe =>
        recipe.ingredients.some(ingredient => ingredients.includes(ingredient))
    );

    if (matchingRecipes.length > 0) {
        matchingRecipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            // paskatās vai ir vegan, vai vegetarian
            let labels = '';
            if (recipe.vegan) {
                labels += '<span style="color: green; font-weight: bold; margin-right: 10px;">Vegan</span>';
            }
            if (recipe.vegetarian) {
                labels += '<span style="color: orange; font-weight: bold;">Vegetarian</span>';
            }

            //recepte
            recipeCard.innerHTML = `
                
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                ${labels ? `<p>${labels}</p>` : ''}
                <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
            `;
            
            recipeCard.classList.add('recipe-card');
            recipeCard.onclick = () => showRecipeDetails(recipe);
            recipesContainer.appendChild(recipeCard);
        });
    } else {
        recipesContainer.innerHTML = '<p>No recipes found. Try adding more ingredients!</p>';
    }
}

//Receptes instrulcijas
function showRecipeDetails(recipe) { 
    
    document.getElementById('modal-title').textContent = recipe.name;
    document.getElementById('modal-image').src = recipe.image;
    document.getElementById('modal-description').textContent = recipe.description;
    document.getElementById('modal-ingredients').textContent = `Ingredients: ${recipe.ingredients.join(', ')}`;

    const modal = document.getElementById('recipe-modal');
    modal.style.display = 'block';
}

//aiztaisīt receptes instrukcijas kad nospiež X
document.getElementById('close-modal').onclick = function () {
    document.getElementById('recipe-modal').style.display = 'none';
};

//aiztaisīt receptes instrukcijas kad nospiež kkur citur uz ekrāna
window.onclick = function (event) {
    const modal = document.getElementById('recipe-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};