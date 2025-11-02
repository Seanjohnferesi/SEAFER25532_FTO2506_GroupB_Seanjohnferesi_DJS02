import { modal, closeModal, modalTitle, modalDesc, modalGenres, modalImg, modalDate, modalSeasons, modalImg2 } from "../utils/dom.js";
console.log("Modal image from dom.js:", modalImg);
import { seasons } from "../utils/data.js";


// open global modal when clicking the card;
export function modalOpen (component) {
    component.card.addEventListener("click", () => {
        modalTitle.textContent = component._title.textContent;
        modalDesc.textContent = component._desc.textContent;
        modalImg2.src = component._Img.src;
        modalSeasons.textContent = component._seasons.textContent;
        modalDate.textContent = component.updateTime.textContent;
        console.log("Component image src:", component._Img.src);
        console.log("Modal image element:", modalImg2);


         modalGenres.innerHTML = "";

        Array.from(component.genreWrapper.children).forEach(title => {
            const gen = document.createElement("div");
            gen.classList.add("genre-item");
            gen.textContent = title.textContent;
            modalGenres.appendChild(gen);
        })

        modal.style.opacity = "1";
        modal.style.pointerEvents = "auto";
        document.body.style.pointerEvents = "none";
        document.body.style.overflow = "hidden";

        // Seasons
    modalSeasons.innerHTML = "";
    const podSeasons = seasons.find(s => s.id === parseInt(component.getAttribute("pod-id")));
    if(podSeasons) {
        podSeasons.seasonDetails.forEach((season, index) => {
            let seasonDiv = document.createElement("div");
            seasonDiv.classList.add("seasons-clm");

            let flexContainer = document.createElement("div");
            flexContainer.classList.add("flex-container");
            seasonDiv.appendChild(flexContainer);

            let seasonTitle = document.createElement("p");
            seasonTitle.classList.add("season-title");
            seasonTitle.textContent = `Season ${index + 1} : ${season.title}`;
            flexContainer.appendChild(seasonTitle);

            let seasonDesc = document.createElement("p");
            seasonDesc.classList.add("season-description");
            seasonDesc.textContent = season.title; // Or full description if available
            flexContainer.appendChild(seasonDesc);

            let epNum = document.createElement("p");
            epNum.classList.add("ep-num");
            epNum.textContent = `${season.episodes} episodes`;
            seasonDiv.appendChild(epNum);

            modalSeasons.appendChild(seasonDiv);
            });
        }
    });
}

export function modalClose () {
    closeModal.addEventListener("click", () => {
        modal.style.pointerEvents = "none";
        modal.style.opacity = "0";
        document.body.style.pointerEvents = "auto";
        document.body.style.overflow = "auto";
    })
}

