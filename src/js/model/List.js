import uniqid from 'uniqid';

export default class List{
    constructor(){
        this.items = [];
    }

    addItem(item){
        this.items.push({
            id : uniqid(),
            item,
        });
    }

    deleteItem(id){
        const index = this.items.findIndex(item => item.id === id);
        this.items.splice(index, 1);
    }

}