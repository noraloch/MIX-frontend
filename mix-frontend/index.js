// ******************* Dom Elements *****************

const cocktailCardDiv = document.querySelector(".cocktail-cards");
const verticalMenuDiv = document.querySelector(
  ".ui .vertical .fluid .tabular .menu"
);

// ******************* Network Requests *****************
const getCocktails = () => {
  return fetch("http://localhost:3000/cocktails").then((response) =>
    response.json()
  );
};

// ******************* Events Listeners *****************

// ******************* Dom Manipulation / functions *****************

const showSideBar = (categoriesArray) => {
  const menuDiv = document.createElement("div");
  cocktailCardDiv.append(menuDiv);
  categoriesArray.forEach((category) => {
    menuDiv.innerHTML += `
      <a class="item active">${category.name}</a>
    `;
  });
};

const getTastes = () => {
  fetch("http://localhost:3000/categories")
    .then((res) => res.json())
    .then((categoriesArray) => showSideBar(categoriesArray));
};

getTastes();

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

// const seeReviewsButton = document.querySelector(`#cocktail-${cocktail.id}`);
//   console.log(seeReviewsButton)
//   seeReviewsButton.addEventListener("click", (event) => {
//     console.log(event);
//     const reviewsDiv = document.querySelector(".description");
//     reviewsDiv.innerHTML += `${cocktail.reviews.map((review) =>
//       renderReview(review)
//     )}`;
//   });
