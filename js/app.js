// Init http
const httpNew = new HttpNew();
// Init UI
const ui = new UI();
// Api key
const apiKey = "edc3d2cf768041d19a3240039eb133ea";


// Init elements
const select = document.getElementById("country");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const select2 = document.getElementById("sources");
const selectCategory = document.getElementById("category");

// All events
select.addEventListener("change", onChangeCountry);
select2.addEventListener("change", onChangeSource);
searchBtn.addEventListener("click", onSearch);
selectCategory.addEventListener("change", onChangeCategory);

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
          data.articles.forEach(news => ui.addNews(news));
      })
      .catch(err => ui.showError(err));
}


function onSearch(e) {
  httpNew.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`)
      .then(data => {
          // Удаляем разметку из контейнера
          ui.clearContainer();
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

