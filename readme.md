<div id="top"></div>




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="pdftron/public/office.jpeg" alt="Logo">
  </a>

<h3 align="center">Booking System</h3>

  <p align="center">
    This project seeks to provide a systematic way for employees to book table and room space for the physical office. This will help prevent any conflicts over workspaces between employees. PDFTron is implementing a system where most employees will not have assigned workspaces and have to reserve them prior to coming into work. Our solution includes a web-based application based on React.js where only PDFTron employees will be able to make reservations or bookings. Employees will be able to see past, future, and current bookings for rooms and tables. Using our stylized booking page and easy-to-use calendars, employees should be able to book with ease!
    <br />
<!--     <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project



<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Firebase](https://firebase.google.com/?gclid=Cj0KCQjwrJOMBhCZARIsAGEd4VHElX6FhflVBHMX-HGMIwcXjhdiBFUMDbC6oZmP1Vc3pvhQyLgb3tcaAtSmEALw_wcB&gclsrc=aw.ds)
* [Node](https://nodejs.org/en/)
* [Bootstrap](https://getbootstrap.com/)
* [Jest](https://jestjs.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Prerequisites

Need nodejs installed. To get started: https://nodejs.org/en/download/


<!-- GETTING STARTED -->
## Set up the project


**Step 1:**

```shell
git clone https://github.com/ericchanko/PDFTron-Internal-Booking
```

**Step 2:**

```shell
cd pdftron
```
```shell
npm install
```

**Step 3: Setting up Database**

#### Note! Firebase has free limits up to 1 GiB. For more information see https://firebase.google.com/pricing

* [Setting Up .env file for database](https://stackoverflow.com/questions/52500573/where-can-i-find-my-firebase-apikey-and-authdomain)

<ol>
  <li>Go to https://firebase.google.com/</li>
  <li>Select Add Project (Note: You can just use the default settings)</li>
  <li>Name your project whatever you want</li>
  <li>Go to project settings</li>
  <li>Press Add App and select "Also set up firebase hosting" 
</li>
  <li>Copy and paste the generated code into the .env file 
</li>
</ol>



**Step 4: Creating the database**

 <ol>
  <li>Select realtime database on the left navbar </li> 
  <li>Create it using the default settings</li>
  <li>Press import JSON</li>
  <li>select example.json in pdftron/public</li>
  <li>aselect import</li>
</ol>
Your database is now ready to go!
 

**Step 4: Running the app**
```shell
npm run dev
```
Go to localhost:3000 to get started!

## Configuration
- To upload your own map, have a png of your office outline prepared. Name your png using the name "office-outline.png" and replace the existing png in pdftron/public.
- To give yourself admin privileges, simply go the the realtime database, select users > 0 > change the email to the one you login to the booking app with.
- Once logged in as admin, you can go to admin settings where we have the following admin functionalities availble through there. (See (<a href="#admin"> Admin Functionalities </a> below)

<!-- USAGE EXAMPLES -->
## Usage

The current method of logging in is using Google OAuth, that is, a 3rd party method of authenticating users. Sinply login to get started. Using the admin account configured

# Functionalities
### Default users
- See your current bookings
- Make a Table Booking
- Make a Room Booking
- Delete your bookings
- Authentication

<div id="admin"></div>
### Admin functionalities
- Edit the current map
- Add teams with specific colors
- Remove teams
- Remove tables
- Upload new map
- Make permanent bookings for other users
- Specify booking constraints
- See all bookings for all users
- Change a users team
- Change a users authorization level


## Future Directions
- Unit testing for more code coverage
- Minor bug fixes with Firebase connection (See Issues)
- Ability to have multiple booking floors
- Mobile Responsiveness
- Have admins being able to configure Company Logo
- Email notifications when room booked/deleted

<p align="right">(<a href="#top">back to top</a>)</p>





