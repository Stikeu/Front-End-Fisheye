import {
    photographersApi
} from "../api/api.js";
import {
    mediaPhotographersApi
} from "../api/api.js";
import {
    mediaFactory
} from "../factories/mediaFactory.js";
import {
    lightbox
} from "../utils/lightbox.js"
const mediaSection = document.querySelector(".media_section")
class photographerPage {

    constructor() {
        this.photographersApi = new photographersApi("../data/photographers.json");
        this.mediaPhotographersApi = new mediaPhotographersApi("../data/photographers.json");
        this.photographerId = new URLSearchParams(window.location.search).get("id");

    }
    //Récupération Photographer par id
    async getPhotographerById() {
        const photographerList = await this.photographersApi.getPhotographers();
        const filterPhotographer = photographerList.filter(photographer => {
            return photographer.id == this.photographerId;
        });
        return filterPhotographer;

    }
    // Récupération Nom photographer par l'id 
    async getPhotographerNameById() {
        const photographer = await this.getPhotographerById();
        const photographerName = photographer[0].name
        return photographerName
    }
    // Récupération des médias du photographer par l'id
    async getMediaById() {
        const mediaPhotographersList = await this.mediaPhotographersApi.getMediaPhotographers();
        const filterMediaPhotographer = mediaPhotographersList.filter(media => {
            return media.photographerId == this.photographerId;
        });
        return filterMediaPhotographer;
    }

    // Affichage du header de la page photographer (Photo, nom,prénom,vile, phrase) avec le bouton contact
    photographerHeader(photographer, media) {
        const header = document.querySelector('.photograph-header');
        const div = document.createElement('div');
        const contactButton = document.querySelector('.contact_button');
        const divImage = document.createElement('div');
        const img = "../assets/photographers/Photographers ID Photos/"
        const allLikes = document.createElement("div");
        const image = `<img class="portrait" alt="${photographer[0].name}" src="${img}/${photographer[0].portrait}"> `
        const photographerHeader = `
         <h1 class="profile_name"
         aria-label="Nom du photographe">${photographer[0].name}</h1>
         <h3 class="profile_origine"
         aria-label="Ville du photographe">${photographer[0].city}, ${photographer[0].country}</h3>
         <p class="profile_slogan"
         aria-label="Slogan du photographe">${photographer[0].tagline}</p>
     `;
        div.innerHTML = photographerHeader;
        divImage.innerHTML = image;
        header.appendChild(div)
        header.appendChild(divImage)
        header.insertBefore(div, contactButton)

        allLikes.innerHTML = `<div id="totals-likes"><p id="total-likes">${media}</p><p>🖤</p></div>
                            <p>${photographer[0].price}€ / jour</p>`;

        allLikes.classList.add("photographer-likes");
        header.appendChild(allLikes)
        return header;
    }


    //Affichage des media du photographer par l'id
    async displayMedia() {
        const photographerMedia = await this.getMediaById();
        const name = await this.getPhotographerNameById();
        photographerMedia.forEach((media) => {
            const mediaModel = new mediaFactory(media, name)
            mediaSection.appendChild(mediaModel);
            lightbox();
        })
        this.addLike();
    }

    //Affichage des medias après le trie 
    async displayMediaOrder(media) {
        const photographerMedia = media;
        const name = await this.getPhotographerNameById();
        photographerMedia.forEach((media) => {
            const mediaModel = new mediaFactory(media, name);
            mediaSection.appendChild(mediaModel);
            lightbox();

        })
        this.addLike()
    }
    // trie des media 
    orderMedia(media) {
        const selectElement = document.getElementById("chooseOrder");
        selectElement.addEventListener("click", (e) => {
            media = this.trie(e.target.value, media);
            document.querySelector(".media_section").innerHTML = "";
            this.displayMediaOrder(media);
        })
        this.addLike()
    }
    trie(option, media) {
        switch (option) {
            case 'popularity':
                return media.sort(function (a, b) {
                    if (a.likes > b.likes) {
                        return -1;
                    }
                    if (a.likes < b.likes) {
                        return 1;
                    }
                    return 0;
                })
            case 'date':
                return media.sort(function (a, b) {
                    if (a.date < b.date) {
                        return -1;
                    }
                    if (a.date > b.date) {
                        return 1;
                    }
                    return 0;
                })
            case 'title':
                return media.sort(function (a, b) {
                    if (a.title < b.title) {
                        return -1;
                    }
                    if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                })
            default:
                return media;
        }
    }

    // Gestion des likes sur les photos du media 
    addLike() {
        const Likes = document.querySelectorAll(".image_likes");
        let totalLikes = document.getElementById("total-likes");
        Likes.forEach((like) => {
            like.addEventListener("click", (e) => {
                let likesValue = like.querySelector(".likes_number");
                let likesNumber = +likesValue.textContent;
                let totalNumber = +totalLikes.textContent;
                like.classList.toggle("active");
                if (like.classList.contains("active")) {
                    likesValue.textContent = ++likesNumber;
                    totalLikes.textContent = ++totalNumber
                } else {
                    likesValue.textContent = --likesNumber;
                    totalLikes.textContent = --totalNumber
                    like.classList.remove("active");
                }
            });
        });
    }

    // calcul du nombre de likes sur les photos (résultat en bas a droite de la page)
    async sumOfAllLikes() {
        const filterMediaPhotographer = await this.getMediaById();
        const likesTab = filterMediaPhotographer.map(media => media.likes).reduce((acc, amount) => acc + amount);
        return likesTab;
    }
    //affichage général de la page
    async displayPhotographerPage() {
        const photographer = await this.getPhotographerById();
        const PhotographerNameById = await this.getPhotographerNameById();
        const likesTab = await this.sumOfAllLikes();
        const medias = await this.getMediaById();
        const header = this.photographerHeader(photographer, likesTab);
        this.orderMedia(medias);
        this.displayMedia();
        lightbox();

    }
}

export {
    photographerPage
}
const photographerPageTest = new photographerPage();
photographerPageTest.displayPhotographerPage();
photographerPageTest.addLike();