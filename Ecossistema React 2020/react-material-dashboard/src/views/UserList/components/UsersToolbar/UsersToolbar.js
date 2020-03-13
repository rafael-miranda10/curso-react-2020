import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const UsersToolbar = props => {
  const { className, ...rest } = props;

  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  const classes = useStyles();

  const submit = (event) => {
    event.preventDefault();
    console.log(`Valores: descricao - ${descricao}, categoria - ${categoria}`);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
      </div>
      <div className={classes.row}>
        <Grid container>
          <Grid
            item
            md={4}
          >
            <TextField
              className={classes.searchInput}
              fullWidth
              label="Descrição:"
              placeholder="Descrição da tarefa"
              onChange={e => setDescricao(e.target.value)}
            />
          </Grid>
          <Grid
            item
            md={4}
          >
            <FormControl fullWidth>
              <InputLabel>Categoria: </InputLabel>
              <Select onChange={e => setCategoria(e.target.value)}>
                <MenuItem value="">Selecione</MenuItem>
                <MenuItem value={'TRABALHO'}>TRABALHO</MenuItem>
                <MenuItem value={'ESTUDOS'}>ESTUDOS</MenuItem>
                <MenuItem value={'OUTROS'}>OUTROS</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            md={4}
          >
            <Button
              onClick={submit}
              color="default"
              variant="container"
            >Adicionar</Button>
          </Grid>
        </Grid>

      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
