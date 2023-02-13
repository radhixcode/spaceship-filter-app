## Run Node server project locally

* Run the command `npm install` to download the required dependencies.
* Run web server using `node app.js` command
* Visit `http://localhost:3001` address on browser.
* Available REST endpoints
    * `GET http://localhost:3001/space-ship`

* cURL commands
```
curl --location --request GET 'http://localhost:3001/spaceships?colors=blue,red&date=lt,2000&speed=lt,65&laser=true'
```
