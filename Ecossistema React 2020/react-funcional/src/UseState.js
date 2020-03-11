import React, { useState } from 'react';

function UseState() {

  const [numero, setNumero] = useState();
  const [segundoNumero, setSegundoNumero] = useState();
  const [resultado, setResultado] = useState();

  const Somar = () => {
    const numeroInteiro = parseInt(numero);
    const segundoNumeroInteiro = parseInt(segundoNumero);
    setResultado(numeroInteiro + segundoNumeroInteiro);
  }

  return (
    <div>
      Número 1:<br />
      <input type="text" value={numero} onChange={e => setNumero(e.target.value)} /><br />
         Número 2:<br />
      <input type="text" value={segundoNumero} onChange={e => setSegundoNumero(e.target.value)} /><br />
      <button onClick={Somar}>Somar</button><br />
         Resultado:<br />
      <input type="text" value={resultado} /><br />
    </div>
  );
}

export default UseState;