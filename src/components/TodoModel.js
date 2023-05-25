import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';
import {useAuth0} from '@auth0/auth0-react';

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
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();

  const {isAuthenticated, loginWithRedirect} = useAuth0();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === '') {
      toast.error('Please enter a title');
      return;
    }

    if (title && status && file && description) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            description,
            file,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Task added successfully');
      }

      if (type === 'update') {
        if (todo.title !== title || todo.status !== status || todo.description !== description || todo.file !== file) {
          dispatch(updateTodo({ ...todo, title, description, file, status }));
          toast.success('Task Updated successfully');
        } else {
          toast.error('No changes made');
          return;
        }
      }
      setModalOpen(false);
    }
  };

  // const getBase64 = (file) => {
  //     return new Promise((resolve,reject) => {
  //       const reader = new FileReader();
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = error => reject(error);
  //       reader.readAsDataURL(file);
  //     });
  // }

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

              {isAuthenticated ? (
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
                        // onChange={(e) =>  getBase64(e.target.files[0]).then(base64 => {
                        //   localStorage["fileBase64"] = base64;
                        //   console.log("file stored",base64);
                        //   setFile(URL.createObjectURL(e.target.files[0]))
                        // })}
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
              ) : (
                <button className={styles.loginButton}  onClick={() => loginWithRedirect()}>
                    Please Sign In Before Add/ Edit Tasks
                </button>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  );
}

export default TodoModal;
