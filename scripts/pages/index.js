    import { photographersApi } from "../api/api.js";
    import { photographerFactory } from "../factories/photographerFactory.js";

    class indexTemplate {
        constructor(){
            this.photographersApi = new photographersApi("../data/photographers.json")

        }
        async displayData(photographers) {
            const listPhotographers = await this.photographersApi.getPhotographers();
            const photographersSection = document.querySelector(".photographer_section");
    
            listPhotographers.forEach((photographer) => {
                const photographerModel = new photographerFactory(photographer);
                const userCardDOM = photographerModel.getUserCardDOM() ;
                console.log(photographerModel);
                photographersSection.appendChild(userCardDOM);
                
            });
        };
    
        async  init() {
            // Récupère les datas des photographes
                displayData();
                console.log(photographers.getPhotographers())
        };
        
    }
    
   
    const indextemplate = new indexTemplate();
    indextemplate.displayData();
    