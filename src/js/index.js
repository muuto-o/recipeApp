import Search from './model/Search';
import {elements, renderLoader, clearLoader} from './view/base';
import * as searchView from './view/SearchView';
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
    }
});