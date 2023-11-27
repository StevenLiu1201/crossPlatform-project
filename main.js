const $dogsContainer = document.querySelector('.dogsContainer');
const $frag = document.createDocumentFragment();
const $advice_section = document.querySelector('.advice-section')
const $advice_content = document.querySelector('.dogAdvice-content')

// fucntions
// sort by name
function sortBreeds(breeds){
    return breeds.sort((a,b)=> a.name.localeCompare(b.name))
}

// filter by parameter
function filterBreeds(breeds,key,value){
    return breeds.filter(item => item[key] == value)
}


// create dog attribute obj
function createAttributesObj(dogInfo_obj){
    let attributs = {}
    attributs['Friendly with children'] = dogInfo_obj['good_with_children']
    attributs['Shedding'] = dogInfo_obj['shedding']
    attributs['Grooming'] = dogInfo_obj['grooming']
    attributs['playfulness'] = dogInfo_obj['playfulness']
    attributs['protectiveness'] = dogInfo_obj['protectiveness']
    attributs['trainability'] = dogInfo_obj['trainability']
    attributs['energy'] = dogInfo_obj['energy']
    attributs['barking'] = dogInfo_obj['barking']

    return attributs

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
const totalPages = Math.ceil(155 / itemsPerPage);
//const totalPages = Math.ceil(dogData.length / itemsPerPage);


// render breeds by page
function showBreedsByPage(pageNumber){

    if ($dogsContainer.firstChild){
        $dogsContainer.textContent = ''
        //$dogsContainer.removeChild($dogsContainer.firstChild)

        // finnally, change it to allbreeds
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

//create element for dog advice
function createHTML_dogDescribe(dogInfo_list1,attributes){
    const $frag = document.createDocumentFragment()
    

    const $div = document.createElement('div')
    $div.className='advice-imgName'

    const $img = document.createElement('img')
    $img.src = dogInfo_list1.image_link
    $img.alt = 'picture of dog'

    const $span = document.createElement('span')
    $span.textContent = dogInfo_list1.name

    $div.append($img,$span)


    const $attContainer = document.createElement('div')
    $attContainer.className = "dogAttributes_container"

    for (const a in attributes) {
       const $attri = document.createElement('div')
       $attri.className = 'attribute'
   
       const $attri_name = document.createElement('h4')
       $attri_name.textContent = a
   
       const $attri_star = document.createElement('span')
       $attri_star.className = 'stars'
       $attri_star.classList.add(`level-${attributes[a]}`)
   
       $attri.append($attri_name,$attri_star)
       $attContainer.append($attri)
    }

    const $attri = document.createElement('div')
    $attri.className = 'attribute'

    const $attri_name = document.createElement('h4')
    $attri_name.textContent = 'Max life expectancy'

    const $attri_value = document.createElement('span')
    $attri_value.textContent = dogInfo_list1['max_life_expectancy']

    $attri.append($attri_name,$attri_value)
    $attContainer.append($attri)


    // description
    const $description = document.createElement('div')
    $description.className = 'advice-description'

    const $desc_content = document.createElement('p')
    $desc_content.textContent = 'dog description and advice. create this from new API'

    $description.append($desc_content)


    $frag.append($div,$attContainer,$description)
    return $frag

}

// create the HTML element for the secound part in dog advice
function createHTML_dogAdvice(dogName){
    const $frag = document.createDocumentFragment();

    let describesParagraph = ''
    // get dog slug based on dog name
    const dog = allDogBreeds.filter(item => item['name'] == dogName)
    // if find the dog slug
    if(dog.length>0){
        const dogSlug = dog[0]['slug']
        console.log(dogSlug);

        // get the return from new API
        /*
        getOne(dogSlug).then(result => {
            console.log(result);
            // if not return
            if(result[0]['more_about'].length > 0){
                const descripContents_list = result[0]['more_about'][0]['more_about_description']
                console.log(descripContents_list);
                descripContents_list.forEach(des => describesParagraph += des['description'])
                console.log(describesParagraph);
            }else{
                console.log('sorry, there is no description find from API');
                describesParagraph = "Raising a happy and healthy dog involves providing a balanced diet, regular exercise, and veterinary care. Early training and socialization are crucial, along with grooming and mental stimulation. Create a safe and comfortable environment, use positive reinforcement for good behavior, and invest time in building a strong bond through love and attention. Be patient, consistent, and prepared for emergencies, ensuring your dog's well-being and a fulfilling companionship."
            }

        })
        */
       
    }else{
        console.log('no find dog slug'); 
        describesParagraph = "Raising a happy and healthy dog involves providing a balanced diet, regular exercise, and veterinary care. Early training and socialization are crucial, along with grooming and mental stimulation. Create a safe and comfortable environment, use positive reinforcement for good behavior, and invest time in building a strong bond through love and attention. Be patient, consistent, and prepared for emergencies, ensuring your dog's well-being and a fulfilling companionship."
    }

    const $p = document.createElement('p')
    $p.textContent = describesParagraph
    $frag.append($p)

  


    return $frag

}

// handle dogcard click
function showDogAdvice_byElement(e){
    console.log(e);
    const dogName = e.querySelector('.dogName').textContent

    // finally, change the allDogBreedsTest to all breeds from api
    const dogDetail_list = filterBreeds(allDogBreedsTest,'name',dogName)
    console.log(dogDetail_list);

    // prepare info for rendering
    const attributes = createAttributesObj(dogDetail_list[0])

    // get the html for dogDescribe
    const $dogDescribe = createHTML_dogDescribe(dogDetail_list[0],attributes)

    //get the html for brief for the dog from other API
    const $dogAdvice = createHTML_dogAdvice(dogName)

    //render on the page
    $advice_content.innerHTML=''
    $advice_content.append($dogDescribe,$dogAdvice)


    
}









// get the all dog breeds list from API
// this is for the final version

/*
getAllBreeds().then(result => {
    // sort the list
    allBreeds = sortBreeds(result.flat())
    console.log("All breeds:", allBreeds);

    // take the first 12 result and render on the page
    renderBreeds(allBreeds.slice(0,16))

    //create pagination
    createPagination()

    // add handler on dog cards
    document.querySelector('.dogsContainer').addEventListener('click',function(e){
        showDogAdvice_byElement(e.target.closest('.dogcard'))
    })
    

});
*/

// temerary use test list
allDogBreedsTest = sortBreeds(allDogBreedsTest)

// initial dog breeds
renderBreeds(allDogBreedsTest.slice(0,16))
createPagination()

document.querySelector('.dogsContainer').addEventListener('click',function(e){
    showDogAdvice_byElement(e.target.closest('.dogcard'))
})


