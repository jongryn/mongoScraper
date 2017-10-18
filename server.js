/*
// Created: Oct. 18, 2017 1:45 PM
// Author: Jonathan Gryn
// Revisions: Jon (10/18/17) - Started server.js
*/

// Pull in dependencies

// Snatches HTML from URLs
var request = require("request");

// Scrapes the HTML
var cheerio = require("cheerio");

console.log("__ENTER app.js__");

// Making a request call for the Onion News homepage
request("http://www.theonion.com/", function(error, response, html) {
  if (error) {
    console.log("ERROR: " + error);
  } else {

    // Load the body of the HTML into cheerio
    var $ = cheerio.load(html);

    // Empty array to save our scraped data
    var numArticles = 0;
    var scrapeResults = [];

    // With cheerio, find each article tag with the class "summary"
    $("article.summary").each(function(i, element) {

      // Article data
      var title = $(this).find("header").find("a").attr("title");
      var url = "theonion.com" + $(this).find("a").attr("href");
      var date = $(this).find("a").attr("data-pubdate");
      var img = $(this).find("noscript").children("img").attr("src");
      var descrition = $(this).find("div.desc").text().trim();

      var articleData = {
        "index": i,
        "title": title,
        "description": description,
        "url": url,
        "date": date,
        "img": img
      };

      scrapeResults.push(articleData);
    });

    // After the program scans all of the articles, log the result
    console.log(scrapeResults);
  }
});
