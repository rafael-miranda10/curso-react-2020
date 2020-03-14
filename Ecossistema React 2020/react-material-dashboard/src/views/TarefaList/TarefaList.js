/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TarefasToolbar, TarefasTable } from './components';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';
const HEADERS = { 'x-tenant-id': 'rafael.miranda@email.com' };

const TarefaList = () => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);

  const salvar = (tarefa) => {
    axios.post(API_URL, tarefa, {
      headers: HEADERS
    }).then(response => {
      const novaTarefa = response.data;
      setTarefas([...tarefas, novaTarefa]);
    }).catch(erro => {
      console.log(erro);
    })
  }

  const listarTarefas = () => {
    axios.get(API_URL, {
      headers: HEADERS
    }).then(response => {
      const listaDeTarefas = response.data;
      setTarefas(listaDeTarefas);
      console.log(listaDeTarefas);
    }).catch(erro => {
      console.log(erro);
    })
  }

  const alterarStatus = (id) => {
    axios.patch(`${API_URL}/${id}`, null, {
      headers: HEADERS
    }).then(response => {
      const lista = [...tarefas];
      lista.forEach(tarefa => {
        if (tarefa.id === id) {
          tarefa.done = true;
        }
      })
      setTarefas(lista);
    }).catch(erro => {
      console.log(erro);
    })
  }

  useEffect(() => {
    listarTarefas();
  }, []);


  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable alterarStatus={alterarStatus} tarefas={tarefas} />
      </div>
    </div>
  );
};

export default TarefaList;
