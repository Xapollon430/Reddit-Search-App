const fetch = require("node-fetch");

const landingPage = (req, res) => {
  res.render("index.html");
};

const redditApi = async (req, res) => {
  let query = req.query;
  let response = await fetch(
    `https://www.reddit.com/search.json?q=${query.searchTerm}&sort=${
      query.sortBy
    }&limit=${query.searchLimit}`
  );
  res.send(await response.json());
};

module.exports = {
  landing: landingPage,
  redditApi: redditApi
};
