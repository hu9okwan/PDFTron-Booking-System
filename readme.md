<div id="top"></div>




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="pdftron/public/office.jpeg" alt="Logo">
  </a>

<h3 align="center">Booking System</h3>

  <p align="center">
    This project seeks to provide a systematic way for employees to book table and room space for a physical office. 
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

![image](https://user-images.githubusercontent.com/72037665/142508814-59ab0995-69dd-4576-a8d0-801cfaa15977.png)
![image](https://user-images.githubusercontent.com/72037665/142509052-f2e62394-dd49-472a-9f8b-284ccee9a820.png)


**Step 4: Creating the database**

 <ol>
  <li>Select realtime database on the left navbar </li> 
  <li>Create it using the default settings</li>
  <li>Press import JSON</li>
  <li>select example.json in pdftron/public</li>
  <li>add your own email and put as a value, put isAdmin="True" as seen in example.json</li>
</ol>
 
 ![Uploading image.png…]()

**Step 4: Running the app**
```shell
npm run dev
```
Go to localhost:3000 to get started!


### Prerequisites

Need nodejs installed. To get started: https://nodejs.org/en/download/

<!-- ### Installation

Currently, all pages are static but we are currently working on connecting firebase with Nextjs 
such that users will be able to upload maps, edit them, and save the newly made changes on the 
database. Once most pages have been made dynamic, this section will detail how to set up a layout
for office spaces. -->


<!-- USAGE EXAMPLES -->
## Usage

The connection to the database is currently still a work in progress.

A few pages this app currently posts:
<ul>
  <li>book</li>
  <li>home</li>
  <li>edit</li>
  <li>mybookings</li>
  <li>AdminDashboard</li>
</ul>

To view them: go to
```sh
localhost:3000/book
```



<!-- CONTRIBUTING -->
<!-- ## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->

<p align="right">(<a href="#top">back to top</a>)</p>





