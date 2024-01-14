import { elements } from "./base";

export const toggleFavoriteBtn = isLiked =>{
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleFavoriteMenu = numberOfFavorites =>{
    elements.favoritesMenu.style.visibility = (numberOfFavorites > 0) ? 'visible' : 'hidden';
};

export const renderFavorite = favorite =>{

    const html = `
        <li>
            <a class="likes__link" href="#${favorite.id}">
                <figure class="likes__fig">
                    <img src="${favorite.image_url}" alt="${favorite.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${favorite.title}</h4>
                    <p class="likes__author">${favorite.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.favoritesList.insertAdjacentHTML('afterbegin', html);
}

export const deleteFavorite = id =>{
    const domObj = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(domObj){

        domObj.parentElement.removeChild(domObj);
    }
}