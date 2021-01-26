// ******************* Dom Elements *****************

const cocktailCardDiv = document.querySelector(".cocktail-cards");
const verticalMenuDiv = document.querySelector(".ui vertical fluid tabular menu")
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

// categories
const getTastes = () => {
  fetch("http://localhost:3000/categories")
  .then(res => res.json())
  .then(categoriesArray => showSideBar(categoriesArray))
}
// ******************* Events Listeners *****************

// ******************* Dom Manipulation / functions *****************

const showSideBar = (categoriesArray) => {
  // console.log(categoriesArray)
  const menuDiv = document.createElement('div')
  cocktailCardDiv.append(menuDiv)
  console.log(menuDiv)
  categoriesArray.forEach(category =>{
    menuDiv.innerHTML += `
      <a class="item active">${category.name}</a>
    `
  })
}
/* <div class="ui card">
  <div class="image">
    <img src=${cocktail.image}>
  </div>
  <div class="content">
    <a class="header">${cocktail.name}</a>
    <div class="meta">
      <span class="date">${cocktail.description}</span>
    </div>
    <div class="description">
      Reviews Loop
    </div>
  </div>
  <div class="extra content">
    <a>
      <i class="user icon"></i>
      ${ratingAve} Average
    </a>
  </div>
</div> */
const renderCocktail = (cocktail) => {
  const nameHeading = document.createElement("h2");
  const image = document.createElement("img");
  const recipeDiv = document.createElement("div");
  nameHeading.textContent = cocktail.name;
  image.src = cocktail.image;
  recipeDiv.textContent = cocktail.recipe;
  cocktailCardDiv.append(nameHeading, image, recipeDiv);

  calculateAverage(cocktail);

  cocktail.reviews.forEach((review) => renderReview(review));
};

const calculateAverage = (cocktail) => {
  ratingsArray = cocktail.reviews.map((review) => review.rating);
  ratingsSum = ratingsArray.reduce((a, b) => a + b, 0);
  ratingsAve = ratingsSum / ratingsArray.length;
  renderAve(ratingsAve);
};

const renderAve = (ratingsAve) => {
  const ratingsAveDiv = document.createElement("div");
  ratingsAveDiv.textContent = `Average Rating: ${ratingsAve}`;
  cocktailCardDiv.append(ratingsAveDiv);
  
  // for (let i=1; i<ratingsAve; i++) {
  //   const starDiv = document.createElement("div");
  //   starDiv.className = "star" //add CSS overflow:hidden for half stars, display: inline-block to show horizontal
  //   starDiv.innerHTML += "&starf;";
  //   cocktailCardDiv.append(starDiv);
  // }
};

const renderReview = (review) => {
  const ratingDiv = document.createElement("div");
  const reviewDiv = document.createElement("div");
  ratingDiv.textContent = review.rating;
  reviewDiv.textContent = review.review_text;
  cocktailCardDiv.append(ratingDiv, reviewDiv);
};



// function calls
getTastes()
