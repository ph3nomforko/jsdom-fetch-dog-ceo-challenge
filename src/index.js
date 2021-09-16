console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let breeds = []

document.addEventListener("DOMContentLoaded", function() {
    getDogImages();
    getDogBreeds();
});

function getDogImages() {
    const dogImgContainer = document.getElementById('dog-image-container');
    fetch(imgUrl)
    .then((response) => response.json())
    .then((json) => {
        for (const item of json.message) {
            const img = document.createElement('img');
            img.src = item;
            img.height = "100";
            img.width = "100";
            dogImgContainer.appendChild(img);
        }
    });
}

function getDogBreeds() {
    const breedsList = document.getElementById('dog-breeds');
    fetch(breedUrl)
    .then((response) => response.json())
    .then((json) => {
        for (const key in json.message) {
            breeds.push(key);
            const li = document.createElement('li');
            li.innerText = key;
            breedsList.appendChild(li);
            li.addEventListener('click',function(event) {
                event.target.style.color = "orange";
            })
        }
    })
    filterBreed();
}

function filterBreed() {
    const breedSelectList = document.getElementById('breed-dropdown');
    breedSelectList.addEventListener('change', function(event) {
        console.log(event.target.value);
        const breedList = document.getElementById('dog-breeds')
        while (breedList.firstChild) {
            breedList.removeChild(breedList.firstChild);
        }
        for (const item of breeds) {
            if (event.target.value == "All") {
                const li = document.createElement('li');
                li.innerText = item;
                breedList.appendChild(li);
            } else if (item.startsWith(event.target.value)) {
                const li = document.createElement('li');
                li.innerText = item;
              breedList.appendChild(li);
            }
        }
        console.log(breeds);
    })
} 