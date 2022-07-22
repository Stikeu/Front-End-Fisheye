//Mettre le code JavaScript lié à la page photographer.html
import { photographersApi } from "../api/api.js";
import { mediaPhotographersApi } from "../api/api.js";
import {mediaFactory} from "../factories/mediaFactory.js";

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
    async getPhotographerNameById(){
        const photographer  = await this.getPhotographerById();
        const photographerName = photographer[0].name
        console.log(photographer);
        return photographerName
    }
    async getMediaById(){
        const mediaPhotographersList = await this.mediaPhotographersApi.getMediaPhotographers();
        // console.log(mediaPhotographersList)
        const filterMediaPhotographer = mediaPhotographersList.filter(media => {
            return media.photographerId == this.photographerId;
        }
        );
       console.log(filterMediaPhotographer)
        return filterMediaPhotographer;
    }
    photographerHeader(photographer) {
         const header = document.querySelector('.photograph-header');
         const div = document.createElement('div');
         const img = "../assets/photographers/Photographers ID Photos/"
         console.log(header);
         // faire accesibilité img + css 
         const photographerHeader = `
         <img src = "${img}/${photographer[0].portrait}">
         <h1 class="profile_name"
         aria-label="Nom du photographe">${photographer[0].name}</h1>
         <h3 class="profile_origine"
         aria-label="Ville du photographe">${photographer[0].city}, ${photographer[0].country}</h3>
         <p class="profile_slogan"
         aria-label="Slogan du photographe">${photographer[0].tagline}</p>
     `;
     div.innerHTML = photographerHeader;
     header.appendChild(div)
    console.log(header)
     return header;
    }

    async displayMedia(media){
        const photographerMedia = await this.getMediaById();
        const name = await this.getPhotographerNameById();
        console.log(name)
        const mediaSection = document.querySelector(".media_section")
        console.log(photographerMedia)
       photographerMedia.forEach((media) => {
            const mediaModel = new mediaFactory(media, name)
            
            mediaSection.appendChild(mediaModel);
        })
    }
   async displayPhotographerPage(){
        const photographer = await this.getPhotographerById();
        const PhotographerNameById = await this.getPhotographerNameById();
        console.log(PhotographerNameById)
        console.log(photographer)
        const medias = await this.getMediaById();
        console.log(medias)
        const header = this.photographerHeader(photographer);
        console.log(header)
        this.displayMedia()

        
    }
}

const photographerPageTest = new photographerPage();
photographerPageTest.displayPhotographerPage();



