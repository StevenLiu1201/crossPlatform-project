// contain all dog breeds (for dog breeds section)
let allBreeds = []

// dynamic url
function buildBreedUrl(parameter,value,offset){
  if (offset){
    return 'https://api.api-ninjas.com/v1/dogs?'+parameter+'='+value+'&offset='+offset;
  }else{
    return 'https://api.api-ninjas.com/v1/dogs?'+parameter+'='+value
  }
  
}
const options = {
	method: 'GET',
	headers: {
		'X-Api-Key': '8Xubu5U6AnvH7AhkVhgv0rdGMjkUZfXAf0zCS89e',
		//'X-RapidAPI-Host': 'dogs-by-api-ninjas.p.rapidapi.com'
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
    const response = await fetch(buildBreedUrl(parameter,value,offset), options)
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error)
    return null;
  }
}
//getDogs_breeds(3,'barking',20)


//getAllBreeds()
async function getAllBreeds() {

  for (let i = 1; i <= 5; i++) {

    let done = true;
    let offset = 20;

    while (done) {
      const result = await getDogs_breeds(i, 'barking', offset);
      //console.log(result);

      if (offset > 100) {
        done = false;
      } else {
        if (result.length >0){
          allBreeds.push(result);
          offset = offset + 20;
        } else {
          done = false;
        }
      }

    }
  }
  return allBreeds;
}

// Call the function to make the API calls

// getAllBreeds().then(result => {
//   console.log("All breeds:", result.flat());
//   allBreeds = allBreeds.flat()
// });


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

function getBriefAPI_byDogName(dogName){
  return `https://dogbreeds.p.rapidapi.com/api/dog-breeds/${dogName}`
}
const urlone = 'https://dogbreeds.p.rapidapi.com/api/dog-breeds/shiba-inu'
const optionsone = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ed3781ff29msha74531b722d7298p18f0a6jsn4b56e776069e',
		'X-RapidAPI-Host': 'dogbreeds.p.rapidapi.com'
	}
}

async function getOne(dogName) {
  try {
    const response = await fetch(getBriefAPI_byDogName(dogName), optionsone)
    const result = await response.json()
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
}


// function on HTML
// function to retrieve dog names

function dogsName(){
  let allDogsName = []
  for (let dogs of allBreeds) {
    if (dogs) {
      for (let dog of dogs) {
        allDogsName.push(dog.name)
      }
    }
  }
  return allDogsName
}

