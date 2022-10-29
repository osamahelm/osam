const searchBar = document.getElementById("search-bar"); //search bar element
const searchBarValue = document.getElementById("search-value"); //input of search bar
const searchBarMealsList = document.createElement("ul"); // list element for elastic search bar
const searchInput = window.location.search; //gets the  query keyword of search
const mealCardsList = document.getElementById("meals-list"); //list element of meal Cards
const searchBtn = document.getElementById("search-btn"); //search button

const mealCardsWrapper = document.getElementById("meal-cards-wrapper");
// ------------------------------------------------------------------------>
$('.justify').click(function(){
    let navWidth=  $('.nav-menu').outerWidth();
    let leftOffset = $('.nav-menu').offset().left;
     $(this).toggleClass("click");
     
    if(leftOffset == -250){
        $('.header-nav').css({
            left:`${navWidth}px`,
            transition:'all 1s'
        })
       
       
     }else{
        $('.header-nav').css({
            left:`0px`,
            transition:'all 1s'
        })
     }
      
    $('.nav-menu').toggleClass("show");
  });
// #ADD TO FAVOURITES
const buttonClick = function (a, url) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      obj = data;
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });
  const { meals } = obj;
  for (elem of meals) {
    if (elem["idMeal"] == a) {
      localStorage.setItem("mealsDesc", JSON.stringify(elem));
    }
  }
};

const favouritesMealArray = [];

const addToFavourites = function (id) {
  favBtn = document.querySelector('[fav-data-id = "' + id + '"]');

  favBtn.innerText = "REMOVE FROM FAV";
  fetch(SEARCH_MEAL_API_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      obj = data;
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });

  const { meals } = obj;
  let isPresentAlready = -1;
  for (elem of meals) {
    if (elem["idMeal"] == id) {
      const favourites = getFavourites();
      favourites.forEach((e) => {
        if (e["idMeal"] == id) {
          isPresentAlready = 0;
        }
      });
      if (isPresentAlready == -1) {
        favouritesMealArray.push(elem);
        localStorage.setItem("favourites", JSON.stringify(favouritesMealArray));
      } else {
        deletefromStorage(id);
      }
    }
  }
};

function getFavourites() {
  let favourites = [];
  const isPresent = localStorage.getItem("favourites");
  if (isPresent) {
    favourites = JSON.parse(isPresent);
  }
  return favourites;
}

function deletefromStorage(id) {
  const favourites = getFavourites();
  res = 0;
  favourites.forEach((elem) => {
    if (elem["idMeal"] == id) {
      res = favourites.indexOf(elem);
    }
  });

  if (res != -1) {
    favBtn = document.querySelector('[fav-data-id = "' + id + '"]');
    favBtn.innerText = "ADD TO FAVOURITES";
    favourites.splice(res, 1);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
}

// <-----------------------------------------------------------------------

// ------------------------------------------------------------------------>

//#ADD TO SEARCH LIST

// empty the search bar list when clicked outside
window.addEventListener("click", () => {
  while (searchBarMealsList.firstChild) {
    searchBarMealsList.removeChild(searchBarMealsList.firstChild);
  }
});

// event listener  to listen dynamic input
searchBarValue.addEventListener("keyup", (e) => {
  while (searchBarMealsList.firstChild) {
    searchBarMealsList.removeChild(searchBarMealsList.firstChild);
  }
  API_SEARCH_BAR_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  let searchValueInput = document.getElementById("search-value").value;
  API_SEARCH_BAR_URL += searchValueInput;
  populateSearchList(API_SEARCH_BAR_URL);
  searchBar.append(searchBarMealsList);
});

// function to add list items of dynamic input to search bar list
async function populateSearchList(url) {
  await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      obj1 = data;
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });

  let { meals } = obj1;

  a = url.substring(url.indexOf("=") + 1);
  a += "";

  if (obj1 != null) {
    for (element of meals) {
      var searchListItem = document.createElement("li");
      searchListItem.className = "searchListItem";
      searchListItem.innerHTML = `<a href = "javascript:void(0)" onclick= "fetchById(${element["idMeal"]}) " >${element["strMeal"]}</a>`;
    }
    searchBarMealsList.append(searchListItem);
  }
}

// <------------------------------------------------------------------------

// ------------------------------------------------------------------------>

//#ADD TO MEALS CARDS

let SEARCH_MEAL_API_URL =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
  searchInput.substring(8) +
  "#cards-page";

// function to fetch the searched query  from api
const dev = (async function () {
  fetch(SEARCH_MEAL_API_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      obj = data;
      generateMealCard(obj);
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });
})();

// function to generate cards of meals
function generateMealCard(obj) {
  let { meals } = obj;
  if (meals == null) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<h1>Uh Oh!! We don't have these Recipes yet</h1>`;
    mealCardsList.append(listItem);
    return;
  } else {
    meals.forEach((element) => {
      addListItemtoCard(element);
    });
  }
}

// function to add list item to dom
function addListItemtoCard(element) {
  const listItem = document.createElement("li");
  listItem.className = "booking-card";
  listItem.style.backgroundImage = `url(${element["strMealThumb"]})`;

  const favourites = getFavourites();
  let isFavourite = "ADD TO FAVOURITES";
  for (elem of favourites) {
    if (elem["idMeal"] == element["idMeal"]) {
      isFavourite = "REMOVE FROM FAV";
    }
  }
  listItem.innerHTML = `
            
            <div class="informations-container">
              <h2 class="title">
              ${element["strMeal"]}
              </h2>
              <p class="sub-title">${element["strCategory"]}</p>
              <p class="price">
              <div class="more-information">
                <div class="info-and-date-container">
                  <div class="box info">
                    <svg
                      class="icon"
                      style="width: 24px; height: 24px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
                      />
                    </svg>
                    <p ><a href = "javascript:void(0)" onclick= "fetchById(${element["idMeal"]})" data-id =${element["idMeal"]}  id="desc-btn" >View Recipe</a></p>
                  </div>
                  
                 </div>
                  </div>
                <p class ="disclaimer"></p>
                  </div>`;

  mealCardsList.append(listItem);
}

const fetchById = (id) => {
  url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      obj = data;
      setToLocal(obj);
    })
   
};

function setToLocal(obj) {
  const a = obj.meals;
  localStorage.setItem("mealsDesc", JSON.stringify(a[0]));
  window.location.href = "./recipe.html";
}
$(window).ready(function(){
     $('#lds-roller').slideUp(1000,function(){
         $('body').css('overflow-y','scroll')
     })
 })

 window.addEventListener('load',)



// <------------------------------------------------------------------------
