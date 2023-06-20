import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEditCalendar } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';
import TodoModal from './TodoModel';
import { Cookies } from 'react-cookie';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [status, setStatus] = useState("")

  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const cookies = new Cookies();
  const token = cookies.get('token')

  const handleCheck = async() => {
    setChecked(!checked);
    // dispatch(
    //   updateTodo({ ...todo, status: checked ? 'incompleted' : 'complete' })
    // );

    if (checked){
      setStatus("completed")
    }

    await fetch('http://localhost:8080/task/status',{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        // mode: 'no-cors',
        body: new URLSearchParams({
            'status': status,
            'id': todo.id,
        })
    })
  };

  const handleDelete = async() => {
    // dispatch(deleteTodo(todo.id));

    const url = 'http://localhost:8080/task/'+ todo.id
    await fetch(url,{
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      // mode: 'no-cors',
      // body: new URLSearchParams({
      //     'status': status,
      //     'id': todo.id,
      // })
  })
    toast.success('Todo Deleted Successfully');
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>

          <CheckButton checked={checked} handleCheck={handleCheck} />

          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === 'complete' && styles['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.texts}>
              {todo.description}
            </p>
            <div>
              {todo.file}
            </div>
            <p className={styles.time}>
              {/* {format(new Date(todo.time), 'p, MM/dd/yyyy')} */}
              {todo.time}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
            Delete
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEditCalendar />
            Edit
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </>
  );

}

export default TodoItem;
