# ![logo](./public/assets/images/shared/desktop/logo.svg)

An example full-stack e-commerce site

## Table of contents

- [Overview](#overview)
  - [Features](#features)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [Built with](#built-with)
- [Author](#author)

## Overview

### Features

- Responsive design showing the optimal app layout depending on device's screen size
- Spacial hover states for interactive elements
- Checkout with information verification
- Checkout total validation in the backend
- Pending carts kept in database so when users return to the site the items are still there
    - Carts are determined based on anonymous users from Firebase auth
    - Database modeling shows how many times user has purchased items from the store, when and using what payment methods, allowing for better analytics and tracking
    - Pending carts are kept in the database to show abandonment rate
    - While not a feature of this app (no Oauth) should user accounts be set up the anonymous user model would mean even when users are not signed in purchase tracking can be kept (and will be transferred over to account post sign-up)
- Scroll reveal animations on sections for better ux

### Screenshots

![Desktop Home](./public/screenshots/Screenshot%202023-03-13%20at%203.20.06%20PM.png)
![Tablet Home](./public/screenshots/Screenshot%202023-03-13%20at%203.20.27%20PM.png)
![Mobile Home](./public/screenshots/Screenshot%202023-03-13%20at%203.20.41%20PM.png)

### Links

- Solution URL: [Frontend Mentor](https://www.frontendmentor.io/solutions/audiophile-ecommerce-site-using-react-and-firestorefirebase-database-ptsU5KnXIe)
- Live Site URL: [Firebase Hosting](https://audiophile-eeda3.web.app/)

## Built with

[<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>](https://reactjs.org/)
[<img src="https://img.shields.io/badge/FIREBASE-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">](https://firebase.google.com/)[<img src="https://img.shields.io/badge/STYLED--COMPONENTS-373737?style=for-the-badge&logo=styled-components&logoColor=DB7093"/>](https://styled-components.com/)[<img src='https://img.shields.io/badge/SCROLLREVEAL-FFCB36?style=for-the-badge&logo=ScrollReveal&logoColor=black'/>](https://scrollrevealjs.org/)[<img src='https://img.shields.io/badge/REACT--ROUTER-CA4245?style=for-the-badge&logo=React%20Router&logoColor=white'/>](https://reactrouter.com/en/main)

## Author

- Website - [Thomas Lawlor](https://thomaslawlor.com/)
- Frontend Mentor - [@ThomasLawlor17](https://www.frontendmentor.io/profile/ThomasLawlor17)
- Github - [@ThomasLawlor17](https://github.com/ThomasLawlor17)

