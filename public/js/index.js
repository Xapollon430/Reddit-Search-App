const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const alertDiv = document.querySelector("#alert");
const resultsDiv = document.querySelector("#results");

searchForm.addEventListener("submit", async e => {
  e.preventDefault();

  const searchTerm = searchInput.value;
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const searchLimit = document.querySelector("#limit").value;

  if (searchTerm == "") {
    emptySearchAlert("Please add a search term");
  } else {
    resultsDiv.innerHTML = "";
    searchInput.val = "";
    let response = await fetch(
      `http://localhost:3000/redditApi?searchTerm=${searchTerm}&sortBy=${sortBy}&searchLimit=${searchLimit}`
    );
    let data = await response.json();
    const posts = data.data.children;
    for (let post of posts) {
      let imgCheck = post.data.thumbnail.indexOf("https");
      let img;
      if (imgCheck == -1) {
        img = "https://www.redditstatic.com/new-icon.png";
      } else {
        img = post.data.thumbnail;
      }

      let div = document.createElement("div");
      div.classList = "card";
      div.innerHTML = `<img src="${img}" alt="Burger Pic">
                        <h5> ${post.data.title} </h5>
                        <a  class="btn btn-primary btn-sm" href="${
                          post.data.url
                        }">Read More <a>
                        <hr>
                        <span class="badge badge-secondary">Subreddit: ${
                          post.data.subreddit
                        }</span>
                        <span class="badge badge-dark">Score: ${
                          post.data.score
                        }</span>`;

      resultsDiv.appendChild(div);
    }
  }
});

const emptySearchAlert = message => {
  const alertText = `<div class="alert alert-danger mb-0 mt-2" role="alert">
                    ${message}
                    </div>`;
  alertDiv.innerHTML = alertText;
  setTimeout(() => document.querySelector(".alert").remove(), 2000);
};
