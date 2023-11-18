

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
  let allBreeds = [];

  for (let i = 1; i <= 5; i++) {

    let done = true;
    let offset = 20;
    let num = 10

    while (done) {
      const result = await getDogs_breeds(i, 'barking', offset);
      console.log(result);

      if (!result || result.length === 0) {
        done = false;
      } else {
        allBreeds.push(result);
        offset = offset + 20;
      }
      // num is for protect infinit looping 
      num = num +1
      if(num >2){
        done = false
      }

    }
  }
  return allBreeds;
}

// Call the function to make the API calls
/*
getAllBreeds().then(result => {
  console.log("All breeds:", result);
});
*/

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
