import { DivComponent } from "../../common/div-component";
import './card.css';

export class CardList extends DivComponent {
    constructor(appState, cardState){
        super();
        this.appState = appState;
        this.cardState = cardState;
    }

    render(){
        this.el.classList.add("card");
        this.el.innerHTML = `
            <div class="card_image">
                <img src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg" alt="Обложка"/>
            </div>
            <div class="card_info">
                <div class="card_tag">
                </div>
            </div>
        `;
        return this.el;
    }
}