// ******************* Dom Elements *****************
const cocktailCardDiv = document.querySelector(".cocktail-cards");
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

// ******************* Events Listeners *****************

// ******************* Dom Manipulation / functions *****************
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
