// Init http
const httpNew = new HttpNew();
// Init UI
const ui = new UI();
// Api key
const apiKey = "edc3d2cf768041d19a3240039eb133ea";
// init Auth
const auth = new Auth();
// init Favorite news
const news = new favoriteNews();
// init news store
const newsStore = NewsStore.getInstance();


// Init elements
const select = document.getElementById("country");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const select2 = document.getElementById("sources");
const selectCategory = document.getElementById("category");
const logout = document.querySelector('.logout');
const newsContainer = document.querySelector('.news-container');


// All events
select.addEventListener("change", onChangeCountry);
select2.addEventListener("change", onChangeSource);
searchBtn.addEventListener("click", onSearch);
selectCategory.addEventListener("change", onChangeCategory);
logout.addEventListener('click', onLogout);
newsContainer.addEventListener('click', addFavorite);

// check auth state
firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location = 'login.html';
    }
});

// Event handlers
function onChangeCountry(e) {
  // Показываю прелодер
  ui.showLoader();
  // Делаем запрос на получение новостей по стране
  httpNew.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`)
      .then(data => {
          // Удаляем разметку из контейнера
          ui.clearContainer();
          // перебираем новости из поля articles в объекте response
          data.articles.forEach((news, index) => ui.addNews(news, index));
          // сохраняем новости в хранилище news-store
          newsStore.setNews(data.articles);
      })
      .catch(err => ui.showError(err));
}

(function addOptions() {
    httpNew.get(`https://newsapi.org/v2/sources?apiKey=${apiKey}`)
        .then(data => {
            let sourcesArr = ['bloomberg', 'espn', 'marca', 'mtv-news', 'new-york-magazine', 'the-new-york-times', 'the-guardian-uk', 'svenska-dagbladet', 'la-gaceta', 'google-news'];
           data.sources.forEach(source => {
               for (let i = 0; i < sourcesArr.length; i++) {
                   if (source.id === sourcesArr[i]) {
                       select2.appendChild(new Option(source.name, source.id));
                   }
               }
               $(document).ready(function(){
                   $('select').formSelect();
               })
           });

        })
        .catch(err => ui.showError(err));
})();

function onSearch(e) {
  httpNew.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`)
      .then(data => {
          // Удаляем разметку из контейнера
          ui.clearContainer();
          console.log();
          // Если по данному запросу новостей не найдено то выводим соответственное сообщение
          if (data.totalResults === 0) ui.showInfo("По вашему запросу новостей не найдено!");
          // перебираем новости из поля articles в объекте response
          data.articles.forEach(news => ui.addNews(news));
      })
      .catch(err => ui.showError(err));
}

function onChangeSource(e) {
    // Показываю прелодер
    ui.showLoader();
    // Делаем запрос на получение новостей по выбраному ресурсу
    httpNew.get(`https://newsapi.org/v2/top-headlines?sources=${select2.value}&apiKey=${apiKey}`)
        .then(data => {
            // Удаляем разметку из контейнера
            ui.clearContainer();
            // перебираем новости из поля articles в объекте response
            data.articles.forEach(news => ui.addNews(news));
        })
        .catch(err => ui.showError(err));
}

function onChangeCategory(e) {
    // Показываю прелодер
    ui.showLoader();
    // Делаем запрос на получение новостей по выбранной стране
    httpNew.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`)
        .then(data => {
            // Удаляем разметку из контейнера
            ui.clearContainer();
            // перебираем новости из поля articles в объекте response
            data.articles.forEach(news => ui.addNews(news));
        })
        .catch(() => ui.showInfo(`Новости по категории ${selectCategory.value} по стране ${select.value} не найдены`))
}

function onLogout() {
    auth.logout()
        .then(() => window.location = 'login.html')
        .catch((err) => console.log(err))
}

function addFavorite(e) {
    if (e.target.classList.contains('add-favorite')) {
        const index = e.target.dataset.index;
        const oneNews = newsStore.getNews()[index];
        news.addFavoriteNews(oneNews)
            .then(data => {
                // вывести сообщение что новость добавлена успешно
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }
}