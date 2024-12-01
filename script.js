// Naverbar open and close
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');

};
window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('open');
}

//TMDB

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
getmovies(API_URL);

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
let a;


function getmovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        a = data.results;
        showmovies(a);
        console.log("sss", a);
    })
}

// Find the card to remove
function removeCard(movieId) {
    const movieEl = document.getElementById(`movie-${movieId}`);
    if (movieEl) {
        movieEl.remove();
        removeFromDb(movieEl);
        console.log(`Removed movie with ID: ${movieId}`);
    } else {
        console.log(`Movie with ID: ${movieId} not found`);
    }

}

function removeFromDb(movieId) {
    let findIndex = a.findIndex(dtt => dtt.id === movieId);
    a.splice(findIndex, 1);
}

// Function to Show Movie
function showmovies(data) {
    main.innerHTML = '';
    data.forEach((movie) => {
        const {id, title, poster_path, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.id = `movie-${id}`;
        movieEl.classList.add('col');
        movieEl.innerHTML = ` <div class="remove-icon" id = "recipe-close-btn" onclick="removeCard(${id})">
                <i class='bx bx-x'></i>
            </div>
            <div class="col-img">
                <img src="${IMG_URL + poster_path}" alt="">
            </div>
            <div class="card-text">
                <h3>${title}</h3>
                <p>${overview}</p>
            </div>`
        main.appendChild(movieEl);
    })
}

// Function to Search Movie
form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getmovies(searchURL + '&query=' + searchTerm)
    } else {
        getmovies(API_URL);
    }
})

// Function to validate form fields
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const email = document.getElementById('email').value.trim();
    const telephone = document.getElementById('telephone').value.trim();
    const message = document.getElementById('message').value.trim();

    const name_error = document.getElementById('name_error');
    const lastname_error = document.getElementById('lastname_error');
    const email_error = document.getElementById('email_error');
    const mass_error = document.getElementById('mass_error');

    // Validate First Name
    if (!name) {
        name_error.innerHTML = "Fist Name is required";
    } else {
        name_error.innerHTML = "";

    }

    // Validate Last Name
    if (!lastname) {
        lastname_error.innerHTML = "Last Name is required";
    } else {
        lastname_error.innerHTML = "";

    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailPattern.test(email)) {
        email_error.innerHTML = "Valid Email is required";
    } else {
        email_error.innerHTML = "";

    }

    // Validate Message
    if (!message) {
        mass_error.innerHTML = "Message is required";
    } else {
        mass_error.innerHTML = "";

    }
}

// Function to save data as JSON
function saveDataToJSON() {
    const formData = {
        firstName: document.getElementById('name').value.trim(),
        lastName: document.getElementById('lastname').value.trim(),
        email: document.getElementById('email').value.trim(),
        telephone: document.getElementById('telephone').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Convert the form data to a JSON string
    const jsonData = JSON.stringify(formData);

    // Save the data to localStorage
    localStorage.setItem('formData', jsonData);

    console.log('Saved Data:', jsonData);
}

// Function to send email using Email.js
function sendEmail() {
    const name = document.getElementById('name').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const email = document.getElementById('email').value.trim();
    const telephone = document.getElementById('telephone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Prepare the email body
    const bodyMessage = `
        First Name: ${name}<br>
        Last Name: ${lastname}<br>
        Email: ${email}<br>
        Telephone: ${telephone}<br>
        Message: ${message}
    `;

    // Send the email using Email.js
    Email.send({
        SecureToken: "1f6b73c8-71ad-42bb-9644-5f3d1db7ebd2",
        To: 'dumidu.kodithuwakku@ebeyonds.com',
        Cc:'prabhath.senadheer@ebeyonds.com',
        From: email,
        Subject: "Welcome to the Logoipsum Movie Site",
        Body: bodyMessage
    }).then(
        (message) => {
            alert("Message Sent Successfully!");
        },
        (error) => {
            alert("Error sending message: " + error);
        }
    );
}

// Event listener for form submission
const form1 = document.getElementById('form1');
form1.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        // Save the data as JSON
        saveDataToJSON();

        // Send the email
        sendEmail();
    }
});


//IMAGE SLIDER
var slideImg = document.getElementById('slideImg');
var images = new Array(
    "assets/banner.png",
    "assets/banner1.png",
    "assets/banner2.png",
    "assets/banner3.png",
);
var len = images.length;
var i = 0;

function slider() {
    if (i > len - 1) {
        i = 0;
    }
    slideImg.src = images[i];
    i++;
    setTimeout('slider()', 4000);
}