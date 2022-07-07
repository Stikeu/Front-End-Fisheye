//Mettre le code JavaScript lié à la page photographer.html
import { photographersApi } from "../api/api.js";
import { mediaPhotographersApi } from "../api/api.js";

class photographerPage{
    constructor(data){
        this.photographersApi = new photographersApi("../data/photographers.json");
        this.mediaPhotographersApi = new mediaPhotographersApi("../data/photographers.json");
        this.photographerId = new URLSearchParams(window.location.search).get("id");
    }
    async getPhotographerById(){
        const photographerList = await this.photographersApi.getPhotographers();
        // console.log(photographerList)
        const filterPhotographer = photographerList.filter(photographer => {
            return photographer.id == this.photographerId;
        }
         );
       
        // console.log(filterPhotographer)
         return filterPhotographer;
         
    }
    async getMediaById(){
        const mediaPhotographersList = await this.mediaPhotographersApi.getMediaPhotographers();
        // console.log(mediaPhotographersList)
        const filterMediaPhotographer = mediaPhotographersList.filter(media => {
            return media.photographerId == this.photographerId;
        }
        );
        // console.log(filterMediaPhotographer)
        return filterMediaPhotographer;
    }
    photographerHeader(photographer) {
         const header = document.querySelectorAll('photograph-header')
         const photographerHeader = `
         <h1 class="profile_name"
         aria-label="Nom du photographe">${photographer.name}</h1>
         <h3 class="profile_origine"
         aria-label="Ville du photographe">${photographer.city}, ${photographer.country}</h3>
         <p class="profile_slogan"
         aria-label="Slogan du photographe">${photographer.tagline}</p>
     `;
     header.innerHTML = photographerHeader;
    console.log(header)
     return header;
    }

   async displayPhotographerPage(){
        const photographer = await this.getPhotographerById();
        console.log(photographer)
        const medias = await this.getMediaById();
        console.log(medias)
        const header = this.photographerHeader(photographer);
    }
}

const photographerPageTest = new photographerPage();
photographerPageTest.displayPhotographerPage();



