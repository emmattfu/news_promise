class LoginUi {
    constructor() {
        this.container = document.querySelector(".container .row");
    }

    showError(err) {
        const currentAlert = document.querySelector(".alert");

        if (currentAlert) {
            currentAlert.remove();
        }

        const template = `
          <div class="card red lighten-1 col s12 m8 offset-m2 alert"">
            <div class="card-content">
                <span class="card-title">Error:</span>
                <p>${err}</p>
            </div>
          </div>
        `;

        this.container.insertAdjacentHTML("beforeend", template);

        setTimeout(function(){
            document.querySelector(".alert").style.display = 'none';
        }, 2500);
    }
}

