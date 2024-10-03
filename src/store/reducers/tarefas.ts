import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tarefa from '../../models/Tarefa'
import * as enums from '../../utils/enums/Tarefa'

type TarefasState = {
  itens: Tarefa[]
}

const initialState: TarefasState = {
  itens: [
    {
      id: 1,
      descricao: 'Rever exercicio do modulo 7',
      prioridade: enums.Prioridade.IMPORTANTE,
      status: enums.Status.CONCLUIDA,
      titulo: 'Estudar JavaScript'
    },
    {
      id: 2,
      descricao: 'Estudar materia de apoio',
      prioridade: enums.Prioridade.NORMAL,
      status: enums.Status.PENDENTE,
      titulo: 'Estudar TypeScript'
    },
    {
      id: 3,
      descricao: 'Praticar construção de uma landing page',
      prioridade: enums.Prioridade.URGENTE,
      status: enums.Status.PENDENTE,
      titulo: 'Estudar React'
    }
  ]
}

const tarefasSlice = createSlice({
  name: 'tarefas',
  initialState,
  // initialState: {
  // itens: [
  //   // new Tarefa(
  //   //   'Estudar JavaScript',
  //   //   enums.Prioridade.IMPORTANTE,
  //   //   enums.Status.PENDENTE,
  //   //   '',
  //   //   1
  //   // ),
  //   // new Tarefa(
  //   //   'Estudar TypeScript',
  //   //   enums.Prioridade.URGENTE,
  //   //   enums.Status.CONCLUIDA,
  //   //   'rever aula 2 do modulo',
  //   //   2
  //   // ),
  //   // new Tarefa(
  //   //   'Estudar React',
  //   //   enums.Prioridade.URGENTE,
  //   //   enums.Status.PENDENTE,
  //   //   'praticar o useEffect',
  //   //   3
  //   // )
  // ]
  // },
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      // state.itens = state.itens.filter((tarefa) => tarefa.id !== action.payload)
      state.itens = [
        ...state.itens.filter((tarefa) => tarefa.id !== action.payload)
      ]
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaJaExiste = state.itens.find(
        (tarefa) =>
          tarefa.titulo.toLowerCase() === action.payload.titulo.toLowerCase()
      )

      if (action.payload.titulo.length < 1) {
        alert('insira um titulo para sua tarefa')
      } else if (tarefaJaExiste) {
        alert('Já existe uma tarefa com esse nome')
      } else {
        const ultimaTarefa = state.itens[state.itens.length - 1]
        const tarefaNova = {
          ...action.payload,
          id: ultimaTarefa ? ultimaTarefa.id + 1 : 1
        }
        state.itens.push(tarefaNova)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa].status = action.payload.finalizado
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    }
  }
})

export const { remover, editar, cadastrar, alteraStatus } = tarefasSlice.actions

export default tarefasSlice.reducer
