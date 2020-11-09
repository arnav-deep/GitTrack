# GitTrack
REST API to get top contributors of most popular repositories of a user or an organisation on Github.

## API Deployed on Heroku App

Organisation Google, n = 2, m = 3:

[https://api-gittrack.herokuapp.com/name/google?n=2&m=3](https://api-gittrack.herokuapp.com/name/google?n=2&m=3)

## Usage

No Installation is required for using the API. The parameters that can be shared to API is the Organization Name: ```organisation```, Number of top repositories: ```n```, and number of top contributors: ```m```.

### 1. CLI using CURL

Open a command line and directly and enter the following code:

```curl https://api-gittrack.herokuapp.com/name/google?n=2^&m=3```

  * Note: The ```^``` symbol before ```&``` is required in Command Line to pass ```&``` as a symbol.


### 2. GET Request

Simply send a GET request to the Heroku App link or visit the website with your preferred link:

[https://api-gittrack.herokuapp.com/name/google?n=2&m=3](https://api-gittrack.herokuapp.com/name/google?n=2&m=3)


The Response of the API will give a JSON data like below —

```
[{"repo":"it-cert-automation-practice","url":"https://github.com/google/it-cert-automation-practice","forks":11717,"contributors":[{"user":"marga-google","url":"https://github.com/marga-google","contributions":3},{"user":"margamanterola","url":"https://github.com/margamanterola","contributions":1}]},{"repo":"styleguide","url":"https://github.com/google/styleguide","forks":9721,"contributors":[{"user":"IsaacG","url":"https://github.com/IsaacG","contributions":30},{"user":"eglaysher","url":"https://github.com/eglaysher","contributions":25},{"user":"tonyruscoe","url":"https://github.com/tonyruscoe","contributions":19}]}]```


## Installation

For opening the project on local server, follow these steps:

```
# Clone the repo
git clone https://github.com/arnav-deep/GitTrack.git
cd GitTrack

# Install dependencies
npm install

# Run API locally
node app.js
