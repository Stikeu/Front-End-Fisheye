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




 

        // const goToPhotographers = document.createElement( 'a' );
        // goToPhotographers.setAttribute("class", "photographer-link");
        // goToPhotographers.setAttribute("aria-label", this._name);
        // goToPhotographers.href = this._id;

        // const img = document.createElement( 'img' );
        // img.setAttribute("src", this._portrait);
        // img.setAttribute("alt", this._name);
        // img.setAttribute("class", "portriat");

        // const h2 = document.createElement( 'h2' );
        // h2.setAttribute("class", "name")
        // h2.textContent = this._name;
        
        // const h3 = document.createElement( 'h3' );
        // h3.setAttribute("class", "location");
        // h3.textContent = this._city;
        // h3.textContent = this._country;
        
        // const pTagline = document.createElement("p");
        // pTagline.setAttribute("class", "tagline");
        // pTagline.textContent = this._tagline;

        // const pPrice = document.createElement("p");
        

        // article.appendChild(goToPhotographers);
        // goToPhotographers.appendChild(img);
        // goToPhotographers.appendChild(h2)
        // article.appendChild(h3);
        // return (article);