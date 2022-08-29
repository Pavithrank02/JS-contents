import * as model from './model.js'
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';
//console.log(icons);
const controlRecipes = async function() {
  //loading recipe
  try {

    const id = window.location.hash.slice(1);
    //console.log(id);

    if(!id) return;
    recipeView.renderSpinner();
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

    //resultsView.renderSpinner();

    const query = searchView.getQuery();
    //console.log(query);
    if(!query) return;

    await model.loadSearchResults(query);
    //console.log(query);
    
    console.log(model.state.search.results);
  } catch(err) {
    console.log(err)
  }
} 

//controlRecipes();
const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  //console.log(controlSearchResults);
}
init(); 