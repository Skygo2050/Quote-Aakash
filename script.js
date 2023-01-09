const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let data="";


const  getNewQuotes =()=>{
    let rnum = Math.floor(Math.random()*10);
    quotesdata = data[rnum];
    quoteText.innerText = `${quotesdata.text}`;
    authorText.innerText = `${quotesdata.author}`;
    
    }
    
    
// Get Quote From API
async function getQuote() {
    //loading();
    const proxyUrl = "https://type.fit/api/quotes";
    
    try {
        const response = await fetch(proxyUrl);
        data = await response.json();
        getNewQuotes();

        
        // If Author is blank, add 'Unknown'
        if (data === '') {
            authorText.innerText = 'Unknown';
        } 
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
       
    } catch (error) {
       
    }
}




// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getNewQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();

