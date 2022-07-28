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
        const namePhotographer = this._photographerName.split(" ");
        const pathName = namePhotographer[0].replace("-"," ");
        this._mediaPath = `../assets/photographers/${pathName}/${this._video}`;
        console.log(data)
    }
    photographerVideoCard(){
        const article = document.createElement("article");
        const div = document.createElement("div");
        div.innerHTML = 
        `<p class="video_titre">${this._name}</p>
        <source src="${this._mediaPath}" alt="${this._name}"
            <video class="video_image">
        >`;
        article.appendChild(div)
        article.classList.add("article")
        return (article);
    }
}
class PhotographerImage{
    constructor(data, photographerName){
        this._photographerName = photographerName;
        this._name = data.title;
        this._image = data.image;
        const namePhotographer = this._photographerName.split(" ");
        const pathName = namePhotographer[0].replace("-"," ");
        this._mediaPath = `../assets/photographers/${pathName}/${this._image}`;
        
    }
    photographerImageCard(){
        const article = document.createElement("article");
        const div = document.createElement("div");
        div.innerHTML = 
        `<p class="image_titre">${this._name}</p>
        <img src="${this._mediaPath}" alt="${this._name}" class="video_image">`;
        div.classList.add("contenue")
        article.appendChild(div)
        article.classList.add("article")
        return (article);
    }

}

export {mediaFactory}
export {PhotographerImage}
export {PhotographerVideo}