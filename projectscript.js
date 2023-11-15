

// dynamic url
function buildBreedUrl(parameter,value,offset){
  if (offset){
    return 'https://dogs-by-api-ninjas.p.rapidapi.com/v1/dogs?'+parameter+'='+value+'&offset='+offset;
  }else{
    return 'https://dogs-by-api-ninjas.p.rapidapi.com/v1/dogs?'+parameter+'='+value
  }
  
}
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bbda02016amshccb22789404656cp117221jsn2390d8e2f0c8',
		'X-RapidAPI-Host': 'dogs-by-api-ninjas.p.rapidapi.com'
	}
}

async function getDogbyName_breeds(value,parameter='name') {
  try {
    const response = await fetch(buildBreedUrl(parameter,value), options)
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error)
  }
}
//getDogbyName_breeds('golden%20retriever')

async function getDogs_breeds(value,parameter,offset) {
  try {
    console.log(buildBreedUrl(parameter,value,offset));
    const response = await fetch(buildBreedUrl(parameter,value,offset), options)
    const result = await response.json()
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
}
getDogs_breeds(3,'barking',20)



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
    const result = await response.json()
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
    const result = await response.json()
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
}
