import { getPosts } from "../../utils/shared.js"
import { getFromLocalStorage } from "../../utils/utils.js"



window.addEventListener('load',()=>{
    const loadingContainer = document.querySelector('#loading-container')
console.log('log');
    const cities = getFromLocalStorage('cities')
    console.log(cities);
    getPosts(cities[0].id).then(response=>{
        loadingContainer.style.display='none'
        console.log(response);
        const posts =response.data.posts
    })
})