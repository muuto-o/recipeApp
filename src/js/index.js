import Search from './model/Search';

let search = new Search("Pasta");

search.doSearch().then( r=> console.log(r) );