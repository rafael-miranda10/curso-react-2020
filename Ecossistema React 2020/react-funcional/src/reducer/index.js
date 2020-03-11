import React, { useState } from 'react';
import useStore from './somaReducer';

function ReducerHook() {

  const [numero, setNumero] = useState('');
  const [segundoNumero, setSegundoNumero] = useState('');
  const [store, dispacth] = useStore();


  const Somar = () => {
    const numeroInteiro = parseInt(numero);
    const segundoNumeroInteiro = parseInt(segundoNumero);
   
     dispacth({
         type: 'SOMA',
         payload: numeroInteiro + segundoNumeroInteiro
     })
  }

  const Subtrair = () => {
    const numeroInteiro = parseInt(numero);
    const segundoNumeroInteiro = parseInt(segundoNumero);
   
     dispacth({
         type: 'SUBTRACAO',
         payload: numeroInteiro - segundoNumeroInteiro
     })

  }


  return (
    <div>
      Número 1:<br />
      <input type="text" value={numero} onChange={e => setNumero(e.target.value)} /><br />
         Número 2:<br />
      <input type="text" value={segundoNumero} onChange={e => setSegundoNumero(e.target.value)} /><br />
      <button onClick={Somar}>Somar</button><br />
      <button onClick={Subtrair}>Subitrair</button><br />
         Resultado:<br />
      <input type="text" value={store.resultado} readOnly /><br />
    </div>
  );
}

export default ReducerHook;
