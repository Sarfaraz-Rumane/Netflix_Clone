
const apikey = "5c2effa08ae4a936a1f4797e86127113"
const apiEndpoint = "https://api.themoviedb.org/3"
const imgPath="https://image.tmdb.org/t/p/original";
const apiPaths ={
    fetchAllCategories:`${apiEndpoint}/movie/11?api_key=${apikey}`,
    fetchMovieList : (id)=>`${apiEndpoint}/genre/movie/list?api_key=${apikey}&with_genres=$(id)`,

    fetchTrending:`${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,

}

function init(){
    fetchAndbuildMovieSection(apiPaths.fetchTrending,'Trending Now');
fetchAndBuildAllSections();
}
function fetchAndBuildAllSections(){
    fetch(apiPaths.fetchAllCategories)
    .then(res => res.json())
    .then(res => {
        const categories = res.genres;
        if (Array.isArray(categories)&& categories.length){
           categories.forEach(category =>{
            fetchAndbuildMovieSection(
                apiPaths.fetchMovieList(category.id) ,category);
                category.name
           });
        }
        // console.table(movies);
    })
    .catch(err=>console.error(err));
}

function fetchAndbuildMovieSection(fetchUrl, categoryName){
console.log(fetchUrl,categoryName);
fetch(fetchUrl)
.then(res => res.json())
.then(res => {
    console.table(res);
const movies = res;
if (Array.isArray(movies)&& movies, categoryName){

}
})
.catch(err=>console.error(err));
}

function buildMoviesSection(List, categoryName){
    console.log(List, categoryName);

    const moviecont = document.getElementById('movies-cont');
   
   const moviesListHTML = List.map(item => {
        return `
        <img class="movie-item" src="${imgPath}${item.backdrop.path}" alt="${item.title}" >

        `;
        
    })
    const movieSectionHTML = `
   <div class="moviesection">
            <h2 class="movie-heading">${categoryName}<span class="explore">Explore all</span></h2>
        
        <div class="movies-row">
                ${moviesListHTML}
            </div>
            </div>
            `
    console.log(movieSectionHTML);

    const div = document.createElement('div');
div.className = "moviesection"
div.innerHTML = movieSectionHTML;
// append html into movies container
    moviecont.append(div) 
}

window.addEventListener('load',function(){
    init();
})