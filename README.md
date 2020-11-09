# GitTrack
REST API to get top contributors of most popular repositories of a user or an organisation on Github.

## API Deployed on Heroku App

Organisation Google, n = 2, m = 3:

[https://api-gittrack.herokuapp.com/name/google/n=2&m=3](https://api-gittrack.herokuapp.com/name/google/n=2&m=3)

## Usage

The parameters that can be shared to API is the Organization Name: ```organisation```, Number of top repositories: ```n```, and number of top contributors: ```m```.

### 1. CLI using CURL

Open a command line and directly and enter the following code:

```curl https://api-gittrack.herokuapp.com/name/google/n=2^&m=3```

  * Note: The ```^``` symbol before ```&``` is required in Command Line to pass ```&``` as a symbol.


### 2. GET Request

Simply send a GET request to the Heroku App link or visit the website with your preferred link:

[https://api-gittrack.herokuapp.com/name/google/n=2&m=3](https://api-gittrack.herokuapp.com/name/google/n=2&m=3)
