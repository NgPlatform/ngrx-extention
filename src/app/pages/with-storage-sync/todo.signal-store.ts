import {patchState, signalStore, withMethods, withState} from "@ngrx/signals"
import {withStorageSync} from "../../libs/with-storage-sync"

export type TTodo = {
  user: string,
  task: string,
}

const sampleData: TTodo[] = [
  {
    user: 'user1',
    task: 'create with storage sync',
  },
  {
    user: 'user2',
    task: 'create sampleData',
  }
]

export const TodoSignalStore = signalStore(
  withState<{ todos: TTodo[] }>({todos: []}),
  withStorageSync<TTodo[]>(localStorage, 'todos', {sync: true}),
  withMethods((store) => ({
    addTask({todo}: { todo: TTodo }) {
      patchState(store, (state) => ({
        ...state,
        todos: [
          ...state.todos,
          todo,
        ]
      }))
    },

    editTask({idx, editTodo}: { idx: number, editTodo: TTodo }) {

      patchState(store, (state) => ({
        ...state,
        todos: state.todos.flatMap((todo, i) => i === idx ? editTodo : todo)
      }))
    },

    removeTodo({idx}: { idx: number }) {
      patchState(store, (state) => ({
        ...state,
        todos: state.todos.filter((_, i) => i !== idx),
      }))
    }
  })),
)
