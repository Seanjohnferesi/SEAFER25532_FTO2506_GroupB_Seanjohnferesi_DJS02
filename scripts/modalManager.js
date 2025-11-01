import { podcasts } from "./utils/data.js";
import { closeModal, modal} from "./utils/dom.js";
import { renderModalInfo } from "./render.js";

export function modalOpen () {
    const openModal = document.querySelectorAll(".podcast-container")

    openModal.forEach( (card, index) => {
        card.addEventListener("click", () => {
            renderModalInfo(podcasts[index])
            modal.classList.add("display-modal")

            document.body.style.overflow = "hidden";
        })
    })
}

export function modalClose () {
    closeModal.addEventListener("click", () => {
        modal.classList.remove("display-modal")
        document.body.style.overflow = "";
        console.log("clicked")
})
}
