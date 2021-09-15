let getQuote = 'https://type.fit/api/quotes';
let getGif = 'https://api.giphy.com/v1/gifs/search';
let key = 'ZBdicDFEt4oO7j5Gbi2EFNWNucggrmpq';

let btn = document.querySelector('button');
let quote = document.getElementById('quote');
let author = document.getElementById('author');
let qAndGDiv = document.getElementById('js');
let gifDiv = document.getElementById('gif');
let logoDiv = document.getElementById('logo');

btn.addEventListener('click', fetchQuotes);
btn.addEventListener('click', fetchGif);

let randNum;
let randReact;
let randGif;
let gifUrl;

async function fetchQuotes(e) {


    await fetch(getQuote)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            displayQuote(json);
        })
}

async function fetchGif(e) {
    randReact = Math.floor(Math.random() * 2 + 1);
    
    if (randReact === 1) {
        gifUrl = `${getGif}?api_key=${key}&q=applause&rating=g`;
    } else {
        gifUrl = `${getGif}?api_key=${key}&q=impressed&rating=g`;
    }

    await fetch(gifUrl)
        .then(function(gifResponse) {
            return gifResponse.json();
        })
        .then(function(gifJson) {
            displayGif(gifJson);
        })
}

function displayQuote(json) {
    randNum = Math.floor(Math.random() * json.length);
    elimAuthor = json[randNum].author;

    if (elimAuthor === "Donald Trump") {
        randNum += 1;
    }

    let qText = json[randNum].text;
    let qAuthor = json[randNum].author;

    quote.innerText = qText;

    if (!qAuthor) {
        author.innerText = '- Unknown';
    } else {
        author.innerText =`- ${qAuthor}`;
    }
    qAndGDiv.style = 
    'background-color: #fcf6f5; padding: 50px; border: none; border-radius: 10px;';
}

function displayGif(gifJson) {
    while (gifDiv.firstChild) {
        gifDiv.removeChild(gifDiv.firstChild);
    }
    while (logoDiv.firstChild) {
        logoDiv.removeChild(logoDiv.firstChild);
    }

    let gif = document.createElement('img');
    let logo = document.createElement('img');

    randGif = Math.floor(Math.random() * gifJson.data.length);
    let id = gifJson.data[randGif].id;

    if (id === "3o7WTLlqg2wSvmRo5i" || id === "NsIwSFHZnGtvxzOCRE" || id === "d2ajvwESx7pTO" || id === "3oz8xJcPzeRutjp2BW" || id === "DSUJYdg57fN4H6vbrF" || id === "55of8LXf3G78sGEWvo" || id === "Xp0J8BOr9CcPMgKVvD" || id === "mLGnUCverTQ52" || id === "URkHHQpr5x4d1KrrzI") {
        randGif += 1;
    }

    gif.src = gifJson.data[randGif].images.original.url;
    gif.setAttribute('class', 'img-fluid');
    gif.style =
    'border: none; border-radius: 5px;';
    logo.src = './assets/PoweredBy_200px-White_HorizText.png';
    logo.setAttribute('class', 'img-fluid');

    gifDiv.appendChild(gif);
    logoDiv.appendChild(logo);
}
