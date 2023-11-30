// Created by Zhongrui Liu

const $dogsContainer = document.querySelector('.dogsContainer');
const $frag = document.createDocumentFragment();
const $advice_section = document.querySelector('.advice-section')
const $advice_content = document.querySelector('.dogAdvice-content')
const $dogAdvice_description = document.querySelector('.dogAdvice-description')
const $searchForm = document.querySelector('#searchForm')
// helper fucntions
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
    attributs['Playfulness'] = dogInfo_obj['playfulness']
    attributs['Protectiveness'] = dogInfo_obj['protectiveness']
    attributs['Trainability'] = dogInfo_obj['trainability']
    attributs['Energy'] = dogInfo_obj['energy']
    attributs['Barking'] = dogInfo_obj['barking']

    return attributs

}

// parameter
const itemsPerPage = 16;
const totalPages = Math.ceil(155 / itemsPerPage);
//const totalPages = Math.ceil(dogData.length / itemsPerPage);
let currentBreedList = allDogBreedsTest    // defalut is the breeds from API, changed after form fiter


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


// render breeds by page
function showBreedsByPage(breeds,pageNumber){
    $dogsContainer.innerHTML = ''
    renderBreeds(breeds.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage))
 
}

//pagination
function createPagination(NumOfPage) {
    const $paginationContainer = document.getElementById('pagination');
    $paginationContainer.innerHTML = '';

    for (let i = 1; i <= NumOfPage; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = i;
        listItem.addEventListener('click', () => handlePaginationClick(i));
        $paginationContainer.appendChild(listItem);
    }
}

function handlePaginationClick(page) {
    showBreedsByPage(currentBreedList,page);

    // Update active state
    const paginationItems = document.querySelectorAll('.pagination li');
    paginationItems.forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.textContent) === page) {
            item.classList.add('active');
        }
    });
}


// find your dog (form filter)
function handleFormSubmit(newBreedsList,pageNum){

    // set current breeds list 
    currentBreedList = newBreedsList

    // render on the page
    handlePaginationClick(1)

    //create the Pagination
    createPagination(pageNum)

}

// display formvalue (Create by Ka Kei Cheung)
const good_with_children_value = document.querySelector('.good_with_children_value')
const good_with_children = document.querySelector('#good_with_children')
good_with_children.addEventListener('input', ()=>good_with_children_value.textContent = $searchForm.good_with_children.value)

const shedding_value = document.querySelector('.shedding_value')
const shedding = document.querySelector('#shedding')
shedding.addEventListener('input', ()=>shedding_value.textContent = $searchForm.shedding.value)

const grooming_value = document.querySelector('.grooming_value')
const grooming = document.querySelector('#grooming')
grooming.addEventListener('input', ()=>grooming_value.textContent = $searchForm.grooming.value)

const playfulness_value = document.querySelector('.playfulness_value')
const playfulness = document.querySelector('#playfulness')
playfulness.addEventListener('input', ()=>playfulness_value.textContent = $searchForm.playfulness.value)

const protectiveness_value = document.querySelector('.protectiveness_value')
const protectiveness = document.querySelector('#protectiveness')
protectiveness.addEventListener('input', ()=>protectiveness_value.textContent = $searchForm.protectiveness.value)

const trainability_value = document.querySelector('.trainability_value')
const trainability = document.querySelector('#trainability')
trainability.addEventListener('input', ()=>trainability_value.textContent = $searchForm.trainability.value)

const energy_value = document.querySelector('.energy_value')
const energy = document.querySelector('#energy')
energy.addEventListener('input', ()=>energy_value.textContent = $searchForm.energy.value)

const barking_value = document.querySelector('.barking_value')
const barking = document.querySelector('#barking')
barking.addEventListener('input', ()=>barking_value.textContent = $searchForm.barking.value)


// create HTML element 
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

    $frag.append($div,$attContainer)
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

    // for now, will delete
    describesParagraph = "Raising a happy and healthy dog involves providing a balanced diet, regular exercise, and veterinary care. Early training and socialization are crucial, along with grooming and mental stimulation. Create a safe and comfortable environment, use positive reinforcement for good behavior, and invest time in building a strong bond through love and attention. Be patient, consistent, and prepared for emergencies, ensuring your dog's well-being and a fulfilling companionship."

    const $p = document.createElement('p')
    $p.textContent = describesParagraph

    $frag.append($p)
    return $frag
}


// event listener function
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
    $advice_content.append($dogDescribe)

    $dogAdvice_description.innerHTML = ''
    $dogAdvice_description.append($dogAdvice)

    //show up the section
    $advice_section.classList.remove('adviceHide')

    //scolling down to advice section
    $advice_section.scrollIntoView({ behavior: "smooth" });
}


// function searchBreeds (Created by Ka Kei Cheung)
function searchBreeds(input) {
    const dogName = document.querySelectorAll('.dogName')
    dogName.forEach((content)=>{
        const dogContent = content.textContent.toUpperCase()
        const dogCardContainer = content.closest('.dogcard')
        if ( dogContent.includes(input)) {
            dogCardContainer.style.display = 'block'
        } else {
            dogCardContainer.style.display = 'none'
        }
    })
}

// eventListener on the userinputs (Created by Ka Kei Cheung)
const userInput = document.getElementById('inputText')
userInput.addEventListener('input', (e)=>{
    const userInput = search.Breeds.value.toUpperCase()
    searchBreeds(userInput)
})




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
    createPagination(totalPages)

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
createPagination(totalPages)

document.querySelector('.dogsContainer').addEventListener('click',function(e){
    showDogAdvice_byElement(e.target.closest('.dogcard'))
})

// form submit
$searchForm.addEventListener('submit',function(e){
    e.preventDefault()

    //get the dog breeds list
    let newList = allDogBreedsTest
    const inputs = $searchForm.getElementsByTagName('input')
    for (const input of inputs) {
        if(input.value>0){
            newList = filterBreeds(newList,input.name,input.value)
            console.log(input.name);
            console.log(newList);
        }
    }

    let pageNum = Math.ceil(newList.length / itemsPerPage);
    handleFormSubmit(newList,pageNum)

})

//form reset
document.querySelector('#reset').addEventListener('click',function(e){

    // set value back 0
    const spans = $searchForm.getElementsByTagName('span')
    for(const ele of spans){
        ele.textContent = 0
    }

    // set current breeds list 
    currentBreedList = allDogBreedsTest

    // render on the page
    handlePaginationClick(1)

    //create the Pagination
    createPagination(totalPages)
    
})

/*
// search input  (zhongrui Liu)
function filterSearchList(breeds,content){
    return breeds.filter(item => item.name.toUpperCase().includes(content.toUpperCase()))
}

$search_input = document.getElementById('inputText')
$search_input.addEventListener('input',function(e){
    console.log($search_input.value);

    $dogsContainer.innerHTML = ''
    renderBreeds(filterSearchList(allDogBreedsTest,$search_input.value))
    
})
*/