import * as model from './model.js'
import {MODAL_CLOSE_SEC} from './config.js'
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import addRecipeView from './view/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';


// if (module.hot) {
//   module.hot.accept();
// }
//console.log(icons);
const controlRecipes = async function() {
  //loading recipe
  try {

    const id = window.location.hash.slice(1);
    //console.log(id);

    if(!id) return;
    recipeView.renderSpinner();
    //0 update results view to mark selected search result

    resultsView.update(model.getSearchResultsPage());
    //1 updating bookmarks
    bookmarksView.update(model.state.bookmarks);

    // 2 loading recipe
    await model.loadRecipe(id);

   //const {recipe} = model.state;
    
    // 3 rendering recipe
    recipeView.render(model.state.recipe);  
    
    
  } catch (err) {
    recipeView.renderError()
    console.error(err);
  }

  
}

const controlSearchResults = async function() {
  try{

    resultsView.renderSpinner();
    //console.log(resultsView);

    const query = searchView.getQuery();
    //console.log(query);
    if(!query) return;

    await model.loadSearchResults(query);
    //console.log(query);
    
    //console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search)
  } catch(err) {
    console.log(err)
  }
} 

const controlPagination = function(gotoPage) {
  //render new results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  //render new pagination button
  paginationView.render(model.state.search)
}

const controlServings = function(newServings) {
  //update recipe servings
  model.updateServings(newServings)

  //update recipe view
  // recipeView.render(model.state.recipe); 
  recipeView.update(model.state.recipe); 

}

const controlAddBookmark = function() {
  if(!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);

  }
  
  else {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
}

const controlBookamrks = function() {
  bookmarksView.render(model.state.bookmarks);

}

const controlAddRecipe = async function(newRecipe) {
  try {
    //show loading spinner
    addRecipeView.renderSpinner();
    //upload the new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render recipe
    recipeView.render(model.state.recipe);

    //success message
    addRecipeView.renderMessage();

    //bookmark view
    bookmarksView.render(model.state.bookmarks);

    //change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form
    setTimeout(function() {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000)
  } catch(err) {
    console.error('err', err);
    addRecipeView.renderError(err.message)
  }
  //console.log(newRecipe);
  

}

//controlRecipes();
const init = function() {
  bookmarksView.addHandlerRender(controlBookamrks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults);
  //console.log(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
  
}
init(); 

