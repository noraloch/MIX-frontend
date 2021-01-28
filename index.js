// ******************* Dom Elements *****************

const cocktailCardDiv = document.querySelector(".cocktail-cards");

const verticalMenuDiv = Array.from(
  document.getElementsByClassName("ui vertical fluid tabular menu")
)[0];
const allDiv = document.querySelector("#All");

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
      showSideBar(categoriesArray);
    });
};

getTastes();

// ******************* Dom Manipulation / functions *****************

const showSideBar = (categoriesArray) => {
  categoriesArray.forEach((category) => {
    // console.log(category.cocktails)
    verticalMenuDiv.innerHTML += `
      <a class="item" id=${category.id}>${category.name}</a>
    `;
  });
};

function filterCocktails(e) {
  let categoryId = e.target.id;
  // console.log("categoryId", categoryId);
  let relevantCategory = categories.find(
    (category) => parseInt(category.id) === parseInt(categoryId)
  );
  let categoryCocktails = relevantCategory.cocktails;

  Array.from(verticalMenuDiv.children).forEach((child) => {
    child.className = "item";
  });

  e.target.className = "item active";
  // Clear cocktailCardDiv so it's fresh / empty
  cocktailCardDiv.innerHTML = "";

  // Populate cocktailCardDiv with all of the categoryCocktails

  // console.log("categoryCocktails", categoryCocktails);
  categoryCocktails.forEach((cocktail) => {
    renderCocktail(cocktail);
  });
}
function showAll(e) {
  if (e.target.id === "show-all-btn") {
    getAndRenderCocktails();
  }
}

const renderCocktail = (cocktail) => {
  cocktailCardDiv.innerHTML += `
  <div class="ui card five wide column">
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
    <form class="review-form" id=reviews-form-${cocktail.id}>
    </form>
  </div>
  ${renderSeeReviewsButton(cocktail)}
  <br>
  ${renderAddReviewButton(cocktail)}
</div>
`;

  setTimeout(() => {
    handleSeeReviewsEvent(cocktail);
    handleAddReviewEvent(cocktail);
  });
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
  <div class="ratings-average">${ratingsAve.toFixed(1)}</div>
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
    reviewsDiv.innerHTML = "";
    reviewsDiv.innerHTML += `${cocktail.reviews
      .map((review) => renderReview(review))
      .join("<br>")}`;

    // for each review add an event listener on update review button
    const reviewsArray = cocktail.reviews;
    reviewsArray.forEach((review) => {
      const updateReviewButton = document.querySelector(`#update-review-${review.id}`);
      updateReviewButton.dataset.id = review.id;
      updateReviewButton.addEventListener("click", renderUpdateReviewForm);
    });
  });
};

const handleAddReviewEvent = (cocktail) => {
  const addReviewButton = document.querySelector(`#add-review-${cocktail.id}`);
  addReviewButton.dataset.id = cocktail.id;
  addReviewButton.addEventListener("click", renderNewReviewForm);
};

const renderReview = (review) => {
  return `
  <div id="review-${review.id}">
    <div class="rating">${review.rating}</div>
    <div class="review">${review.review_text}</div>
    <button class="update-review-button" id="update-review-${review.id}">
    Update Review
    </button>
  </div>
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

const renderAddReviewButton = (cocktail) => {
  return `
<button class="ui button" id="add-review-${cocktail.id}">Add Review</button>
`;
};

const renderNewReviewForm = (event) => {
  const cocktailId = `${event.target.dataset.id}`;
  const reviewForm = document.querySelector(`#reviews-form-${cocktailId}`);

  reviewForm.innerHTML += `
  <div class="ui form">
  <div class="inline fields">
    <div class="field">
      <div class="ui radio checkbox">
        <input type="radio" name="rating" checked="" tabindex="0" class="hidden" value="1">
        <label>1</label>
      </div>
    </div>
    <div class="field">
      <div class="ui radio checkbox">
        <input type="radio" name="rating" tabindex="0" class="hidden" value="2">
        <label>2</label>
      </div>
    </div>
    <div class="field">
      <div class="ui radio checkbox">
        <input type="radio" name="rating" tabindex="0" class="hidden" value="3">
        <label>3</label>
      </div>
    </div>
    <div class="field">
      <div class="ui radio checkbox">
        <input type="radio" name="rating" tabindex="0" class="hidden" value="4">
        <label>4</label>
      </div>
    </div>
    <div class="field">
      <div class="ui radio checkbox">
        <input type="radio" name="rating" tabindex="0" class="hidden" value="5">
        <label>5</label>
    </div>
  </div>
  </div>
  <div class="field">
    <label>Review</label>
    <textarea rows="2" name="review"></textarea>
  </div>
  <button class="mini ui button" type="submit" >
  Submit
  </button>
  `;
  $(".ui.radio.checkbox").checkbox();

  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const ratingInput = parseInt(event.target.rating.value);
    const reviewInput = event.target.review.value;
    const cocktailIdInput = parseInt(cocktailId);

    const review = {
      user_id: 1,
      cocktail_id: cocktailIdInput,
      rating: ratingInput,
      review_text: reviewInput,
    };
    postNewReviewForm(review);
  });
};

const postNewReviewForm = (newReview) => {
  return fetch("http://localhost:3000/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReview),
  })
    .then((response) => response.json())
    .then((reviewData) => {
      const reviewsDiv = document.querySelector(
        `#reviews-${newReview.cocktail_id}`
      );
      reviewsDiv.innerHTML += renderReview(reviewData);
      const updateReviewButton = document.querySelector(`#update-review-${reviewData.id}`);
      updateReviewButton.dataset.id = reviewData.id;
      updateReviewButton.addEventListener("click", renderUpdateReviewForm);
    });
};

const renderUpdateReviewForm = (event) => {
  const reviewId = `${event.target.dataset.id}`;
  const reviewDiv = document.querySelector(`#review-${reviewId}`);

  reviewDiv.innerHTML += `
  <form class="update-review-form">
  <div class="ui form">
  <div class="inline fields">
    <div class="field">
      <div class="ui radio checkbox">
        <input type="radio" name="rating" checked="" tabindex="0" class="hidden" value="1">
        <label>1</label>
      </div>
    </div>
    <div class="field">
      <div class="ui radio checkbox">
        <input type="radio" name="rating" tabindex="0" class="hidden" value="2">
        <label>2</label>
      </div>
    </div>
    <div class="field">
      <div class="ui radio checkbox">
        <input type="radio" name="rating" tabindex="0" class="hidden" value="3">
        <label>3</label>
      </div>
    </div>
    <div class="field">
      <div class="ui radio checkbox">
        <input type="radio" name="rating" tabindex="0" class="hidden" value="4">
        <label>4</label>
      </div>
    </div>
    <div class="field">
      <div class="ui radio checkbox">
        <input type="radio" name="rating" tabindex="0" class="hidden" value="5">
        <label>5</label>
    </div>
  </div>
  </div>
  <div class="field">
    <label>Review</label>
    <textarea rows="2" name="review"></textarea>
  </div>
  <button class="mini ui button" type="submit" >
  Save
  </button>
  </form>
  `;
  $(".ui.radio.checkbox").checkbox();

  const updateReviewForm = document.querySelector(".update-review-form");
  updateReviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const ratingInput = parseInt(event.target.rating.value);
    const reviewInput = event.target.review.value;

    const review = {
      id: reviewId,
      rating: ratingInput,
      review_text: reviewInput,
    };
    updateReview(review);
  });
};

const updateReview = (updatedReview) => {
  return fetch(`http://localhost:3000/reviews/${updatedReview.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rating: updatedReview.rating,
      review_text: updatedReview.review_text,
    }),
  }).then((response) => response.json())
    .then((updatedReviewData) => {
    const reviewsDiv = document.querySelector(
      `#reviews-${updatedReviewData.cocktail_id}`
    );
    const reviewDiv = document.querySelector(`#review-${updatedReview.id}`)
    reviewDiv.remove()
    reviewsDiv.innerHTML += renderReview(updatedReviewData);
    const updateReviewButton = document.querySelector(`#update-review-${updatedReview.id}`);
      updateReviewButton.dataset.id = updatedReview.id;
      updateReviewButton.addEventListener("click", renderUpdateReviewForm);
  });
};

// ******************* Events Listeners *****************

verticalMenuDiv.addEventListener("click", filterCocktails);
document.addEventListener("click", showAll);


//user ids need to be dynamic
//prepopulate update review form
//update or new forms should disappear after you submit
//validations for updating and adding a new review, first pass coud be hiding update and add buttons if not logged in

//styling
//align review buttons at bottom of cards
//star rating
//flip cards
