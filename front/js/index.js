import { fetchPopularCities,setCityCookie } from "./utils/cities.js";

const popularCitiesParent = document.querySelector('.main__cities-list .row')

const cityClickHandler = (event,city)=>{
    event.preventDefault()
    setCityCookie(city)
    window.location.href = `http://127.0.0.1:5500/front/pages/main.html?city=${city}` 
}

const showPopularCities = (cities) => {
cities.forEach(city => {
    popularCitiesParent.insertAdjacentHTML('beforeend',`
       <div class="col-2 d-flex justify-content-center">
                <li class="main__cities-item">
                  <a class="main__cities-link" href="#" onclick="cityClickHandler(event,'${city.href}')">${city.name}</a>
                </li>
              </div> 
        `)
        console.log(city);
});
}

window.cityClickHandler = cityClickHandler

window.addEventListener('load',async () => {

const popularCities = await fetchPopularCities()
showPopularCities(popularCities)

})