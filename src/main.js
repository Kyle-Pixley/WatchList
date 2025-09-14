var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//throws error if element is not found
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
window.addEventListener("DOMContentLoaded", () => {
    form.dispatchEvent(new Event("submit", { cancelable: true }));
});
const form = $('#search-form');
//renders new movie when form is submited 
form.addEventListener("submit", function (e) {
    e.preventDefault();
    fetchMovie()
        .then(movie => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        console.log("Movie:", movie);
        // if movie.something returns a value of "N/A" (still a truthy value) it will render nothing
        function displayText(element, value) {
            if (element)
                element.textContent = (value && value !== "N/A") ? value : "";
        }
        function displaySrc(img, value) {
            if (img)
                img.src = (value && value !== "N/A") ? value : "/assets/no-poster.htm";
        }
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
        movieRatingSource1.textContent = (_b = (_a = movie.Ratings[0]) === null || _a === void 0 ? void 0 : _a.Source) !== null && _b !== void 0 ? _b : "";
        movieRatingSource2.textContent = (_d = (_c = movie.Ratings[1]) === null || _c === void 0 ? void 0 : _c.Source) !== null && _d !== void 0 ? _d : "";
        movieRatingSource3.textContent = (_f = (_e = movie.Ratings[2]) === null || _e === void 0 ? void 0 : _e.Source) !== null && _f !== void 0 ? _f : "";
        movieRating1.textContent = (_h = (_g = movie.Ratings[0]) === null || _g === void 0 ? void 0 : _g.Value) !== null && _h !== void 0 ? _h : "";
        movieRating2.textContent = (_k = (_j = movie.Ratings[1]) === null || _j === void 0 ? void 0 : _j.Value) !== null && _k !== void 0 ? _k : "";
        movieRating3.textContent = (_m = (_l = movie.Ratings[2]) === null || _l === void 0 ? void 0 : _l.Value) !== null && _m !== void 0 ? _m : "";
        chooseMovieBackground(movie.Genre);
    })
        .catch(err => {
        console.error("error in fetch", err);
    });
});
const header = $('header');
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
// calls on api to get new movie also runs on page load with default movie title Starship Troopers
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
        if (isOmdbOk(data)) {
            return data;
        }
        else {
            throw new Error(data.Error);
        }
    });
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
];
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
function chooseMovieBackground(mg) {
    resetTheme();
    console.log('choose movie background', mg);
    if (mg.includes("Action")) {
        pageBody.classList.add("bg-[url('/assets/action-background.jpg')]");
        contentSection.classList.add("bg-amber-50/20");
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
    else if (mg.includes("Documentary")) {
        pageBody.classList.add("bg-[url('/assets/documentary-background.jpg')]");
        footer.classList.add('text-white');
        header.classList.add("text-white");
        searchIcon.classList.add("invert");
    }
    else {
        pageBody.classList.add("bg-[url('/assets/drama-background.jpg')]");
        pageBody.classList.add("text-white");
        searchIcon.classList.add("invert");
        contentSection.classList.remove("bg-amber-50/20");
    }
    console.log(pageBody.classList);
}
export {};
//# sourceMappingURL=main.js.map