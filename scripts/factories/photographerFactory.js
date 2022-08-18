class photographerFactory {
    constructor(data)
    {
        this._portrait = `../assets/photographers/Photographers ID Photos/${data.portrait}`;
        this._name = data.name;
        this._city = data.city;
        this._id = `photographer.html?id=${data.id}`;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
        console.log(data)
    }
        getUserCardDOM() {
        const article = document.createElement( 'article' );

        article.innerHTML = 
        `<a href="${this._id}" class="photographer_link" aria-label="${this._name}">
        <img src="${this._portrait}" class="portrait" alt="${this._name}">
        <h2 class="name">${this._name}</h2>
        </a>
        <h3 class="location">${this._city}, ${this._country}</h3>
        <p class="tagline">${this._tagline}</p>
        <p class="price">${this._price}€/jour</p>
      `;
    return (article);

    }
}
 export {photographerFactory};




 