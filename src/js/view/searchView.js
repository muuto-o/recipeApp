import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearSearchField = () => {
    elements.searchInput.value = '';
};
export const clearSearchResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.pageButtons.innerHTML = '';
}
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {

    const start = (currentPage - 1) * resPerPage;
    const end = currentPage * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    const totalPage = Math.ceil( recipes.length / resPerPage);
    renderButtons(currentPage, totalPage);
}


// ------------------------------- Private Functions -------------------------------

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
        `;

    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

const renderButtons = (currentPage, totalPage) => {
    let buttonHtml;

    if(currentPage === 1 && totalPage > 1){
        // Эхний хуудсан дээр байна. Зөвхөн 2-р хуудас гэсэн товчийг харуулна. 
       buttonHtml = createButton(currentPage + 1, "next", "right");
    } else if(currentPage  < totalPage) {
        // Өмнөх болон дараагийн хуудас руу шилжих товчнуудыг үзүүлнэ. 
        buttonHtml = createButton(currentPage - 1, "prev", "left");
        buttonHtml += createButton(currentPage + 1, "next", "right");
    } else if(currentPage === totalPage) {
        // Хамгийн сүүлчийн хуудсан дээр байна. Зөвхөн өмнөх хуудас руу шилжих товчийг үзүүлнэ. 
        buttonHtml = createButton(currentPage - 1, "prev", "left");
    }

    elements.pageButtons.insertAdjacentHTML('afterbegin', buttonHtml);
};

// type ==> prev, next 
const createButton = (page, type, direction) => `
    <button class="btn-inline results__btn--${type}" data-goto=${page}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${direction}"></use>
        </svg>
        <span>Хуудас ${page}</span>
    </button>
`;