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
const logout = document.querySelector('.logout');

// по загрузке страницы получить все новости в избранное
window.addEventListener('load', onLoad);
newsContainer.addEventListener('click', onRemove);
logout.addEventListener('click', onLogout);


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
        const parent = e.target.closest('.col');
        news.removeFavoriteNews(id);
        ui.removeNews(parent)
    }
}

function onLogout() {
    auth.logout()
        .then(() => window.location = 'login.html')
        .catch((err) => console.log(err))
}