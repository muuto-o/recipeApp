export default class Favorite{
    constructor(){
        
        this.readDataToLocalStorage();
        if(!this.favorites) this.favorites = [];
    }

    addFavorite(id, title, publisher, image_url){
        const favorite = { id, title, publisher, image_url };
        this.favorites.push(favorite);

        this.saveDataToLocalStorage();
        return favorite;
    }

    deleteFavorite(id){
        const index = this.favorites.findIndex(item => item.id === id);
        this.favorites.splice(index, 1);
        this.saveDataToLocalStorage();
    }

    isFavorite(id){
      return !(this.favorites.findIndex(el => el.id === id) === -1)
    }

    getNumberOfFavorites(){
        return this.favorites.length;
    }

    saveDataToLocalStorage(){
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    readDataToLocalStorage(){
        this.favorites = JSON.parse(localStorage.getItem('favorites'));
    }
}