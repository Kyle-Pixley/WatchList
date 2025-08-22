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
const movieTitle = $('#title');
const movieYear = $('#year');
const movieRated = $('#rated');
const moviePlot = $("#plot");
function fetchMovie() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://www.omdbapi.com/?apikey=e5367c58&plot=full&t=starship+troopers");
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
fetchMovie()
    .then(movie => {
    console.log("Movie:", movie);
    movieTitle ? movieTitle.textContent = movie.Title : null;
    movieYear ? movieYear.textContent = movie.Year : null;
    movieRated ? movieRated.textContent = movie.Rated : null;
    moviePlot ? moviePlot.textContent = movie.Plot : null;
})
    .catch(err => {
    console.error("error in fetch", err);
});
export {};
//# sourceMappingURL=main.js.map