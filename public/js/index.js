import { getAllCities } from "../../utils/shared.js";
import { saveInLocalStorage } from "../../utils/utils.js";

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
            <li onclick="cityClickHandler('${city.name}','${city.id}')">${city.name}</li>
            `)
        })
       }else {
        serachResult.innerHTML=''
        serachResult.insertAdjacentHTML('beforeend',`
          <img src="https://support-faq.divarcdn.com/web/2024/03/static/media/magnifier.7f88b2e3f8ae30f4333986d0b0fbcf1d.svg" />
              <p class="empty">نتیجه‌ای برای جستجوی شما پیدا نشد.</p>
          `)
       }

     }else{
      serachResult.classList.remove('active')
     }

    })

    popularCities.forEach((city) => {
      popularCitiesContainer.insertAdjacentHTML(
        "beforeend",
    `
        <li class="main__cities-item" onclick="cityClickHandler('${city.name}','${city.id}')">
            <p class="main__cities-link">${city.name}</p>
        </li>
      `
      );
    });
    window.cityClickHandler = (cityName,cityId)=> {
      saveInLocalStorage('city',{name:cityName , id:cityId})
      location.href = '/pages/post.html'
    }

  });
});
