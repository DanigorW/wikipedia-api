class Ui {
  constructor() {
    this.loading = document.querySelector(".loading");
    this.searchForm = document.querySelector("#searchForm");
    this.output = document.querySelector(".output");
    this.search = document.querySelector("#search");
    this.feedback = document.querySelector(".feedback");
    this.base = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&maxlag=10&list=search&srsearch=`;
  }

  getInputValue() {
    const value = this.search.value;
    if (value === "") {
      this.showFeedback();
    } else {
      this.ajaxWiki(value);
      this.search.value = "";
    }
  }

  ajaxWiki(search) {
    this.output.innerHTML = "";
    this.loading.classList.add("showItem");
    setTimeout(() => this.loading.classList.remove("showItem"), 3000);

    let searchUrl = this.base + search;
    fetch(searchUrl)
      .then(data => data.json())
      .then(data => this.displayData(data))
      .catch(error => console.log(error));
  }

  displayData(data) {
    const { search: results } = data.query;
    let info = "";
    results.forEach(result => {
      let { title, snippet, pageid: link } = result;

      info += `<div class="col-10 mx-auto col-md-6 col-lg-4 my-3">
      <div class="card card-body">
        <h1 class="card-title blueText">${title}</h1>
        <p>${snippet}</p>
        <a href="http://en.wikipedia.org/?curid${link}" target="_blank" class="my-2 text-capitalize">read
          more...</a>
      </div>
    </div>`;

      this.output.innerHTML = info;
    });
  }

  showFeedback() {
    this.feedback.classList.add("showItem");
    setTimeout(() => this.feedback.classList.remove("showItem"), 3000);
  }
}

const eventListeners = () => {
  const ui = new Ui();

  ui.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    ui.getInputValue();
  });
};

window.addEventListener("DOMContentLoaded", () => {
  eventListeners();
});
