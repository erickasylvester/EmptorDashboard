# EmptorDashboard
Emptor Dashboard is a fullstack application to visualize key indiccators of the world's most populous countries.
In this application, you can select a country and navigate to the various tabs for each indicator. 
Each tab will show the corresponding data per year, starting at year 1960.
User may also modify data using the form at the bottom of the page.

# Tech Stack
Backend was developed using Express.js <br />
Frontend was developed using React and Redux as the state library <br />

Webpack was also used to bundle front-end assets

# API
api/display_data/population <br />
api/display_data/gdp <br />
api/display_data/emissions <br />
api/display_data/lifeexpectancy <br />
api/display_data/techexports <br /> 
api/display_data/patents/true <br />
api/display_data/patents/false <br />

# How to run
Install all needed modules: <br />
    * npm install <br />
Create database:  <br />
    * createdb emptordashboard  <br />
Run seed: <br>
    * npm run seed <br/>
Start server:
    * npm run start-dev <br />

# How to run Unit Tests
npm run test 
* There were 13 unit tests written for endpoints

# Known bugs
* #1 When seeding the country data in the databse, the create function does not seem to block, resulting in duplicate entries
* #2 The form to update the data does not update the intended database entry, due to bug #1. There are multiple ids for the same country and it is unable to locate the correct one.


