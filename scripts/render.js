import { podcasts, genres, seasons } from "./utils/data.js";
import {  podGrid, modalTitle, modalDesc, modalImg, modalGenres, modalDate, modalSeasons} from "./utils/dom.js";
import { formatDate } from "./utils/formatDate.js";

export function renderPodcast() {
    podcasts.forEach(podcast => {
        // podcast container 
        let card = document.createElement("div")
        card.classList.add("podcast-container")

        // podacast img container
        let imgContainer = document.createElement("div");
        imgContainer.classList.add("podcast-img-div")

        // podcast image
        let img = document.createElement("img")
        img.classList.add("podcast-img")
        img.src = podcast.image;
        card.appendChild(img)

        //podcast title
        let podTitle = document.createElement("h2")
        podTitle.classList.add("pod-title")
        podTitle.textContent = podcast.title;
        card.appendChild(podTitle);

        //podcast seasons
        let seasonWrapper = document.createElement("div")
        seasonWrapper.classList.add("season-wrapper");
        card.appendChild(seasonWrapper);

        let seasonIcon = document.createElement("img")
        seasonIcon.classList.add("season-icon")
        seasonIcon.src = "/images/season.png";
        seasonWrapper.appendChild(seasonIcon);

        let seasons = document.createElement("span")
        seasons.textContent = `${podcast.seasons} seasons`;
        seasonWrapper.appendChild(seasons);

        // podcast genres
        const showGenres = genres.filter(genre => genre.shows.includes(podcast.id))

        let genreWrapper = document.createElement("div");
        genreWrapper.classList.add("genre-wrapper");

        showGenres.forEach(genre => {
            let gen = document.createElement("div");
            gen.classList.add("genre-item");
            gen.textContent = genre.title;
            genreWrapper.appendChild(gen)
            // console.log(title)
        })
        card.appendChild(genreWrapper);

        // podacast last update
        const formattedDate = formatDate(podcast.updated);

        let updateTime = document.createElement("p");
        updateTime.classList.add("update-time")
        updateTime.textContent = `Updated ${formattedDate}`;
        card.appendChild(updateTime);

        podGrid.appendChild(card)
        
    })
}

export function renderModalInfo(podcast) {
    modalTitle.textContent = podcast.title;
    modalDesc.textContent = podcast.description;
    modalImg.style.backgroundImage = `url(${podcast.image})`;

    const showGenres = genres.filter(genre => genre.shows.includes(podcast.id))
    modalGenres.innerHTML = "";
    showGenres.forEach(genre => {
        let genreItem = document.createElement("div");
        genreItem.classList.add("genre-item");
        genreItem.textContent = genre.title;

        modalGenres.appendChild(genreItem);
    });

    const formattedDate = formatDate(podcast.updated);
    modalDate.textContent = `Last Updated ${formattedDate}`;

    // seasons
    modalSeasons.innerHTML = "";
   
    const podSeasons = seasons.find(s => s.id === podcast.id)
    if(podSeasons) {
        podSeasons.seasonDetails.forEach((season, index) => {
           
            let seasonDiv = document.createElement("div");
            seasonDiv.classList.add("seasons-clm")

            let flexContainer = document.createElement("div");
            flexContainer.classList.add("flex-container")
            seasonDiv.appendChild(flexContainer);

            let seasonTitle = document.createElement("p");
            seasonTitle.classList.add("season-title")
            seasonTitle.textContent = `Season ${index + 1} : ${season.title}`
            flexContainer.appendChild(seasonTitle);

            let seasonDesc = document.createElement("p");
            seasonDesc.classList.add("season-description");
            seasonDesc.textContent = season.title;
            flexContainer.appendChild(seasonDesc);

            let epNum = document.createElement("p");
            epNum.classList.add("ep-num");
            epNum.textContent = `${season.episodes} episodes`
            seasonDiv.appendChild(epNum);

            modalSeasons.appendChild(seasonDiv);
        })
    }
}
