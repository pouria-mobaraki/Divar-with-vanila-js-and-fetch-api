import { fetchPopularCities,setCityCookie,getCityCookie, fetchCities } from "./utils/cities.js";

const popularCitiesParent = document.querySelector('.main__cities-list .row')
const cityInputSearch = document.querySelector('.main__input')

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

const loadCityPost =(cityCookie)=>{
if(cityCookie){
    window.location.href = `http://127.0.0.1:5500/front/pages/main.html?city=${cityCookie}` 
}
}

const citySearchHandler =(event)=>{
  console.log(event.target.value);
}

window.cityClickHandler = cityClickHandler

cityInputSearch.addEventListener('keyup',(event)=>citySearchHandler(event))

window.addEventListener('load',async () => {

const popularCities = await fetchPopularCities()
showPopularCities(popularCities)
const cityCookie = getCityCookie();
loadCityPost(cityCookie)
const cities = await fetchCities()

})