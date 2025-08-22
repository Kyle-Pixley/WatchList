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

const movieTitle = $('#title') as HTMLHeadingElement;
const movieYear = $('#year') as HTMLHeadingElement;
const movieRated = $('#rated') as HTMLHeadingElement;
const moviePlot = $("#plot") as HTMLParagraphElement;


async function fetchMovie(): Promise<Post> {
    const response = await fetch("http://www.omdbapi.com/?apikey=e5367c58&plot=full&t=starship+troopers");

    if(!response.ok) {
        throw new Error(`http error: ${response.status}`);
    }

    const data: OmdbResult = await response.json();

    if (data.Response === "False") {
        throw new Error((data as OmdbError).Error);
    }

    return data as Post;
}

fetchMovie()
    .then(movie => {
        console.log("Movie:", movie);
        movieTitle? movieTitle.textContent = movie.Title : null;
        movieYear? movieYear.textContent = movie.Year : null;
        movieRated? movieRated.textContent = movie.Rated : null;
        moviePlot? moviePlot.textContent = movie.Plot : null;
    })
    .catch(err => {
        console.error("error in fetch" , err)
    });