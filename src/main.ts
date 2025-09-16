interface Rating {
    Source: string;
    Value: string;
}

interface Post {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

interface OmdbError {
    Response: "False";
    Error: string;
}

//throws error if element is not found
const $ = <T extends Element>(sel: string) => {
    const ele = document.querySelector<T>(sel);
    if (!ele) throw new Error(`Missing element: $(sel)`);
    return ele;
}

type OmdbOk = Post & { Response:"True"};
type OmdbErr = { Response: "False"; Error: string };
type OmdbResult = OmdbOk | OmdbErr;

function isOmdbOk(x: OmdbResult): x is OmdbOk {
    return x.Response === "True";
}

const searchMovie = $('#search') as HTMLInputElement;
const yearSearch = $('#year-search') as HTMLInputElement;
let movie = searchMovie.value;


window.addEventListener("DOMContentLoaded", () => {
    form.dispatchEvent(new Event("submit", {cancelable: true}));
});

// if movie.something returns a value of "N/A" (still a truthy value) it will render nothing so these 2 functions make sure the element on the page will not render if value is "N/A"
function displayText(element: HTMLElement | null, value: string) {
    if (element) element.textContent = (value && value !== "N/A") ? value: "";
}
// If poster src = "N/A" displays a default image from assets folder
function displaySrc(img: HTMLImageElement | null, value: string) {
    if (img) img.src = (value && value !== "N/A") ? value : "/assets/no-poster.htm";
}

const form = $('#search-form') as HTMLFormElement;
//renders new movie when form is submited 
form.addEventListener("submit", function(e) {
    e.preventDefault();
fetchMovie()
        .then(movie => {

            displayText(movieTitle, movie.Title);
            displayText(movieYear, movie.Year);
            displayText(movieRated, movie.Rated);
            displayText(moviePlot, movie.Plot);
            displayText(movieDirector, movie.Director);
            displayText(movieWriter, movie.Writer);
            displayText(movieActors, movie.Actors);
            displaySrc(moviePoster, movie.Poster);


            // movieTitle? movieTitle.textContent = movie.Title : null;
            // movieYear? movieYear.textContent = movie.Year : null;
            // movieRated? movieRated.textContent = movie.Rated : null;
            // moviePlot? moviePlot.textContent = movie.Plot : null;
            // moviePoster? moviePoster.src = movie.Poster : null;
            // movieDirector? movieDirector.textContent = movie.Director : null;
            // movieWriter? movieWriter.textContent = movie.Writer : null;
            // movieActors? movieActors.textContent = movie.Actors : null;


            movieRatingSource1.textContent = movie.Ratings[0]?.Source ?? "";
            movieRatingSource2.textContent = movie.Ratings[1]?.Source ?? "";
            movieRatingSource3.textContent = movie.Ratings[2]?.Source ?? "";

            movieRating1.textContent = movie.Ratings[0]?.Value ?? "";
            movieRating2.textContent = movie.Ratings[1]?.Value ?? "";
            movieRating3.textContent = movie.Ratings[2]?.Value ?? "";

            chooseMovieBackground(movie.Genre);

        })
        .catch(err => {
            directedBy.textContent = "";
            writtenBy.textContent = "";
            starring.textContent = "";
            displayText(movieTitle, 'Movie Not Found');
            displayText(movieRated, "N/A");
            displayText(moviePlot, "Please double check the spelling and the year.");
            displaySrc(moviePoster, "N/A");
            console.error("error in fetch" , err);
        });
})

const header = $('header') as HTMLElement;
const pageBody = $('body') as HTMLBodyElement;
const contentSection = $("#content-section") as HTMLElement;
const searchIcon = $("#search-icon") as HTMLImageElement;
const footer = $("footer") as HTMLElement;

const movieTitle = $('#title') as HTMLHeadingElement;
const movieYear = $('#year') as HTMLHeadingElement;
const movieRated = $('#rated') as HTMLHeadingElement;
const moviePlot = $("#plot") as HTMLParagraphElement;
const moviePoster = $("#poster") as HTMLImageElement;

const directedBy =$('#directed-by') as HTMLParagraphElement;
const movieDirector = $('#director') as HTMLParagraphElement;
const writtenBy = $("#written-by") as HTMLParagraphElement;
const movieWriter = $('#writer') as HTMLParagraphElement;
const starring = $("#starring") as HTMLParagraphElement;
const movieActors = $('#actors') as HTMLParagraphElement;

//movie ratings from array of Rating
const movieRatingSource1 = $('#rating-source-1') as HTMLParagraphElement;
const movieRatingSource2 = $('#rating-source-2') as HTMLParagraphElement;
const movieRatingSource3 = $('#rating-source-3') as HTMLParagraphElement;
const movieRating1 = $('#rating-1') as HTMLParagraphElement;
const movieRating2 = $('#rating-2') as HTMLParagraphElement;
const movieRating3 = $('#rating-3') as HTMLParagraphElement;


// calls on api to get new movie also runs on page load with default movie title Starship Troopers
async function fetchMovie(): Promise<Post> {
    let response;
        if (searchMovie.value && yearSearch.value) {
            response = await fetch(`https://www.omdbapi.com/?apikey=e5367c58&plot=full&t=${searchMovie.value.replace(' ', '+')}&y=${yearSearch.value}`)
        } else if(searchMovie.value) {
             response = await fetch(`https://www.omdbapi.com/?apikey=e5367c58&plot=full&t=${searchMovie.value.replace(' ', '+')}`)
        } else response = await fetch(`https://www.omdbapi.com/?apikey=e5367c58&plot=full&t=starship+troopers`)


    if(!response.ok) {
        throw new Error(`http error: ${response.status}`);
    }

    const data: OmdbResult = await response.json();

    if(isOmdbOk(data)) {
        return data;
    } else {
        throw new Error(data.Error);
    }
}


const bgClasses = [
    "bg-[url('/assets/action-background.jpg')]",
    "bg-[url('/assets/horror-background.jpg')]",
    "bg-[url('/assets/comedy-background.jpg')]",
    "bg-[url('/assets/crime-background.webp')]",
    "bg-[url('/assets/adventure-background.jpg')]",
    "bg-[url('/assets/sci-fi-background.jpg')]",
    "bg-[url('/assets/biography-background.jpg')]",
    "bg-[url('/assets/documentary-background.jpg')]",
    "bg-[url('/assets/drama-background.jpg')]",
]

function resetTheme() {
    //remove prior background
    pageBody.classList.remove(...bgClasses);
    //remove any other declaration made for specific backgrounds
    pageBody.classList.remove("text-white", "text-yellow-200", "text-shadow-lg/50");
    contentSection.classList.remove("bg-amber-50/20");
    form.classList.remove("text-amber-100");
    footer.classList.remove("text-amber-100");
    header.classList.remove("text-white");
    movieRated.classList.remove("border-white");
    searchIcon.classList.remove("invert");
}

function chooseMovieBackground(mg: string) {
    resetTheme();
    if (mg.includes("Action")) {
        pageBody.classList.add("bg-[url('/assets/action-background.jpg')]");
        contentSection.classList.add("bg-amber-50/20");
    } else if (mg.includes("Horror")) {
        pageBody.classList.add("bg-[url('/assets/horror-background.jpg')]");
        pageBody.classList.add("text-white");
        searchIcon.classList.add("invert");
        pageBody.classList.add("text-shadow-lg/50")
        contentSection.classList.remove("bg-amber-50/20");
        movieRated.classList.add("border-white");
    } else if (mg.includes("Comedy")) {
        pageBody.classList.add("bg-[url('/assets/comedy-background.jpg')]");
        contentSection.classList.remove("bg-amber-50/20");
        pageBody.classList.add("text-yellow-200");
    } else if (mg.includes("Crime")) {
        pageBody.classList.add("bg-[url('/assets/crime-background.webp')]");
        contentSection.classList.remove("bg-amber-50/20");
        form.classList.add("text-amber-100");
        searchIcon.classList.add("invert");
        footer.classList.add("text-amber-100")
    } else if (mg.includes("Fantasy") || mg.includes("Adventure")) {
        pageBody.classList.add("bg-[url('/assets/adventure-background.jpg')]");
        contentSection.classList.remove("bg-amber-50/20");
    } else if (mg.includes("Sci-Fi")) {
        pageBody.classList.add("bg-[url('/assets/sci-fi-background.webp')]");
        contentSection.classList.remove("bg-amber-50/20");
        pageBody.classList.add("text-white");
        searchIcon.classList.add("invert");
    } else if (mg.includes("Biography")) {
        pageBody.classList.add("bg-[url('/assets/biography-background.png')]");
        contentSection.classList.remove("bg-amber-50/20");
    } else if (mg.includes("Documentary")) {
        pageBody.classList.add("bg-[url('/assets/documentary-background.jpg')]");
        footer.classList.add('text-white');
        header.classList.add("text-white");
        searchIcon.classList.add("invert");
    } else {
        pageBody.classList.add("bg-[url('/assets/drama-background.jpg')]");
        pageBody.classList.add("text-white");
        searchIcon.classList.add("invert");
        contentSection.classList.remove("bg-amber-50/20");
    }
}