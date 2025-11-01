import { podcasts, genres} from "./utils/data.js";
import { modalOpen, modalClose } from "./modalManager.js";
import { renderPodcast } from "./render.js";
import "./components/podcastPreview.js";
import { renderPodcast2 } from "./components/podcastPreview.js";

renderPodcast2()
modalOpen(podcasts);
modalClose();


