import './App.css';
import { useState } from 'react'



export default function App() {

  const keys = [
    {
      value: 1,
      id: 'one',
      keyCode: 49,
      display: '1',
    },
    {
      value: 2,
      id: 'two',
      keyCode: 50,
      display: '2',
    },
    {
      value: 3,
      id: 'three',
      keyCode: 51,
      display: '3',
    },
    {
      value: 4,
      id: 'four',
      keyCode: 52,
      display: '4',
    },
    {
      value: 5,
      id: 'five',
      keyCode: 53,
      display: '5',
    },
    {
      value: 6,
      id: 'six',
      keyCode: 54,
      display: '6',
    },
    {
      value: 7,
      id: 'seven',
      keyCode: 55,
      display: '7',
    },
    {
      value: 8,
      id: 'eight',
      keyCode: 56,
      display: '8',
    },
    {
      value: 9,
      id: 'nine',
      keyCode: 57,
      display: '9',
    },
    {
      value: 0,
      id: 'zero',
      keyCode: 48,
      display: '0',
    },
    {
      value: '.',
      id: 'decimal',
      keyCode: 190,
      display: '.',
    },
    {
      value: 'C',
      id: 'clear',
      keyCode: 67,
      display: 'C',
    },
    {
      value: '+',
      id: 'add',
      keyCode: 187,
      display: '+',
    },
    {
      value: '-',
      id: 'subtract',
      keyCode: 189,
      display: '-',
    },
    {
      value: '*',
      id: 'multiply',
      keyCode: 187,
      display: '×',
    },
    {
      value: '/',
      id: 'divide',
      keyCode: 55,
      display: '÷',
    },
    {
      value: '=',
      id: 'equals',
      keyCode: 48,
      display: '=',
    },
  ]
  
  const [formula, setFormula] = useState('');
  const [result, setResult] = useState(0);
  
  const clear = () => {
    setFormula('');
    setResult(0);
  }
  
  const evaluate = () => {
    setResult(eval(formula));
    setFormula(eval(formula)+'');
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display-container">
          <div className="display-top">{result}</div>
          <div className="display" id="display">{formula===''?0:formula}</div>
        </div>
        <div className="keyBoard">
        {keys.map(key=>(<Key value={key.value} id={key.id} keyCode={key.keyCode} display={key.display} formula={formula} setFormula={setFormula} clear={clear} evaluate={evaluate} />))}
        </div>
      </div>
    </div>
  );
}

function Key({ value, id, display, formula, setFormula, clear, evaluate}) {

  const pushToFormula = () => {
    if(/-/.test(value)) setFormula(formula.concat(value).replace(/[.]*-*$/, value));
    else if(/\./.test(value) && !(/\.[\d]*$/.test(formula))) setFormula(formula.concat(value));
    else if(/[+*/]/.test(value)) setFormula(formula.concat(value).replace(/[.+\-*/]*$/, value));
    else if(/0/.test(value) && /[123456789]0*$/.test(formula)) setFormula(formula.concat(value));
    else if(/0/.test(value) && /\.0*$/.test(formula)) setFormula(formula.concat(value));
    else if(/0/.test(value)) setFormula(formula.concat(value).replace(/0*$/, value));
    else if(/\d/.test(value) && /\.\d*$/.test(formula)) setFormula(formula.concat(value));
    else if(/\d/.test(value)) setFormula(formula.concat(value).replace(/0+$/, value));
  };

  return(
      <div onClick={id==='equals'? evaluate: id==='clear'? clear: pushToFormula} className="Key" id={id}>{display}</div>
  )
}