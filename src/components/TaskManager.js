import React from 'react';
import AppContent from './AppContent';
import AppHeader from './AppHeader';
import PageTitle from './PageTitle';
import styles from '../styles/modules/app.module.scss';
import { Cookies } from 'react-cookie';

const TaskManager = () => {
    const cookies = new Cookies();

    const token = cookies.get('token')
    const user_id = cookies.get('user_id')

    console.log('token: ' + JSON.stringify(token));
    console.log('user_id: ' + JSON.stringify(user_id));

    return(
      <div>
            <PageTitle>TODO List</PageTitle>
            <div className={styles.app__wrapper}>
                <AppHeader />
                <AppContent />
            </div>
      </div>
    )
}
export default TaskManager
