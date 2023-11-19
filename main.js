const $dogBreedSec = document.querySelector('.dogBreed');
const $frag = document.createDocumentFragment();

// fucntions
// sort by name
function sortBreeds(breeds){
    return breeds.sort((a,b)=> a.name.localeCompare(b.name))
}

// filter by parameter
function filterBreeds(breeds,key,value){
    return breeds.filter(item => item[key] == value)
}

// render initial breeds on page
function renderBreeds(breeds){
    const $dogsContainer = document.createElement('div');
    $dogsContainer.className = 'dogsContainer'

    breeds.forEach(item => {
        const $dogcard = document.createElement('div');
        $dogcard.className = 'dogcard'

        const $h3 = document.createElement('h3');
        $h3.className = 'dogName'
        $h3.textContent = item.name

        $dogcard.append($h3)
        $dogsContainer.append($dogcard)
    });

    $frag.append($dogsContainer)
    $dogBreedSec.append($frag)

}

// render breeds by page
function showBreedsByPage(pageNumber){
    const itemsPerPage = 12;
    let $element = document.querySelector('.dogsContainer');
    if ($element){
        //$dogsContainer.innerHTML = ''
        $element.parentNode.removeChild($element);

        renderBreeds(allDogBreedsTest.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage))

    }else{
        alert('Please refresh the page, to initialize')
    }
}




// get the all dog breeds list from API
// this is for the final version
/*
getAllBreeds().then(result => {
    // sort the list
    allBreeds = sortBreeds(result.flat())
    console.log("All breeds:", allBreeds);

    // take the first 12 result and render on the page
    renderBreeds(allBreeds.slice(0,12))
    

});
*/

// temerary use test list
allDogBreedsTest = sortBreeds(allDogBreedsTest)

// initial dog breeds
renderBreeds(allDogBreedsTest.slice(0,12))


