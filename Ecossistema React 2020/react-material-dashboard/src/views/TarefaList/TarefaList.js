/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TarefasToolbar, TarefasTable } from './components';
import axios from 'axios';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core'

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
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagemDialog, setMensagemDialog] = useState('');
  const [titleDialog, setTitleDialog] = useState('');

  const salvar = (tarefa) => {
    axios.post(API_URL, tarefa, {
      headers: HEADERS
    }).then(response => {
      const novaTarefa = response.data;
      setTarefas([...tarefas, novaTarefa]);
      setTitleDialog('Aviso!');
      setMensagemDialog('Muito bem! Tarefa adicionada na lista.');
      setOpenDialog(true);
    }).catch(erro => {
      setTitleDialog('Atenção!');
      setMensagemDialog('Ops! Algo não deu certo...');
      setOpenDialog(true);
    })
  }

  const listarTarefas = () => {
    axios.get(API_URL, {
      headers: HEADERS
    }).then(response => {
      const listaDeTarefas = response.data;
      setTarefas(listaDeTarefas);
    }).catch(erro => {
      setTitleDialog('Atenção!');
      setMensagemDialog('Ops! Algo não deu certo.  ', erro);
      setOpenDialog(true);
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
      setTitleDialog('Aviso!');
      setMensagemDialog('Muito bem! Tarefa alterada na lista.');
      setOpenDialog(true);
    }).catch(erro => {
      setTitleDialog('Atenção!');
      setMensagemDialog('Ops! Algo não deu certo. ', erro);
      setOpenDialog(true);
    })
  }


  const deletar = (id) => {
    axios.delete(`${API_URL}/${id}`, {
      headers: HEADERS
    }).then(response => {
      const lista = tarefas.filter(tarefa => tarefa.id !== id);
      setTarefas(lista);
      setTitleDialog('Aviso!');
      setMensagemDialog('Muito bem! Tarefa removida da lista.');
      setOpenDialog(true);
    }).catch(erro => {
      setTitleDialog('Atenção!');
      setMensagemDialog('Ops! Algo não deu certo. ', erro);
      setOpenDialog(true);
    })
  }


  useEffect(() => {
    listarTarefas();
  }, []);


  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable
          alterarStatus={alterarStatus}
          deleteAction={deletar}
          tarefas={tarefas}
        />
      </div>
      <Dialog open={openDialog} onClose={e => setOpenDialog(false)}>
        <DialogTitle>{titleDialog}</DialogTitle>
        <DialogContent>
          {mensagemDialog}
        </DialogContent>
        <DialogActions>
          <Button onClick={e => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TarefaList;
