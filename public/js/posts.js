import { getPosts } from "../../utils/shared.js"
import { getFromLocalStorage ,addParamToUrl, calcuteRelativetimeDifference} from "../../utils/utils.js"
import { baseUrl } from "../../utils/shared.js"
import { getPostCategories } from "../../utils/shared.js"



window.addEventListener('load',()=>{
    const loadingContainer = document.querySelector('#loading-container')
console.log('log');
    const cities = getFromLocalStorage('cities')
    console.log(cities);
    getPosts(cities[0].id).then(response=>{
        loadingContainer.style.display='none'
        console.log(response);
        const posts =response.data.posts

        generatePosts(posts)
    })

    const generatePosts = (posts)=>{
       const postContainer = document.querySelector('#posts-container')
       if(posts.length){
        posts.forEach(post => {
          const date = calcuteRelativetimeDifference(post.createdAt)
            postContainer.insertAdjacentHTML('beforeend',`
                <div class="col-4">
              <a href="post.html/id=${post._id}" class="product-card">
                <div class="product-card__right">
                  <div class="product-card__right-top">
                    <p class="product-card__link">${post.title}</p>
                  </div>
                  <div class="product-card__right-bottom">
                    <span class="product-card__condition">${
                      post.dynamicFields[0].data
                    }</span>
                    <span class="product-card__price">
                      ${
                        post.price === 0
                          ? "توافقی"
                          : post.price.toLocaleString() + " تومان"
                      }
                    </span>
                    <span class="product-card__time">${date}</span>
                  </div>
                </div>
                <div class="product-card__left">
                ${
                  post.pics.length
                    ? `
                      <img
                        class="product-card__img img-fluid"
                        src="${baseUrl}/${post.pics[0].path}"
                      />`
                    : `
                      <img
                        class="product-card__img img-fluid"
                        src="/public/images/main/noPicture.PNG"
                      />`
                }
                  
                </div>
              </a>
            </div>
                `)
        });
       }else{
        postContainer.innerHTML = '<p class="empty">اگهی یافت نشد</p>'
       }
    }

    window.categoryClickHandler = (categoryId) =>{
        addParamToUrl('categoryId',categoryId)
    }

    getPostCategories().then((categories)=>{
    const categoriesContainer = document.querySelector('#categories-container')
    loadingContainer.style.display='none'
    categoriesContainer.innerHTML =''
    categories.forEach((category) => {
        console.log(category);
        categoriesContainer.insertAdjacentHTML(
          "beforeend",
          `
            <div class="sidebar__category-link" id="category-${category._id}">
              <div class="sidebar__category-link_details" onclick = "categoryClickHandler('${category._id}')">
                <i class="sidebar__category-icon bi bi-house"></i>
                <p>${category.title}</p>
              </div>
            </div>
          `
        );
      });



    })
})