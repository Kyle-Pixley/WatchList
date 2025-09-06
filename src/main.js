var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const $ = (sel) => {
    const ele = document.querySelector(sel);
    if (!ele)
        throw new Error(`Missing element: $(sel)`);
    return ele;
};
function isOmdbOk(x) {
    return x.Response === "True";
}
const searchMovie = $('#search');
const yearSearch = $('#year-search');
let movie = searchMovie.value;
const form = $('#search-form');
form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(searchMovie, 'movie search');
});
const pageBody = $('body');
const contentSection = $("#content-section");
const searchIcon = $("#search-icon");
const footer = $("footer");
const movieTitle = $('#title');
const movieYear = $('#year');
const movieRated = $('#rated');
const moviePlot = $("#plot");
const moviePoster = $("#poster");
const movieDirector = $('#director');
const movieWriter = $('#writer');
const movieActors = $('#actors');
//movie ratings from array of Rating
const movieRatingSource1 = $('#rating-source-1');
const movieRatingSource2 = $('#rating-source-2');
const movieRatingSource3 = $('#rating-source-3');
const movieRating1 = $('#rating-1');
const movieRating2 = $('#rating-2');
const movieRating3 = $('#rating-3');
function fetchMovie() {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        if (searchMovie.value && yearSearch.value) {
            response = yield fetch(`http://www.omdbapi.com/?apikey=e5367c58&plot=full&t=${searchMovie.value.replace(' ', '+')}&y=${yearSearch.value}`);
        }
        else if (searchMovie.value) {
            response = yield fetch(`http://www.omdbapi.com/?apikey=e5367c58&plot=full&t=${searchMovie.value.replace(' ', '+')}`);
        }
        else
            response = yield fetch(`http://www.omdbapi.com/?apikey=e5367c58&plot=full&t=starship+troopers`);
        if (!response.ok) {
            throw new Error(`http error: ${response.status}`);
        }
        const data = yield response.json();
        if (data.Response === "False") {
            throw new Error(data.Error);
        }
        return data;
    });
}
function chooseMovieBackground(mg) {
    if (mg.includes("Action")) {
        pageBody.classList.add("bg-[url('/assets/action-background.jpg')]");
    }
    else if (mg.includes("Horror")) {
        pageBody.classList.add("bg-[url('/assets/horror-background.jpg')]");
        pageBody.classList.add("text-white");
        searchIcon.classList.add("invert");
        pageBody.classList.add("text-shadow-lg/50");
        contentSection.classList.remove("bg-amber-50/20");
        movieRated.classList.add("border-white");
    }
    else if (mg.includes("Comedy")) {
        pageBody.classList.add("bg-[url('/assets/comedy-background.jpg')]");
        contentSection.classList.remove("bg-amber-50/20");
        pageBody.classList.add("text-yellow-200");
    }
    else if (mg.includes("Crime")) {
        pageBody.classList.add("bg-[url('/assets/crime-background.webp')]");
        contentSection.classList.remove("bg-amber-50/20");
        form.classList.add("text-amber-100");
        searchIcon.classList.add("invert");
        footer.classList.add("text-amber-100");
    }
    else if (mg.includes("Fantasy")) {
        pageBody.classList.add("bg-[url('/assets/adventure-background.jpg')]");
        contentSection.classList.remove("bg-amber-50/20");
    }
    else if (mg.includes("Sci-Fi")) {
        pageBody.classList.add("bg-[url('/assets/sci-fi-background.webp')]");
        contentSection.classList.remove("bg-amber-50/20");
        pageBody.classList.add("text-white");
        searchIcon.classList.add("invert");
    }
    else if (mg.includes("Biography")) {
        pageBody.classList.add("bg-[url('/assets/biography-background.png')]");
        contentSection.classList.remove("bg-amber-50/20");
    }
    else {
        pageBody.classList.add("bg-[url('/assets/drama-background.jpg')]");
        pageBody.classList.add("text-white");
        searchIcon.classList.add("invert");
        contentSection.classList.remove("bg-amber-50/20");
    }
}
//! move to inside form.addEventListener 
fetchMovie()
    .then(movie => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    console.log("Movie:", movie);
    movieTitle ? movieTitle.textContent = movie.Title : null;
    movieYear ? movieYear.textContent = movie.Year : null;
    movieRated ? movieRated.textContent = movie.Rated : null;
    moviePlot ? moviePlot.textContent = movie.Plot : null;
    moviePoster ? moviePoster.src = movie.Poster : null;
    movieDirector ? movieDirector.textContent = movie.Director : null;
    movieWriter ? movieWriter.textContent = movie.Writer : null;
    movieActors ? movieActors.textContent = movie.Actors : null;
    movieRatingSource1.textContent = (_b = (_a = movie.Ratings[0]) === null || _a === void 0 ? void 0 : _a.Source) !== null && _b !== void 0 ? _b : "";
    movieRatingSource2.textContent = (_d = (_c = movie.Ratings[1]) === null || _c === void 0 ? void 0 : _c.Source) !== null && _d !== void 0 ? _d : "";
    movieRatingSource3.textContent = (_f = (_e = movie.Ratings[2]) === null || _e === void 0 ? void 0 : _e.Source) !== null && _f !== void 0 ? _f : "";
    movieRating1.textContent = (_h = (_g = movie.Ratings[0]) === null || _g === void 0 ? void 0 : _g.Value) !== null && _h !== void 0 ? _h : "";
    movieRating2.textContent = (_k = (_j = movie.Ratings[1]) === null || _j === void 0 ? void 0 : _j.Value) !== null && _k !== void 0 ? _k : "";
    movieRating3.textContent = (_m = (_l = movie.Ratings[2]) === null || _l === void 0 ? void 0 : _l.Value) !== null && _m !== void 0 ? _m : "";
    chooseMovieBackground(movie.Genre);
    console.log(movie.Genre);
})
    .catch(err => {
    console.error("error in fetch", err);
});
export {};
//# sourceMappingURL=main.js.map