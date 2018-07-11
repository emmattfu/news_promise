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
const newsContainer = document.querySelector('.news-container');

// по загрузке страницы получить все новости в избранное
window.addEventListener('load', onLoad);
newsContainer.addEventListener('click', onRemove);


function onLoad(e) {
    //получить избранные новости
    news.getFavoriteNews()
        .then(favoriteNews => {
          favoriteNews.forEach(doc => {
              ui.addFavoriteNews(doc.data(), doc.id);
          })
        })
        .catch(err => {
            console.log(err);
        })
}

function onRemove(e) {
    if (e.target.classList.contains('remove-favorite')) {
        const id = e.target.dataset.id;
        news.removeFavoriteNews(id);
    }
}