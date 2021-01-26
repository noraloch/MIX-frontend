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
  const menuDiv = document.createElement('div')
  cocktailCardDiv.append(menuDiv)
  categoriesArray.forEach(category =>{
    menuDiv.innerHTML += `
      <a class="item active">${category.name}</a>
    `
  })
}

const renderCocktail = (cocktail) => {
  cocktailCardDiv.innerHTML+=
   `
  <div class="ui card">
  <div class="image">
    <img src=${cocktail.image}>
  </div>
  <div class="content">
    <a class="header">${cocktail.name}</a>
    <div class="meta">
      <span class="date">${cocktail.recipe}</span>
    </div>
    <div class="description">
      ${cocktail.reviews.map((review) => renderReview(review))}
    </div>
  </div>
  <div class="extra content">
    <a>
      <i class="user icon"></i>
      Average Rating: ${calculateAverage(cocktail)}
    </a>
  </div>
</div>
`  
};

const calculateAverage = (cocktail) => {
  ratingsArray = cocktail.reviews.map((review) => review.rating);
  ratingsSum = ratingsArray.reduce((a, b) => a + b, 0);
  ratingsAve = ratingsSum / ratingsArray.length;
  return renderAve(ratingsAve);
};

const renderAve = (ratingsAve) => {
  return `
  <div class="ratings-average">${ratingsAve}</div>
  `
  //star rating possible solution to use later
  // for (let i=1; i<ratingsAve; i++) {
  //   const starDiv = document.createElement("div");
  //   starDiv.className = "star" //add CSS overflow:hidden for half stars, display: inline-block to show horizontal
  //   starDiv.innerHTML += "&starf;";
  //   cocktailCardDiv.append(starDiv);
  // }
};

const renderReview = (review) => {
  return `
    <div class="rating">${review.rating}</div>
    <div class="review">${review.review_text}</div>
  `
};



// function calls
getTastes()
