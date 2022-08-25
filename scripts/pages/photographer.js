import {
    photographersApi
} from "../api/api.js";
import {
    mediaPhotographersApi
} from "../api/api.js";
import {
    mediaFactory
} from "../factories/mediaFactory.js";

class photographerPage {

    constructor(data) {
        this.photographersApi = new photographersApi("../data/photographers.json");
        this.mediaPhotographersApi = new mediaPhotographersApi("../data/photographers.json");
        this.photographerId = new URLSearchParams(window.location.search).get("id");

    }

    async getPhotographerById() {
        const photographerList = await this.photographersApi.getPhotographers();
        // console.log(photographerList)
        const filterPhotographer = photographerList.filter(photographer => {
            return photographer.id == this.photographerId;
        });

        // console.log(filterPhotographer)
        return filterPhotographer;

    }
    async getPhotographerNameById() {
        const photographer = await this.getPhotographerById();
        const photographerName = photographer[0].name
        return photographerName
    }
    async getMediaById() {
        const mediaPhotographersList = await this.mediaPhotographersApi.getMediaPhotographers();
        // console.log(mediaPhotographersList)
        const filterMediaPhotographer = mediaPhotographersList.filter(media => {
            return media.photographerId == this.photographerId;
        });
        return filterMediaPhotographer;
    }
    async sumOfAllLikes() {
        const filterMediaPhotographer = await this.getMediaById();
        const likesTab = filterMediaPhotographer.map(media => media.likes).reduce((acc, amount) => acc + amount);
        return likesTab;
    }
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



    async displayMedia(media) {
        const photographerMedia = await this.getMediaById();
        const name = await this.getPhotographerNameById();
        const mediaSection = document.querySelector(".media_section")
        photographerMedia.forEach((media) => {
            const mediaModel = new mediaFactory(media, name)
            mediaSection.appendChild(mediaModel);

        })

        this.addLike();
    }

    orderMedia(media) {
        const selectElement = document.getElementById("chooseOrder");
        const allOption = document.getElementById("allOption");
        selectElement.addEventListener("click", (e) => {
            media = this.trie(e.target.value, media);
            console.log(media);
            document.getElementById("main").removeChild(document.querySelector(".media_section"));
            this.displayMedia(media);
            console.log(this.displayMedia(media))
        })
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
                break;
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
                break;
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
                break;
            default:
                return media;
                break;
        }
    }


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
                    console.log(likesNumber)
                    totalLikes.textContent = ++totalNumber
                    console.log(totalLikes.textContent)
                } else {
                    likesValue.textContent = --likesNumber;
                    totalLikes.textContent = --totalNumber
                    like.classList.remove("active");
                }
            });
        });
    }

    async displayPhotographerPage() {
        const photographer = await this.getPhotographerById();
        const PhotographerNameById = await this.getPhotographerNameById();
        const likesTab = await this.sumOfAllLikes();
        const medias = await this.getMediaById();
        const header = this.photographerHeader(photographer, likesTab);
        this.orderMedia(medias);
        this.displayMedia();
    }
}

const photographerPageTest = new photographerPage();
photographerPageTest.displayPhotographerPage();
photographerPageTest.addLike();