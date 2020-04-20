URL = "http://localhost:3000/api"

export const register = (user) =>
    fetch(`${URL}/register`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(user),
        headers:{
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const login = (ltkn) =>
    fetch(`${URL}/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(ltkn),
        headers:{
            'content-type': 'application/json'
        }
    })
        .then(function(response){
            console.log(response.status)
            return response.json()})

export const getProfile = () => {
    console.log("Hello I'm here")
    const response = fetch(`${URL}/currentUser`,{
        method: 'POST',
        credentials: 'include',
    })
    console.log(response)
    return response
}

export const findUser = async (username) => {
    const response = await fetch(`${URL}/users`)
    console.log(response)
    
    return response.json()
}