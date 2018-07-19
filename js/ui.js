class UI {
  constructor() {
    this.container = document.querySelector(".news-container .container .row");
  }
  addNews(news, index) {
    const template = `
      <div class="col s12 m6 template">
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <p><a href="${news.url}">Read more</a></p>
                   <button data-index="${index}" class="btn waves-effect waves-light add-favorite">Add favorite</button>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
      </div>
    `;



    this.container.insertAdjacentHTML("beforeend", template);
    ui.showNews();

  }

  showNews() {
      const divs = document.querySelectorAll(".template");

      // выводим новости через пол секунды одна за одной
      let delay = 0;
      divs.forEach(div => {
          div.style.opacity = 0;
          setTimeout(() => {
              ui.animationNews(div);
          }, delay);
          delay += 500;
      });
  }

    animationNews(element) {
        // шаг изменения своства
        let step = 0;

        function animateAction(time) {
            step += 0.02;
            element.style.opacity = step;
            const raf = requestAnimationFrame(animateAction);
            // проверяем если opacity < 1 то мы продолжаем делать requestAnimationFrame
            if (parseFloat(element.style.opacity) >= 1) {
                cancelAnimationFrame(raf);
            }
        }

        animateAction();
    }


  removeNews(element) {
      element.remove();
  }

    addFavoriteNews(news, id) {
        const template = `
      <div class="col s12 m6 template">
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <p><a href="${news.url}">Read more</a></p>
                   <button data-id="${id}" class="btn waves-effect waves-light red darken-3 remove-favorite">Remove from favorite</button>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
      </div>
    `;

        this.container.insertAdjacentHTML("beforeend", template);

        const divs = document.querySelectorAll(".template");

        // выводим новости через пол секунды одна за одной
        let delay = 0;
        divs.forEach(div => {
            div.style.opacity = 0;
            setTimeout(() => {
                ui.animationNews(div);
            }, delay);
            delay += 500;
        });
    }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showLoader() {
    this.clearContainer();

    const template = `
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);
  }

  showInfo(msg) {
    this.clearContainer();

    const template = `
      <div class="card blue lighten-4">
        <div class="card-content">
            <p>${msg}</p>
        </div>
      </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);
  }

  showError(err) {
    this.clearContainer();

    const template = `
      <div class="card red lighten-1">
        <div class="card-content">
            <span class="card-title">Error:</span>
            <p>${err}</p>
        </div>
      </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);
  }

}
