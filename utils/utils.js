const saveInLocalStorage = (key,value)=>{
 localStorage.setItem(key,JSON.stringify(value))
}

const getFromLocalStorage = (key)=>{
   return JSON.parse(localStorage.getItem(key))
}

const addParamToUrl = (param,value)=>{
    const url = new URL(location.href)
    const searchParams = url.searchParams

    searchParams.set(param,value)
    url.search = searchParams.toString()
    location.href = url.toString()
}

const calcuteRelativetimeDifference = (createdAt) => {
const currentTime = new Date()
const createdTime = new Date(createdAt)
const timeDifference = currentTime - createdTime
const hours = Math.floor(timeDifference/(60*60*1000))
const days = Math.floor(hours/24)
if(hours<24){
return hours + " ساعت پیش"
}else{
    return days + 'روز قبل'
}


}
export {
    saveInLocalStorage,
    getFromLocalStorage,
    addParamToUrl,
    calcuteRelativetimeDifference,
}