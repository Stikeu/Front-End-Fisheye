class photographerFactory {
    constructor(data)
    {
        this._portrait = `../assets/photographers/${data.portrait}`;
        this._name = data.name;
        this._city = data.city;
        this._id = `photographer.html?id=${data.id}`;
        console.log(data)
    }
        getUserCardDOM() {
        const article = document.createElement( 'article' );
        const goToPhotographers = document.createElement( 'a' );
        goToPhotographers.href = this._id;
        const img = document.createElement( 'img' );
        img.setAttribute("src", this._portrait)
        const h2 = document.createElement( 'h2' );
        h2.textContent = this._name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = this._city;
        article.appendChild(goToPhotographers);
        goToPhotographers.appendChild(img);
        goToPhotographers.appendChild(h2)
        article.appendChild(h3);
        return (article);
    }
}
 export {photographerFactory};