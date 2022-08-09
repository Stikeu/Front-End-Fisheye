class mediaFactory { 
    constructor(data, photographerName){
        console.log(data)
        if (data.video != undefined) {
            return (new PhotographerVideo(data, photographerName)).photographerVideoCard();
        } else if(data.image != undefined) {
            return (new PhotographerImage(data, photographerName)).photographerImageCard();
        } else {
            throw "Le format du media n'est pas définit "
        }
        
    }

}

class PhotographerVideo{
    constructor(data, photographerName){
        this._photographerName = photographerName;
        this._name = data.title;
        this._video = data.video;
        this._likes = data.likes;
        const namePhotographer = this._photographerName.split(" ");
        const pathName = namePhotographer[0].replace("-"," ");
        this._mediaPath = `../assets/photographers/${pathName}/${this._video}`;
        console.log(data)
    }
    photographerVideoCard(){
        const article = document.createElement("article");
        const div = document.createElement("div");
        const img_video = document.createElement("div");
        img_video.innerHTML = `<video controls alt="${this._name}"
        <source class="video_image" src="${this._mediaPath}" type="video/mp4">
        >`
        div.innerHTML = 
        `<p class="video_titre">${this._name}</p>
        <div class="image_likes" aria-label="likes">
            <span class="likes_number">${this._likes}</span>
            <img src="assets/icons/heart.png" class="likes_heart" alt="heart icon">
        </div>`;
        div.classList.add("contenue");
        article.appendChild(img_video);
        article.appendChild(div);
        article.classList.add("article");
        return (article);
    }
}
class PhotographerImage{
    constructor(data, photographerName){
        this._photographerName = photographerName;
        this._name = data.title;
        this._image = data.image;
        this._likes = data.likes;
        const namePhotographer = this._photographerName.split(" ");
        const pathName = namePhotographer[0].replace("-"," ");
        this._mediaPath = `../assets/photographers/${pathName}/${this._image}`;
        
    }
    photographerImageCard(){
        const article = document.createElement("article");
        const div = document.createElement("div");
        const img_video = document.createElement("div");
        img_video.innerHTML = `<img src="${this._mediaPath}" alt="${this._name}, closeup view" class="video_image">`
        div.innerHTML = 
        `<p class="image_titre">${this._name}</p>
        <div class="image_likes" aria-label="likes">
            <span class="likes_number">${this._likes}</span>
            <img src="assets/icons/heart.png" class="likes_heart" alt="heart icon">
        </div>`;
        div.classList.add("contenue")
        article.appendChild(img_video);
        article.appendChild(div)
        article.classList.add("article")
        return (article);
    }

}

export {mediaFactory}
export {PhotographerImage}
export {PhotographerVideo}