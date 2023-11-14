

const url = 'https://dogs-by-api-ninjas.p.rapidapi.com/v1/dogs?name=golden%20retriever';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bbda02016amshccb22789404656cp117221jsn2390d8e2f0c8',
		'X-RapidAPI-Host': 'dogs-by-api-ninjas.p.rapidapi.com'
	}
}

async function getDog() {
  try {
    const response = await fetch(url, options)
    const result = await response.text()
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
}

const urlAll = 'https://dogbreeds.p.rapidapi.com/api/dog-breeds/list/profiles'
const optionsAll = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bbda02016amshccb22789404656cp117221jsn2390d8e2f0c8',
		'X-RapidAPI-Host': 'dogbreeds.p.rapidapi.com'
	}
}

async function getAll() {
  try {
    const response = await fetch(urlAll, optionsAll)
    const result = await response.text()
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
}

const urlone = 'https://dogbreeds.p.rapidapi.com/api/dog-breeds/shiba-inu'
const optionsone = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bbda02016amshccb22789404656cp117221jsn2390d8e2f0c8',
		'X-RapidAPI-Host': 'dogbreeds.p.rapidapi.com'
	}
}

async function getOne() {
  try {
    const response = await fetch(urlone, optionsone)
    const result = await response.text()
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
}
