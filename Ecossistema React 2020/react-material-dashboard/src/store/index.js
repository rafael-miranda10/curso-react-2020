import { combineReducers } from 'redux';
import { tarefaReducer } from './tarefasReducer';
import {mensgaemReducer} from './mensagensReducer';

const mainReducer = combineReducers({
  tarefas: tarefaReducer,
  mensagens: mensgaemReducer
});

export default mainReducer;
