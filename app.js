require("dotenv").config();
var express = require("express");
var app = express();

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
    /*  
    *   Set your Personal Access Token here directly or in your .env file to remove Github API limit.
    *   Create your token here -> https://github.com/settings/tokens
    */
});

const PORT = process.env.PORT || 8080;

app.get("/name/:organisation", (req, res) => {

    const organisation = req.params.organisation;       // Github username
    const n = req.query.n ? req.query.n : 1;            // Number of repos of the user/organisation. Default set to 1.
    const m = req.query.m ? req.query.m : 1;            // Number of contributors per repo. Default set to 2.

    octokit.search.repos({
        q: `org:${organisation}`,                       // search by organisation name
        sort: "forks",                                  // sort by the number of forks of the repo
        order: "desc",                                  // most forked first
        per_page: n,                                    // save n results on a page
        page: 1,                                        // take pages conatining n results
    })
    .then(({ data }) => {
        const nRepos = data.items;                      // save list of repos found
        var totalRepos = nRepos.length;                 // confirm the number of repos incase n is greater than total number of repos present
        var outputData = new Array(totalRepos);         // Initialize an array to return contributor response
        var numOfRepos = 0;                             // number of repos for whose contributor data has been fetched
        var getContributorData = new Promise((resolve) => {
            nRepos.forEach((repo, index) => {
                let repoData = {
                    repo: repo.name,
                    url: repo.html_url,
                    forks: repo.forks_count,
                };

                octokit.repos.listContributors({
                    owner: organisation,                // username of main repo
                    repo: repo.name,                    // repository 
                    per_page: m,                        // `m` contributors per page
                    page: 1,                            // just the first page with m contributors
                })
                .then((contributors) => {
                    repoData.contributors = new Array(contributors.data.length);    // New array for contributor data of each repo

                    contributors.data.forEach((contributor, index) => {
                        repoData.contributors[index] = {
                        user: contributor.login,                                    // Username of the contributor
                        url: contributor.html_url,                                  // User GitHub profile URL
                        contributions: contributor.contributions,                   // Number of commits by the user made on the repo
                        };
                    });

                    outputData[index] = repoData;

                    numOfRepos += 1;
                    if (numOfRepos === totalRepos) {
                        // Resolve Promise if all repositories data is fetched and response is ready to be sent. 
                        resolve();
                    }
                });
            });
        });
        getContributorData.then(() => res.status(200).json(outputData)); // once async processes are finished, return response.
    })
    .catch((error) => {
        console.error(error)                      // will help with debugging 
        res.status(400).json("Bad Request");      // return `Bad Request` status code
    });
});

app.get("/test", (req, res) => {
    res.status(200).send("Everything is up, don't worry.  :)")
});

app.get("/developer", (req, res) => {
    devInfo = "Developed by Arnav Deep.\n\n" +
                "Visit the developer here: https://arnav-deep.github.io/";
    res.status(200).send(devInfo);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // start running server on PORT set by environment variable
});