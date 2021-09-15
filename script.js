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

    if (json.author === "Donald Trump") {
        randNum += 1;
        console.log(`New Author number ${randNum}`);
    }

    let qText = json[randNum].text;
    let qAuthor = json[randNum].author;
    console.log(qAuthor);

    quote.innerText = qText;

    if (!qAuthor) {
        author.innerText = '- Unknown';
    } else {
        author.innerText =`- ${qAuthor}`;
    }
}

function displayGif(gifJson) {
    while (gifDiv.firstChild) {
        gifDiv.removeChild(gifDiv.firstChild);
    }

    let gif = document.createElement('img');

    randGif = Math.floor(Math.random() * gifJson.data.length);
    console.log(randGif);
    let id = gifJson.data[randGif].id;

    // if (id === ) {
    //     randGif += 1;
    //     console.log(`New number: ${randGif}`);
    // }


    

    console.log(gifJson.data[randGif]);
    gif.src = gifJson.data[randGif].images.original.url;

    gifDiv.appendChild(gif);
}
