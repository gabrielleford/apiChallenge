let getQuote = 'https://type.fit/api/quotes';

let btn = document.querySelector('button');
let quote = document.getElementById('quote');
let author = document.getElementById('author');

btn.addEventListener('click', fetchQuotes);

let randNum;

function fetchQuotes(e) {
    fetch(getQuote)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
        displayQuote(json);
    })
}

function displayQuote(json) {
    randNum = Math.floor(Math.random() * json.length);
    console.log(randNum);

    let qText = json[randNum].text;
    let qAuthor = json[randNum].author;

    quote.innerText = qText;

    if (!qAuthor) {
        author.innerText = '- Unknown';
    } else {
        author.innerText =`- ${qAuthor}`;
    }
}
