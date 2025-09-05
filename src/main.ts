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
let movie = searchMovie.value;
const form = $('#search-form') as HTMLFormElement;
form.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log(searchMovie,'movie search');
    
})

const pageBody = $('body') as HTMLBodyElement;
const contentSection = $("#content-section") as HTMLElement;
const searchIcon = $("#search-icon") as HTMLImageElement;
const footer = $("footer") as HTMLElement;

const movieTitle = $('#title') as HTMLHeadingElement;
const movieYear = $('#year') as HTMLHeadingElement;
const movieRated = $('#rated') as HTMLHeadingElement;
const moviePlot = $("#plot") as HTMLParagraphElement;
const moviePoster = $("#poster") as HTMLImageElement;
const movieDirector = $('#director') as HTMLParagraphElement;
const movieWriter = $('#writer') as HTMLParagraphElement;
const movieActors = $('#actors') as HTMLParagraphElement;

//movie ratings from array of Rating
const movieRatingSource1 = $('#rating-source-1') as HTMLParagraphElement;
const movieRatingSource2 = $('#rating-source-2') as HTMLParagraphElement;
const movieRatingSource3 = $('#rating-source-3') as HTMLParagraphElement;
const movieRating1 = $('#rating-1') as HTMLParagraphElement;
const movieRating2 = $('#rating-2') as HTMLParagraphElement;
const movieRating3 = $('#rating-3') as HTMLParagraphElement;


async function fetchMovie(): Promise<Post> {

    const response = searchMovie.value ? await fetch(`http://www.omdbapi.com/?apikey=e5367c58&plot=full&t=${searchMovie.value.replace(' ', '+')}`) : await fetch(`http://www.omdbapi.com/?apikey=e5367c58&plot=full&t=starship+troopers`);

    if(!response.ok) {
        throw new Error(`http error: ${response.status}`);
    }

    const data: OmdbResult = await response.json();

    if (data.Response === "False") {
        throw new Error((data as OmdbError).Error);
    }

    return data as Post;
}

function chooseMovieBackground(mg: string) {
    if (mg.includes("Action")) {
        pageBody.classList.add("bg-[url('/assets/action-background.jpg')]");
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
    } else if (mg.includes("Fantasy")) {
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
    } else {
        pageBody.classList.add("bg-[url('/assets/drama-background.jpg')]");
        pageBody.classList.add("text-white");
        searchIcon.classList.add("invert");
        contentSection.classList.remove("bg-amber-50/20");
    }
}


//! move to inside form.addEventListener 
fetchMovie()
        .then(movie => {
            console.log("Movie:", movie);
            movieTitle? movieTitle.textContent = movie.Title : null;
            movieYear? movieYear.textContent = movie.Year : null;
            movieRated? movieRated.textContent = movie.Rated : null;
            moviePlot? moviePlot.textContent = movie.Plot : null;
            moviePoster? moviePoster.src = movie.Poster : null;
            movieDirector? movieDirector.textContent = movie.Director : null;
            movieWriter? movieWriter.textContent = movie.Writer : null;
            movieActors? movieActors.textContent = movie.Actors : null;


            movieRatingSource1.textContent = movie.Ratings[0]?.Source ?? "";
            movieRatingSource2.textContent = movie.Ratings[1]?.Source ?? "";
            movieRatingSource3.textContent = movie.Ratings[2]?.Source ?? "";

            movieRating1.textContent = movie.Ratings[0]?.Value ?? "";
            movieRating2.textContent = movie.Ratings[1]?.Value ?? "";
            movieRating3.textContent = movie.Ratings[2]?.Value ?? "";


            chooseMovieBackground(movie.Genre);
           console.log(movie.Genre)

        })
        .catch(err => {
            console.error("error in fetch" , err)
        });