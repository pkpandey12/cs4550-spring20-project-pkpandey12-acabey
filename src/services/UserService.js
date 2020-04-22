URL = "https://cs4550pkpandeyprojserver.herokuapp.com/api"

export const updateUser = async(userId, update) => 
    fetch(`${URL}/users/update/${userId}`,{
        method: "POST",
        body: JSON.stringify(update),
        headers:{
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
    

export const register = (user) =>
    fetch(`${URL}/register`, {
        method: 'POST',
        // credentials: 'include',
        body: JSON.stringify(user),
        headers:{
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const login = (ltkn) =>
    fetch(`${URL}/login`, {
        method: 'POST',
        // credentials: 'include',
        body: JSON.stringify(ltkn),
        headers:{
            'content-type': 'application/json'
        }
    })
        .then(function(response){
            console.log(response.status)
            return response.json()})

export const getProfile = async () => {
    console.log("Hello I'm here")
    const response = await fetch(`${URL}/currentUser`,{
        method: 'POST',
        // credentials: 'include',
    })
    // console.log(response.json())
    return response
}

export const findUser = async (username) => {
    const response = await fetch(`${URL}/users`)
    console.log(response)
    
    return response.json()
}

export const findUserbyId = async(userId) => {
    const response = await fetch(`${URL}/users/${userId}`)
    console.log(response)
    return response.json()
}

export const removeUser = (userId) =>
    fetch(`${URL}/users/delete/${userId}`,{
        method: "DELETE"
    })
        .then(response => response.json())