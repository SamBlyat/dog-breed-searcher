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

}
