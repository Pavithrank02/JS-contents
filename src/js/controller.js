import * as model from './model.js'
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
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


    // 1 loading recipe
    await model.loadRecipe(id);

   //const {recipe} = model.state;
    
    // 2 rendering recipe
    recipeView.render(model.state.recipe);  

  
  } catch (err) {
    recipeView.renderError()
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

//controlRecipes();
const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  //console.log(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  
}
init(); 