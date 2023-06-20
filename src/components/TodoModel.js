import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';
import { Cookies } from 'react-cookie';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  // const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();

  const cookies = new Cookies();
  const token = cookies.get('token')
  const user_id = cookies.get('user_id')

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setFile(todo.file);
      setStatus(todo.status);
    } else {
      setTitle('');
      setDescription('');
      setFile();
      setStatus('incomplete');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === '') {
      toast.error('Please enter a title');
      return;
    }

    if (title && status && file && description) {
      if (type === 'add') {
        // dispatch(
        //   addTodo({
        //     id: uuid(),
        //     title,
        //     status,
        //     description,
        //     file,
        //     time: new Date().toLocaleString(),
        //   })
        // );
        // toast.success('Task added successfully');
        console.log("Authorization: ", `Bearer ${token}`)


         await fetch('http://localhost:8080/task',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            mode: 'no-cors',
            body: new URLSearchParams({
                'title': title,
                'status': status,
                'description': description,
                'file': file,
                'user_id': user_id,
            })
        })

        // const content = await response.json()
        // console.log(content)


      }

      if (type === 'update') {
        if (todo.title !== title || todo.status !== status || todo.description !== description || todo.file !== file) {
          // dispatch(updateTodo({ ...todo, title, description, file, status }));
          // toast.success('Task Updated successfully');
          await fetch('http://localhost:8080/task',{
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            mode: 'no-cors',
            body: new URLSearchParams({
                'title': title,
                'status': status,
                'description': description,
                'file': file,
                'id': todo.id,
            })
        })

        } else {
          // toast.error('No changes made');
          return;
        }
      }

      setModalOpen(false);
    }
  };


  return (
        <AnimatePresence data-testid="todo-model">
        {modalOpen && (
          <motion.div
            className={styles.wrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
                className={styles.container}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                  <motion.div
                    className={styles.closeButton}
                    onKeyDown={() => setModalOpen(false)}
                    onClick={() => setModalOpen(false)}
                    role="button"
                    tabIndex={0}
                    // animation
                    initial={{ top: 40, opacity: 0 }}
                    animate={{ top: -10, opacity: 1 }}
                    exit={{ top: 40, opacity: 0 }}
                  >
                      <MdOutlineClose />
                  </motion.div>
                  <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                      <h1 className={styles.formTitle}>
                        {type === 'add' ? 'Add' : 'Update'} TODO
                      </h1>

                      <label htmlFor="title">
                        Title
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                      </label>

                      <label htmlFor="description">
                        Description
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                      </label>

                      <label htmlFor="file">
                        Upload Image
                        <input
                          type="file"
                          id="file"
                          onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
                        />
                      </label>

                      <label htmlFor="type">
                        Status
                        <select
                            id="type"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="todo">Todo</option>
                            <option value="incomplete">Incomplete</option>
                            <option value="complete">Completed</option>
                        </select>
                      </label>

                      <div className={styles.buttonContainer}>
                        <Button type="submit" variant="primary">
                          {type === 'add' ? 'Add Task' : 'Update Task'}
                        </Button>
                        <Button variant="secondary" onClick={() => setModalOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                  </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  );
}

export default TodoModal;
