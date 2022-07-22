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
        const figure = document.createElement("figure");
        const figcaption = document.createElement("figcaption");
        const p = document.createElement("p");
        const video = document.createElement("video");
        const source = document.createElement("source");
        source.setAttribute("src", this._mediaPath);
        source.setAttribute("alt", this._name);
        video.setAttribute("class", "video")
        video.appendChild(source);
        p.textContent = this._name
        figure.appendChild(figcaption);
        figcaption.appendChild(video);
        figcaption.appendChild(p);
        return (figure);
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
        const figure = document.createElement("figure");
        const figcaption = document.createElement("figcaption");
        const p = document.createElement("p");
        const image = document.createElement("img");
        console.log(this._photographerName)
        image.setAttribute("src", this._mediaPath );
        image.setAttribute("alt", this._name );
        p.textContent = this._name
        figure.appendChild(figcaption);
        figcaption.appendChild(image);
        figcaption.appendChild(p);
        return (figure);
    }

}

export {mediaFactory}
export {PhotographerImage}
export {PhotographerVideo}