// ******************* Dom Elements *****************
const cocktailCardDiv = document.querySelector(".cocktail-cards")
const  verticalMenuDiv = document.querySelector(".ui vertical fluid tabular menu")
// ******************* Network Requests *****************
const getCocktails = () => {
    return fetch("http://localhost:3000/cocktails").then((response) => 
    response.json()
    ); 
  }; 

const getAndRenderCocktails = () => {
  getCocktails().then((cocktailData) => {
    cocktailData.forEach((cocktail) => renderCocktail(cocktail)); 
    }); 
  }; 

getAndRenderCocktails(); 


const getTastes = () => {
  fetch("http://localhost:3000/cocktails")
  .then(res => res.json())
  .then(showSideBar)
}
// ******************* Events Listeners *****************

// ******************* Dom Manipulation / functions *****************


const renderCocktail = (cocktail) => {
  const cocktailNameP = document.createElement("p")
  const cocktailImage = document.createElement("img")
  const cocktailRecipe = document.createElement("p")
  cocktailNameP.textContent = cocktail.name
  cocktailImage.src = cocktail.image
  cocktailRecipe.textContent = cocktail.recipe
  cocktailCardDiv.append(cocktailNameP, cocktailImage, cocktailRecipe)
}

const showSideBar= (categoriesArray) => {
  categoriesArray.forEach(category =>{
    verticalMenuDiv.innerHTML += `
      <a class="item active">${category.name}</a>
    `
  })
}
