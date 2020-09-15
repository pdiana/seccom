# Dummy App
Simple Express REST API with vue data retrieval and display.
## Project setup
cd into the project root (where package.json is) and run:
```
npm install
```
This will install all packages for the backend and frontend.

While for best practice would be better to separate the package.json they have been combined to speed up the installation.

### Compiles and hot-reloads for development
from project root run:
```
npm run seccom
```
this will:
* start the backend express server on `localhost` `port: 3000`
* compile and start the vue frontend dev server on `localhost` `port: 8080`

### View the app
Open the browser on `http://localhost:8080/`


### Troubleshoot app start
The start script uses `concurrently` to chain the start commands. While not ideal for production environment, this will
meet the requirement of "single command" start.

Should concurrently have hick-ups you will need to start the servers separately:

To start the backend, From the project root:

```
cd backEnd
node index.js
```
To start the frontend, from the project root & a new terminal window:

```
npm run serve
```
### ToDo
While/If there's still time until all candidates have been interviewed I'm planning to implement: 
- [X] Responsive Menu
- [X] User GET Ajax calls
- [X] Search Sort & Filter users
- [X] Modal selected user's details
- [ ] Frontend data validation
- [ ] POST / PUT / DELETE user Ajax calls
- [ ] Keyboard navigation
- [ ] Mockup SQL schema
- [ ] MySql mock db with stored procedures
- [ ] Add DB to backend with sequelize
- [ ] Add user Auth
- [ ] Add automated Swagger documentation for API
- [ ] Better/custom Styling
- [ ] Compile, Dockerize & Mock deployment on kubernetes
