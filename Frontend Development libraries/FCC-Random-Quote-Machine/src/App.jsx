import { useState, useEffect } from "react";
import "./App.css"

export default function App() {

  const [quotes, setQuotes] = useState([]);
  const [randQuote, setRandQuote] = useState([]);
  const [color, setColor] = useState('#333');
  const [opacity, setOpacity] = useState(0);

  const colors = [
    "#ffcc55",
    "#231942",
    "#1E000E",
    "#14342B",
    "#39393A",
    "#297373",
    "#FF8552",
    "#022B3A",
    "#5E0B15",
    "#202C59",
    "#F18805",
    "#4A051C",
    "#830A48",
    "#941C2F",
    "#03191E",
    "#547AA5",
    "#96A13A",
    "#F76C5E",
    "#F68E5F",
    "#A89F68",
    "#41521F",
    "#034748"
  ]
  
  useEffect(()=>{
    async function fetchData() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      
      let randIndex = Math.floor(Math.random() * data.length);
      let randColor = Math.floor(Math.random() * colors.length);
      setQuotes(data);
      setRandQuote(data[randIndex]);
      setColor(colors[randColor]);
      setOpacity(1);
    }
    fetchData();
    
  }, [])
  
  const getNewQuote = () => {
    let randIndex = Math.floor(Math.random() * quotes.length);
    let randColor = Math.floor(Math.random() * colors.length);
    setColor(colors[randColor]);
    setOpacity(0);
    setTimeout(()=>{
      setRandQuote(quotes[randIndex]);
      setOpacity(1);
    }, 500)
  }


  return (
    <div className="App" style={{"--maincolor": color}}>
      <div className="card" id="quote-box">
        {randQuote? (
          <>
            <div className="quote-text" id="text" style={{"opacity":opacity}}>
            <p><i class="fa-solid fa-quote-left"></i> {randQuote.text} <i class="fa-solid fa-quote-right"></i></p>
            </div>
            <div className="quote-author" id="author" style={{"opacity":opacity}}>
              {'~ ' + (randQuote.author || "No author")}
            </div>
            <div className="buttons-row">
              <div className="left-buttons">
                <a href={
                  "https://twitter.com/intent/tweet?hashtags:quotes&related=freecodecamp&text=" +
                  encodeURIComponent(
                    '"' + randQuote.text + (randQuote.author ? ('"  ~ ' + randQuote.author) : '"')
                  )
                } target="_BLANK" className="button twitter" id="tweet-quote"><i class="fa-brands fa-twitter"></i></a>
              </div>
              <div className="right-buttons">
                <button onClick={getNewQuote} className="button new-quote" id="new-quote">New quote</button>
              </div>
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}