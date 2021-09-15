let getQuote = 'https://type.fit/api/quotes';
let getGif = 'https://api.giphy.com/v1/gifs/search';
let key = 'ZBdicDFEt4oO7j5Gbi2EFNWNucggrmpq';

let btn = document.querySelector('button');
let quote = document.getElementById('quote');
let author = document.getElementById('author');
let gifDiv = document.getElementById('js');

btn.addEventListener('click', fetchQuotes);
btn.addEventListener('click', fetchGif);

let randNum;
let randReact;
let randGif;
let gifUrl;

function fetchQuotes(e) {


    fetch(getQuote)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            displayQuote(json);
        })
}

function fetchGif(e) {
    randReact = Math.floor(Math.random() * 2 + 1);
    
    if (randReact === 1) {
        gifUrl = `${getGif}?api_key=${key}&q=applause&rating=g`;
    } else {
        gifUrl = `${getGif}?api_key=${key}&q=impressed&rating=g`;
    }

    fetch(gifUrl)
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
    gifDiv.style = 
    'background-color: #fff4f1; padding: 50px; border: none; border-radius: 10px;';
}

function displayGif(gifJson) {
    while (gifDiv.children[2]) {
        gifDiv.removeChild(gifDiv.children[2]);
    }

    let gif = document.createElement('img');

    randGif = Math.floor(Math.random() * gifJson.data.length);
    console.log(randGif);
    let id = gifJson.data[randGif].id;

    if (id === "3o7WTLlqg2wSvmRo5i" || id === "NsIwSFHZnGtvxzOCRE" || id === "d2ajvwESx7pTO" || id === "3oz8xJcPzeRutjp2BW" || id === "DSUJYdg57fN4H6vbrF") {
        randGif += 1;
        console.log(`New number: ${randGif}`);
    }


    

    console.log(gifJson.data[randGif]);
    gif.src = gifJson.data[randGif].images.original.url;
    gif.style =
    'border: none; border-radius: 5px;';

    gifDiv.appendChild(gif);
}
