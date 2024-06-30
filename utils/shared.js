const baseUrl = "https://divarapi.liara.run"

const getAllCities = async () => {
    const res = await fetch(`${baseUrl}/v1/location`)
    const cities = await res.json()

    return cities
}

const getAndShowSocials = async ()=> {
    const socialMediaContainer = document.querySelector('#footer__social-media')
    const res = await fetch(`${baseUrl}/v1/social`)
    const socialsResponse = await res.json()
    console.log(socialsResponse,res);
    socialsResponse.data.socials.forEach(social => {
        console.log(socialsResponse.data.socials);
        socialMediaContainer.insertAdjacentHTML('beforeend',`
    <a href="" class="sidebar__icon-link">
     <img src="${social.icon}" alt="${social.name}" href="${social.link}" width="18px" height="18px" class="sidebar__icon bi bi-twitter" />
    </a>
    `)
    });

}

export {
    baseUrl,
    getAllCities,
    getAndShowSocials,
}