const fetchPopularCities = async () => {
    const res = await fetch('http://localhost:4000/api/cities/popular')
    const popularCities = await res.json()
    return popularCities
}


export {fetchPopularCities};