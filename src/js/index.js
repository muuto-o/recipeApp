import Search from './model/Search';
import Recipe from './model/Recipe';
import List from './model/List';
import Favorite from './model/Favorite';
import {elements, renderLoader, clearLoader} from './view/base';
import {renderRecipes, clearRecipe, highlightSelectedRecipe} from './view/RecipeView';
import * as searchView from './view/SearchView';
import * as listView from './view/ListView';
import * as favoriteView from './view/FavoriteView';


const state = {};

const controlSeacrch = async () =>{
    // 1). Вэбээс хайлтын түлхүүр үгийг гаргаж авна. 
    const query = searchView.getInput();

    if(query){
        // 2). Шинээр хайлтын обьектийг үүсгэнэ.
        state.search = new Search(query);
        // console.log(state.search);

        // 3). Хайлт хийхэд зориулж дэлгэцийн UI бэлтгэнэ.
        searchView.clearSearchField();
        searchView.clearSearchResults();
        renderLoader(elements.searchResultDiv);

        // 4). Хайлтыг гүйцэтгэнэ.
        await state.search.doSearch();
        
        // 5). Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
        clearLoader();
        if(state.search.result === undefined){
            alert("Хайлт илэрцгүй")
        }else{
            searchView.renderRecipes(state.search.result);
        }
    }
}

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSeacrch();

});

elements.pageButtons.addEventListener('click', e=>{
    const btn = e.target.closest(".btn-inline");

    if(btn){
        const gotoPageNumber = parseInt(btn.dataset.goto);
        searchView.clearSearchResults();
        searchView.renderRecipes(state.search.result, gotoPageNumber);
        const id = window.location.hash.replace("#", "");
        highlightSelectedRecipe(id);
    }
});

const controlRecipe = async () =>{
    // 1. URL-аас ID-г салгаж авна.
    const id = window.location.hash.replace("#", "");
    

   if(id){
     // 2. Жорын моделийг үүсгэнэ.
     state.recipe = new Recipe(id);

     // 3. UI дэлгэцийг бэлтгэнэ.
     clearRecipe();
     renderLoader(elements.recipeDiv);
     highlightSelectedRecipe(id);
 
     // 4. Жороо татаж авчирна.
     await state.recipe.getRecipe();
     
 
     // 5. Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно.
     state.recipe.calcTime();
     state.recipe.calcPortion();
     // 6. Жороо дэлгэцэнд гаргана.
     clearLoader();
     renderRecipes(state.recipe, state.favorite.isFavorite(id));
   }
}

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));
window.addEventListener('load', e => {
    if(!state.favorite) state.favorite = new Favorite();
    favoriteView.toggleFavoriteMenu(state.favorite.getNumberOfFavorites());

    state.favorite.favorites.forEach(el => favoriteView.renderFavorite(el));
});

const controlList = () =>{
    // Найрлаганы моделийг үүсгэнэ.
    state.list = new List();
    listView.clearItems();
    // Найрлаганы модел руу одоо харагдаж байгаа жорны бүх найрлагыг хийнэ.
    state.recipe.ingredients.forEach(el => {
        state.list.addItem(el)
    });
    console.log(state.list);
    listView.renderItems(state.list.items);
    
}

// Like Controller

const controlFavorite = () =>{
    // 1. Favorite тодел үүсгэнэ.
    if(!state.favorite) state.favorite = new Favorite();
    // 2. Одоо харагдаж байгаа жорын ID-г олж авна.
    const currentRecipeId = state.recipe.id;
    // 3. Энэ жорыг лайкласан эсэхийг шалгах.
    if(state.favorite.isFavorite(currentRecipeId)){
        state.favorite.deleteFavorite(currentRecipeId);
        favoriteView.deleteFavorite(currentRecipeId);
        favoriteView.toggleFavoriteBtn(false);
    }else{
        const newFavorite = state.favorite.addFavorite(currentRecipeId, state.recipe.title, state.recipe.publisher, state.recipe.image_url);
        favoriteView.renderFavorite(newFavorite);
        favoriteView.toggleFavoriteBtn(true);

    }
    favoriteView.toggleFavoriteMenu(state.favorite.getNumberOfFavorites());
}

elements.recipeDiv.addEventListener('click', e=>{

    if(e.target.matches('.recipe__btn, .recipe__btn *')){
        controlList();
    } else if(e.target.closest('.recipe__love, .recipe__love *')){
        controlFavorite();
    }
});

elements.shoppingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    state.list.deleteItem(id);
    listView.deleteItem(id);

});