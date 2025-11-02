
import { podcasts, genres } from "../utils/data.js";
import { podGrid, modalDesc, modalGenres, modalDate, modalSeasons } from "../utils/dom.js";
import { formatDate } from "../utils/formatDate.js";
import { modalOpen, modalClose } from "./componentModalManager.js";


export class PodcastPreview extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"})

        // STRUCTURE.
        this.card = document.createElement("div");
        this.imgContainer = document.createElement("div"); 
        this._Img = document.createElement("img");
        this._title = document.createElement("h2");
        this.seasonContainer = document.createElement("div");
        this.seasonIcon = document.createElement("img");
        this._seasons = document.createElement("span");
        this.genreWrapper = document.createElement("div");
        this.updateTime = document.createElement("p");
        this._desc = document.createElement("p");
        
        const style = document.createElement("style");
        style.textContent = `
            *{
                box-sizing: border-box;
            }

            :host {
                width: 100%;
                height: 100%;
                overflow: none;
            }

            .podcast-container {
                width: 100%;
                border: 1px solid var(--color-border);
                border-radius: 8px;
                background-color: var(--color-div-bg);
                padding: 15px;
                cursor: pointer;
                transition: transform .5s ease;
            }

            .podcast-container:hover{
                transform: scale(1.1);
            }

            .podcast-img-div{
                width: 100%;
                height: 100%
            }

            .podcast-img{
                width: 100%;
                border: 1px solid var(--color-border);
                border-radius: 8px;
                background-color: var(--color-btn);
            }

            .pod-title{
                margin: 0;
                margin: 5px 0;
                font-weight: 500;
                font-size: 1.2rem;
            }


            .season-wrapper{
                display: flex;
                align-items: center;
                gap: 5px;
                color: var(--color-content-text);
            }

            .season-icon{
                width: 20px;
                height: 20px;
            }

            .genre-item{
                background-color: var(--color-btn);
                padding: 5px 7px;
                border-radius: 6px;
                font-size: 0.7rem;
                color: var(--color-text);
            }

            .genre-wrapper{
                display: flex;
                flex-wrap: wrap;
                gap: 3px;
                margin-top: 5px;
            }

            .update-time{
                margin: 0;
                margin-top: 10px;
                color: var(--color-content-text);
            } 

            /**MOBILE RESPONSIVENESS**/
            @media(max-width: 576px) {
                .podcast-container:hover{
                    transform: none;
                }

                podcast-img-div{
                    width: 1600px;
                    height: 290px;

                }

                .podcast-img{
                    height: 220px;
        
                }

                .pod-title{
                    font-size: 1.12rem;
                }

                .genre-item{
                    font-size: .8rem;
                }
                

                .update-time{
                    font-size: .95rem
                }

                
            }
        

        `

        // assigning classes to the elements
        this.card.classList.add("podcast-container");
        this.imgContainer.classList.add("podcast-img-div");
        this._Img.classList.add("podcast-img");
        this._title.classList.add("pod-title");
        this.seasonContainer.classList.add("season-wrapper");
        this.seasonIcon.classList.add("season-icon");
        this.seasonIcon.src = "./images/season.png";
        this._seasons.textContent = `${podcasts.seasons} seasons`;
        this.genreWrapper.classList.add("genre-wrapper");
        this.updateTime.classList.add("update-time");
        this._desc.classList.add("podcast-description");

        this.card.append(this.imgContainer, this._title, this.seasonContainer, this.genreWrapper, this.updateTime);
        this.imgContainer.append(this._Img);
        this.seasonContainer.append(this.seasonIcon, this._seasons);
        this.shadow.append(style, this.card)

        // MODAL OPEN AND CLOSE
        modalOpen(this);
        modalClose();
    }

    static get observedAttributes(){
            return ["pod-title", "pod-image", "pod-genres", "pod-seasons", "pod-date", "pod-desc"]
        }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "pod-title") this._title.textContent = newValue;
        if (name === "pod-image") this._Img.src = newValue;
        if (name === "pod-seasons") this._seasons.textContent = newValue;
        if (name === "pod-date") this.updateTime.textContent = newValue;
        if (name === "pod-desc") this._desc.textContent = newValue;
        if (name === "pod-genres") {
            this.genreWrapper.innerHTML = "";
            newValue.split(', ').forEach(title => {
                const gen = document.createElement("div");
                gen.classList.add("genre-item");
                gen.textContent = title.trim();
                this.genreWrapper.appendChild(gen);
            })
        }
    }

}

customElements.define("podcast-preview", PodcastPreview);

export function renderPodcast2() {
 
    podcasts.forEach(podcast => {
        const podcastEl = document.createElement("podcast-preview");
        podcastEl.setAttribute("pod-title", podcast.title);
        podcastEl.setAttribute("pod-image", podcast.image);
        podcastEl.setAttribute("pod-seasons", `${podcast.seasons} seasons`)
        podcastEl.setAttribute("pod-desc", podcast.description);
        
        // genres
        const showGenres = genres.filter(genre => genre.shows.includes(podcast.id)).map(genre => genre.title).join(", ");
        podcastEl.setAttribute("pod-genres", showGenres);
        // console.log(showGenres)

        // UPDATE TIME
        const updatedTime = formatDate(podcast.updated)
        podcastEl.setAttribute("pod-date", `Updated ${updatedTime}`);

        podGrid.appendChild(podcastEl);

    });
}
