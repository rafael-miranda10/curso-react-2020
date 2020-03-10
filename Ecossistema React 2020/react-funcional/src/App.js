import React, { useState } from 'react';

function App() {

  const [numero, setNumero] = useState();
  const [sehundoNumero, setSegundoNumero] = useState();
  const [resultado, setResultado] = useState();

  const [state, setState] = useState({
    numero: 0,
    sehundoNumero: 0,
    resultado: 0
  });

  setNumero(10);

  return (
    <div>
         <input type="text" value={numero}/><br/>
         <input type="text" value={sehundoNumero}/><br/>
         <input type="text" value={resultado}/><br/>
    </div>
  );
}

export default App;
