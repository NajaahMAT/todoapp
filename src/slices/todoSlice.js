import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';

// const getInitialTodo = () => {
//   // getting todo list
//   const localTodoList = window.localStorage.getItem('todoList');
//   // if todo list is not empty
//   if (localTodoList) {
//     return JSON.parse(localTodoList);
//   }


//   window.localStorage.setItem('todoList', []);
//   return [];
// };

// const cookies = new Cookies();
// const token = cookies.get('token')
// const user_id = cookies.get('user_id')

// const getAllTasksUrl = 'http://localhost:8080/task/user/' + user_id

// const getInitialTodo = async() => {
//     const response = await fetch( getAllTasksUrl, {
//         method: 'GET',
//         headers:{
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Authorization': `Bearer ${token}`
//         },
//         credentials: 'include',
//         mode: 'no-cors',
//     })

//     const todoList = await response.json()
//     console.log(todoList)
//     // return todoList

//     if (todoList) {
//       return todoList;
//     }
//     window.localStorage.setItem('todoList', []);
//     return [];
// }

const initialValue = {
  filterStatus: 'all',
  filterDates: {startDate: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), endDate: new Date()},
  // todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialValue,

  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          'todoList',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },

    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);

        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
            todo.description = action.payload.description;
            todo.file = action.payload.file;
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = [...todoListArr];
      }
    },

    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },

    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },

    updateFilterDates: (state, action) => {

      console.log(JSON.stringify(state.filterDates), JSON.stringify(action.payload))
      if (state.filterDates.startDate !== action.payload.startDate || state.filterDates.endDate !== action.payload.endDate){
        state.filterDates = action.payload;
      }
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, updateFilterStatus, updateFilterDates } =  todoSlice.actions;
export default todoSlice.reducer;
