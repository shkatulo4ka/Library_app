import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../componenets/header/header.js";
import { Search } from "../../componenets/search/search.js";

export class MainView extends AbstractView {
    state = {
        list:[],
        loading: false,
        searchQuery: undefined,
        offset: 0
    };

    constructor(appState){
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle('Поиск книг');
    }

    async stateHook(path){
        console.log(path);
        if (path === 'searchQuery'){
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery, this.state.offset);
            this.state.loading = false;
            this.state.list = data.docs;
        }
    }

    async loadList(q, offset){
        const res = await fetch(`https://openlibrary.org/search.json?q=${q}&${offset}`);
        return res.json();
    }

    appStateHook(path){
        console.log(path);
        if (path === 'favourites'){
            console.log(path);
        }
    }

    render(){
        const main = document.createElement('div');
        main.append(new Search(this.state).render());
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
        this.appState.favourites.push('d');
    }

    renderHeader(){
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}