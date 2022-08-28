import * as model from './model.js'
import recipeView from './view/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './view/recipeView.js';
//console.log(icons);
const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function() {
  //loading recipe
  try {

    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) return;
    recipeView.renderSpinner();
    // 1 loading recipe
    await model.loadRecipe(id);
   //const {recipe} = model.state;
    
    // 2 rendering recipe
    recipeView.render(model.state.recipe);    
  } catch (err) {
    console.log(err);
  }
}
//controlRecipes();
const init = function() {
  recipeView.addHandlerRender(controlRecipes);
}
init();