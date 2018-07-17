class favoriteNews {
    constructor() {
        // получаем доступ к базе данных из firestore.js
        this.db = FirestoreInit.getInstance().getDb();
        this.collectionName = 'favorite-news';
    }

    getFavoriteNews() {
        return new Promise((resolve, reject) => {
            this.db.collection(this.collectionName).get()
                .then((querySnapshot) => resolve(querySnapshot))
                .catch(err => reject(err));
        })
    }

    addFavoriteNews(news) {
        return new Promise((resolve, reject) => {
            this.db.collection(this.collectionName).add(news)
                .then(docRef => resolve(docRef))
                .catch(err => reject(err));
        })
    }

    removeFavoriteNews(id) {
        return new Promise((resolve, reject) => {
            this.db.collection(this.collectionName).doc(id).delete()
                .then(function() {
                // M.toast({html: 'News successfully deleted!'})
                    news.createMessage('News successfully deleted!')
            }).catch(function(error) {
                // M.toast({html:'Ops, try again later'})
                news.createMessage('Ops, try again later')
            });
        })
    }

    createMessage(msg) {
        // Проверяем наличие других уведомлений
        const allToasts = document.body.querySelectorAll(".my-toast");
        let fullToastsHeight = 100;
        if (allToasts.length) {
            allToasts.forEach(al => fullToastsHeight += al.offsetHeight + 10);
        }
        // Создаем уведомление
        const myToast = document.createElement('div');
        myToast.classList.add('my-toast');
        myToast.textContent = msg;
        myToast.style.position = 'fixed';
        myToast.style.right = '30px';
        myToast.style.top = `${fullToastsHeight}px`;
        myToast.style.opacity = 0;


        document.body.insertAdjacentElement("afterbegin", myToast);

        this.animationMessage(myToast);
        this.hideMessage(myToast);
        return myToast;
    }


    animationMessage(element) {
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

    hideMessage(element) {
        setTimeout(() => {
            // шаг изменения своства
            let step = 1;

            function animateAction(time) {
                step -= 0.02;
                element.style.opacity = step;
                const raf = requestAnimationFrame(animateAction);
                // проверяем если opacity > 0 то мы продолжаем делать requestAnimationFrame
                if (parseFloat(element.style.opacity) <= 0) {
                    cancelAnimationFrame(raf);
                }
            }

            animateAction();
        }, 3000);


        setTimeout(() => {
            let element = document.querySelector('.my-toast');
            element.remove();
        }, 5000)
    }

}
