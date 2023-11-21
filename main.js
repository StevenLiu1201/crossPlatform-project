const $dogsContainer = document.querySelector('.dogsContainer');
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

    breeds.forEach(item => {
        const $dogcard = document.createElement('div');
        $dogcard.className = 'dogcard'

        const $dogImg = document.createElement('img');
        $dogImg.className = 'dogBreedsImg'
        $dogImg.src = item.image_link
        $dogImg.alt = 'dog image'

        const $h3 = document.createElement('h3');
        $h3.className = 'dogName'
        $h3.textContent = item.name

        $dogcard.append($dogImg,$h3)
        $frag.append($dogcard)
        
    });

    $dogsContainer.append($frag)

}

const itemsPerPage = 16;
const totalPages = 10
//const totalPages = Math.ceil(dogData.length / itemsPerPage);


// render breeds by page
function showBreedsByPage(pageNumber){

    if ($dogsContainer.firstChild){
        $dogsContainer.textContent = ''
        //$dogsContainer.removeChild($dogsContainer.firstChild)

        renderBreeds(allDogBreedsTest.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage))

    }else{
        alert('Please refresh the page, to initialize')
    }
}

//pagination
function createPagination() {
    const $paginationContainer = document.getElementById('pagination');
    $paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = i;
        listItem.addEventListener('click', () => handlePaginationClick(i));
        $paginationContainer.appendChild(listItem);
    }
}

function handlePaginationClick(page) {
    showBreedsByPage(page);

    // Update active state
    const paginationItems = document.querySelectorAll('.pagination li');
    paginationItems.forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.textContent) === page) {
            item.classList.add('active');
        }
    });
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
createPagination()


