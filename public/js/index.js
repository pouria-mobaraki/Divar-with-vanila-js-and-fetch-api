import { getAllCities } from "../../utils/shared.js";

const loadingContainer = document.querySelector('#loading-container')

window.addEventListener("load", () => {
  loadingContainer.style.display ="none"
  getAllCities().then((response) => {
    const popularCitiesContainer = document.querySelector("#popular-cities");
    const popularCities = response.data.cities.filter((city) => city.popular);

    const searchInput = document.querySelector('#search-input')
    const serachResult = document.querySelector('.search-result-cities')
    searchInput.addEventListener('keyup',(event)=>{
     if(event.target.value.length){
      serachResult.classList.add('active')
      const searchResultCities = response.data.cities.filter(city=> city.name.startsWith(event.target.value))
      console.log(searchResultCities);
       if(searchResultCities.length){
        serachResult.innerHTML=''
        searchResultCities.forEach(city => {
          serachResult.insertAdjacentHTML('beforeend',`
            <li>${city.name}</li>
            `)
        })
       }

     }else{
      serachResult.classList.remove('active')
     }

    })

    popularCities.forEach((city) => {
      popularCitiesContainer.insertAdjacentHTML(
        "beforeend",
    `
        <li class="main__cities-item">
            <p class="main__cities-link">${city.name}</p>
        </li>
      `
      );
    });
  });
});
