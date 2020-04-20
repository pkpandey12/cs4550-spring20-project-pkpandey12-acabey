const crypto = require('crypto')
export const findSearchBytes = async(query) => {
   query = query.replace(/ /g, "%20")
   const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&utf8=&format=json&origin=*`)
   return response.json()
}

export const getBiteDetails = async(query) => {
   query = query.replace(/ /g, "_")
   query = query.replace(/%20/g, "_")
   const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=${query}&rvslots=*&rvprop=content&formatversion=2&origin=*`)
   return response.json()
}

export const getCategories = async(query) => {
   query = query.replace(/ /g, "%20")
   const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${query}&prop=categories&origin=*`)
   console.log(response)
   return response.json()
}

export const getPageExtract = async(query) => {
   query = query.replace(/ /g, "_")
   const response = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext=1&titles=${query}&origin=*`);
   console.log(response)
   return response.json()
}

// export const getPagesInCategory = async(query) => {

// }