const apiKey = "live_IPqDWsRWrI8dCQo0jx6X4ht2424xDe2Kf6k4s0XnuUBneU33Y9ggLGyMiGI0QqVn";
const randomURL = `https://api.thedogapi.com/v1/images/search?limit=20`

const searchField = document.getElementById("search-bar");

fetch(randomURL,{headers: {
    'x-api-key': apiKey
  }})
.then((response) => {
 return response.json();
})
.then((data) => {
let imagesData = data;
imagesData.map(function(imageData) {
  
  let image = document.createElement('img');
  //use the url from the image object
  image.src = `${imageData.url}`;
      
  let gridCell = document.createElement('div');
  gridCell.classList.add('col');
  gridCell.classList.add('col-lg');
  gridCell.appendChild(image)
    
  document.getElementById('gallery').appendChild(gridCell);
  });
})

function SearchDogs() {
    while (document.getElementById("gallery").firstChild) {
        document.getElementById("gallery").removeChild(document.getElementById("gallery").firstChild);
    }
    let breedName = searchField.value;
  let searchURL = `https://api.thedogapi.com/v1/breeds/search?q=${breedName}`;
  fetch(searchURL,{headers: {
    'x-api-key': apiKey
  }})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.length === 0) {
      let error = document.createElement('p');
      error.textContent = 'No results found';
      document.getElementById('gallery').appendChild(error);
      return;
    }
    let breedId = data[0].id;
    let imagesURL = `https://api.thedogapi.com/v1/images/search?breed_id=${breedId}`;
    fetch(imagesURL,{headers: {
      'x-api-key': apiKey
    }})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        let error = document.createElement('p');
        error.textContent = 'No results found';
        document.getElementById('gallery').appendChild(error);
        return;
      }
      let imagesData = data;
      imagesData.sort(function(a,b){
        if(a.id < b.id) { return -1; }
        if(a.id > b.id) { return 1; }
        return 0;
      });
      let closestDog = imagesData[0];
      let image = document.createElement('img');
      image.id = "searchImg"
      image.src = `${closestDog.url}`;
      let gridCell = document.createElement('div');
      gridCell.classList.add('srch-col');
      gridCell.classList.add('srch-col-lg');
      gridCell.appendChild(image)
      document.getElementById('gallery').appendChild(gridCell);
    });
  })
  .catch((error) => {
    console.error(error);
  });
}

function closestMatch(str, arr) {
  return arr.reduce(function(prev, curr) {
    return (Math.abs(curr.length - str.length) < Math.abs(prev.length - str.length) ? curr : prev);
  });
}

document.querySelector('input').addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
    }
});