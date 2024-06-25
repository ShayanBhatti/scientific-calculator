import React, { useState } from 'react';
import { evaluate, pi, e } from 'mathjs';
import './Calculator.css';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [memory, setMemory] = useState(0);
  const [isDegree, setIsDegree] = useState(true);

  const handleButtonClick = (value) => {
    setExpression(expression + value);
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      let evalExpression = expression
        .replace('π', pi)
        .replace('e', e)
        .replace('^', '**')
        .replace('√', 'sqrt')
        .replace('ln', 'log')
        .replace('log', 'log10')
        .replace('sin', isDegree ? 'sin(degToRad(' : 'sin(')
        .replace('cos', isDegree ? 'cos(degToRad(' : 'cos(')
        .replace('tan', isDegree ? 'tan(degToRad(' : 'tan(')
        .replace('sin⁻¹', 'asin')
        .replace('cos⁻¹', 'acos')
        .replace('tan⁻¹', 'atan');

      if (isDegree) {
        evalExpression = evalExpression.replace(/\)sin\(/g, '))').replace(/\)cos\(/g, '))').replace(/\)tan\(/g, '))');
      }

      const evaluatedResult = evaluate(evalExpression);
      setResult(evaluatedResult);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleMemoryAdd = () => {
    setMemory(memory + Number(result));
  };

  const handleMemorySubtract = () => {
    setMemory(memory - Number(result));
  };

  const handleMemoryRecall = () => {
    setExpression(expression + memory);
  };

  const handleDegreeToggle = (isDegree) => {
    setIsDegree(isDegree);
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="result">{result || expression || 0}</div>
      </div>
      <div className="buttons">
        <div className="button-row">
          <button onClick={() => handleButtonClick('sin')}>sin</button>
          <button onClick={() => handleButtonClick('cos')}>cos</button>
          <button onClick={() => handleButtonClick('tan')}>tan</button>
          <button onClick={() => handleButtonClick('sin⁻¹')}>sin⁻¹</button>
          <button onClick={() => handleButtonClick('cos⁻¹')}>cos⁻¹</button>
          <button onClick={() => handleButtonClick('tan⁻¹')}>tan⁻¹</button>
        </div>
        <div className="button-row">
          <button onClick={() => handleButtonClick('π')}>π</button>
          <button onClick={() => handleButtonClick('e')}>e</button>
          <button onClick={() => handleButtonClick('^')}>x^y</button>
          <button onClick={() => handleButtonClick('x³')}>x³</button>
          <button onClick={() => handleButtonClick('x²')}>x²</button>
          <button onClick={() => handleButtonClick('e^x')}>e^x</button>
        </div>
        <div className="button-row">
          <button onClick={() => handleButtonClick('10^x')}>10^x</button>
          <button onClick={() => handleButtonClick('y√x')}>y√x</button>
          <button onClick={() => handleButtonClick('³√x')}>³√x</button>
          <button onClick={() => handleButtonClick('√')}>√</button>
          <button onClick={() => handleButtonClick('ln')}>ln</button>
          <button onClick={() => handleButtonClick('log')}>log</button>
        </div>
        <div className="button-row">
          <button onClick={() => handleButtonClick('(')}>(</button>
          <button onClick={() => handleButtonClick(')')}>)</button>
          <button onClick={() => handleButtonClick('1/x')}>1/x</button>
          <button onClick={() => handleButtonClick('%')}>%</button>
          <button onClick={() => handleButtonClick('n!')}>n!</button>
          <button onClick={handleClear}>AC</button>
        </div>
        <div className="button-row">
          <button onClick={() => handleButtonClick('7')}>7</button>
          <button onClick={() => handleButtonClick('8')}>8</button>
          <button onClick={() => handleButtonClick('9')}>9</button>
          <button onClick={() => handleButtonClick('+')}>+</button>
          <button onClick={() => setExpression(expression.slice(0, -1))}>Back</button>
        </div>
        <div className="button-row">
          <button onClick={() => handleButtonClick('4')}>4</button>
          <button onClick={() => handleButtonClick('5')}>5</button>
          <button onClick={() => handleButtonClick('6')}>6</button>
          <button onClick={() => handleButtonClick('-')}>-</button>
          <button onClick={() => handleButtonClick('Ans')}>Ans</button>
        </div>
        <div className="button-row">
          <button onClick={() => handleButtonClick('1')}>1</button>
          <button onClick={() => handleButtonClick('2')}>2</button>
          <button onClick={() => handleButtonClick('3')}>3</button>
          <button onClick={() => handleButtonClick('*')}>*</button>
          <button onClick={handleMemoryAdd}>M+</button>
        </div>
        <div className="button-row">
          <button onClick={() => handleButtonClick('0')}>0</button>
          <button onClick={() => handleButtonClick('.')}>.</button>
          <button onClick={() => handleButtonClick('EXP')}>EXP</button>
          <button onClick={() => handleButtonClick('/')}>/</button>
          <button onClick={handleMemorySubtract}>M-</button>
        </div>
        <div className="button-row">
          <button onClick={() => handleButtonClick('±')}>±</button>
          <button onClick={() => handleButtonClick('RND')}>RND</button>
          <button onClick={handleCalculate}>=</button>
          <button onClick={handleMemoryRecall}>MR</button>
        </div>
      </div>
      <div className="degree-toggle">
        <label>
          <input type="radio" checked={isDegree} onChange={() => handleDegreeToggle(true)} />
          Deg
        </label>
        <label>
          <input type="radio" checked={!isDegree} onChange={() => handleDegreeToggle(false)} />
          Rad
        </label>
      </div>
    </div>
  );
};

export default Calculator;
