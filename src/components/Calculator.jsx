import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import './Calculator.css';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const handleButtonClick = (value) => {
    setExpression(expression + value);
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      const evaluatedResult = evaluate(expression);
      setResult(evaluatedResult);
      setHistory([...history, { expression, result: evaluatedResult }]);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleHistoryClick = (entry) => {
    setExpression(entry.expression);
    setResult(entry.result);
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="expression">{expression}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {['7', '8', '9', '/', 'sin', 'cos', 'tan', 'log', '√'].map((item) => (
          <button key={item} onClick={() => handleButtonClick(item === '√' ? 'sqrt(' : item)}>
            {item}
          </button>
        ))}
        {['4', '5', '6', '*', '(', ')', 'pi', 'e', '^'].map((item) => (
          <button key={item} onClick={() => handleButtonClick(item)}>
            {item}
          </button>
        ))}
        {['1', '2', '3', '-', 'ln', 'exp', 'x!', '%'].map((item) => (
          <button key={item} onClick={() => handleButtonClick(item)}>
            {item}
          </button>
        ))}
        {['0', '.', '=', '+', 'C'].map((item) => (
          <button
            key={item}
            onClick={item === '=' ? handleCalculate : item === 'C' ? handleClear : () => handleButtonClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="history">
        <h3>History</h3>
        {history.map((entry, index) => (
          <div key={index} className="history-entry" onClick={() => handleHistoryClick(entry)}>
            <div>{entry.expression}</div>
            <div>= {entry.result}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
