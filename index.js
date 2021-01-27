// ******************* Dom Elements *****************

const cocktailCardDiv = document.querySelector(".cocktail-cards");
const verticalMenuDiv = Array.from(document.getElementsByClassName("ui vertical fluid tabular menu"))[0];
// ******************* Network Requests *****************
const getCocktails = () => {
  return fetch("http://localhost:3000/cocktails").then((response) =>
    response.json()
  );
};

let categories = [];
const getTastes = () => {
  fetch("http://localhost:3000/categories/")
    .then((res) => res.json())
    .then((categoriesArray) => {
      categories = categoriesArray;
      showSideBar(categoriesArray)
    });
};

getTastes();



// ******************* Dom Manipulation / functions *****************

const showSideBar = (categoriesArray) => {

  categoriesArray.forEach(category =>{
    // console.log(category.cocktails)
    verticalMenuDiv.innerHTML += `
      <a class="item" id=${category.id}>${category.name}</a>
    `
  })
}

function filterCocktails(e) {
  let categoryId = e.target.id;
  // console.log("categoryId", categoryId);
  let relevantCategory = categories.find(category => parseInt(category.id) === parseInt(categoryId));
  let categoryCocktails = relevantCategory.cocktails;

  Array.from(verticalMenuDiv.children).forEach(child => {
    child.className = "item"
  })

  e.target.className = "item active"
  // Clear cocktailCardDiv so it's fresh / empty
  cocktailCardDiv.innerHTML = "";

  // Populate cocktailCardDiv with all of the categoryCocktails

  // console.log("categoryCocktails", categoryCocktails);
  categoryCocktails.forEach(cocktail => {
    renderCocktail(cocktail)
  })

}
function showAll(e){
  if (e.target.id === "show-all-btn"){
    getAndRenderCocktails()
  } 
}


const renderCocktail = (cocktail) => {
  cocktailCardDiv.innerHTML += `
  <div class="ui card">
  <div class="image">
    <img src=${cocktail.image}>
  </div>
  <div class="content">
    <a class="header">${cocktail.name}</a>
    <div class="meta">
      <span class="date">${cocktail.recipe}</span>
    </div>
    <div class="description" id=reviews-${cocktail.id}>
      
    </div>
  </div>
  ${renderSeeReviewsButton(cocktail)}
  <br>
  ${renderAddReviewButton()}
</div>
`;

  setTimeout(() => {
    handleSeeReviewsEvent(cocktail);
  }, 1);
};

const getAndRenderCocktails = () => {
  getCocktails().then((cocktailData) => {
    cocktailData.forEach((cocktail) => renderCocktail(cocktail));
  });
};

getAndRenderCocktails();

const calculateAverage = (cocktail) => {
  ratingsArray = cocktail.reviews.map((review) => review.rating);
  ratingsSum = ratingsArray.reduce((a, b) => a + b, 0);
  ratingsAve = ratingsSum / ratingsArray.length;
  return renderAve(ratingsAve);
};

const renderAve = (ratingsAve) => {
  return `
  <div class="ratings-average">${ratingsAve}</div>
  `;
  //star rating possible solution to use later
  // for (let i=1; i<ratingsAve; i++) {
  //   const starDiv = document.createElement("div");
  //   starDiv.className = "star" //add CSS overflow:hidden for half stars, display: inline-block to show horizontal
  //   starDiv.innerHTML += "&starf;";
  //   cocktailCardDiv.append(starDiv);
  // }
};

const handleSeeReviewsEvent = (cocktail) => {
  const seeReviewsButton = document.querySelector(`#cocktail-${cocktail.id}`);
  const reviewsDiv = document.querySelector(`#reviews-${cocktail.id}`);
  seeReviewsButton.addEventListener("click", (event) => {
    reviewsDiv.innerHTML = ""
    reviewsDiv.innerHTML += `${cocktail.reviews.map((review) =>
      renderReview(review)
    )}`;
  });
};

const renderReview = (review) => {
  return `
    <div class="rating">${review.rating}</div>
    <div class="review">${review.review_text}</div>
  `;
};

const renderSeeReviewsButton = (cocktail) => {
  return `<div class="ui labeled button" tabindex="0">
  <div class="ui button" id="cocktail-${cocktail.id}" >
    See Reviews
  </div>
  <a class="ui basic label">
  Average Rating: &nbsp; ${calculateAverage(cocktail)}
  </a>
</div>
`;
};

const renderAddReviewButton = () => {
  return `
<button class="ui button">Add Review</button>
`;
};

// ******************* Events Listeners *****************

verticalMenuDiv.addEventListener('click', filterCocktails)
document.addEventListener('click', showAll)