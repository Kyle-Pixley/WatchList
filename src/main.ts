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


const movieTitle = $('#title') as HTMLHeadingElement;
const movieYear = $('#year') as HTMLHeadingElement;
const movieRated = $('#rated') as HTMLHeadingElement;
const moviePlot = $("#plot") as HTMLParagraphElement;
const moviePoster = $("#poster") as HTMLImageElement;
const movieDirector = $('#director') as HTMLParagraphElement;
const movieWriter = $('#writer') as HTMLParagraphElement;
const movieActors = $('#actors') as HTMLParagraphElement;


async function fetchMovie(): Promise<Post> {
    const response = await fetch(`http://www.omdbapi.com/?apikey=e5367c58&plot=full&t=${searchMovie.value.replace(' ', '+')}`);

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
        // pageBody.style.backgroundImage = 'url(../assets/actionBackground.jpg)';
        // pageBody.style.backgroundSize = 'cover';
        pageBody.className = 'action-background';
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

            chooseMovieBackground(movie.Genre);
           

        })
        .catch(err => {
            console.error("error in fetch" , err)
        });