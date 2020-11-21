const saveToken = (token) =>{
    sessionStorage.setItem('idToken',token)
    const expiresIn = new Date().getTime() + 24*60*60*1000  //expired after 24 houres
    sessionStorage.setItem('expiresIn',expiresIn)
}
const fetchToken = () =>{
    const expiresIn = +sessionStorage.getItem('expiresIn')
    if(new Date().getTime() > expiresIn){
        sessionStorage.removeItem('expiresIn')
        sessionStorage.removeItem('idToken')
        return
    }
    const token = sessionStorage.getItem('idToken')
    return token
}
const clearToken = () =>{
    sessionStorage.removeItem('expiresIn')
    sessionStorage.removeItem('idToken')
}
module.exports = {
    saveToken,
    fetchToken,
    clearToken
}