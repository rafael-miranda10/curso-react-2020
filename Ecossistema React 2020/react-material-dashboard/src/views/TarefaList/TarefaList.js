/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  listar,
  salvar, 
  deletar,
  alterarStatus
} from '../../store/tarefasReducer';

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

const TarefaList = (props) => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [mensagemDialog, setMensagemDialog] = useState('');
  const [titleDialog, setTitleDialog] = useState('');


  useEffect(() => {
    props.listar();
  }, []);


  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={props.salvar} />
      <div className={classes.content}>
        <TarefasTable
          alterarStatus={props.alterarStatus}
          deleteAction={props.deletar}
          tarefas={props.tarefas}
        />
      </div>
      <Dialog
        onClose={e => setOpenDialog(false)}
        open={openDialog}
      >
        <DialogTitle>{titleDialog}</DialogTitle>
        <DialogContent>
          {mensagemDialog}
        </DialogContent>
        <DialogActions>
          // eslint-disable-next-line no-unused-vars
          <Button onClick={e => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  tarefas: state.tarefas.tarefas
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ listar, salvar, deletar,alterarStatus }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TarefaList);
