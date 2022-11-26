import './App.css';
import {useState} from 'react';
import {marked} from 'marked';


// safe zone

marked.setOptions({
  breaks: true
})

export default function App() {

  const [markdown, setMarkdown] = useState(`# Header

  ## Sub header
  [link](https://github.com/AndresPrza)
  
  code:
  \`<div></div>\`

  \`\`\`
  Codeblock:

  const abba = (a) => {
  function(b){
  return b + a;
  }
  }
  \`\`\`

  You want a list?
  1. Here's a list.
  + A list item.
  2. Here's another.
  + another list item
  + and another

  > Block Quotes!

  **Bold Text**

  ![alt text](https://c.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif)
  `);


  return (
    <div className="App" id="App">
      <textarea
      placeholder="Enter your Markdown Here..."
      name="text"
      id="editor"
      value={markdown}
      resizable={false}
      onChange={e=>setMarkdown(e.target.value)}
      className="textarea"></textarea>
      {markdown ? <Preview markdown = {markdown} /> : <></>}
    </div>
  );
}

function Preview({ markdown }) {

  return(

    <div
    className="Preview" id="preview"
    dangerouslySetInnerHTML={{ __html: marked(markdown) }}></div>
  );
}