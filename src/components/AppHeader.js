import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModel';
import { updateFilterStatus , updateFilterDates} from '../slices/todoSlice';
import DateRangePickerComp from './DateRangePicker';


function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
  const initialFilterDates = useSelector((state) => state.todo.filterDates);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  const updateFilterByDates = (range) => {
    // setFilterStatus(e.target.value);

    if (range.startDate !== initialFilterDates.startDate || range.endDate !== initialFilterDates.endDate){
      dispatch(updateFilterDates(range));
    }

  };

  return (
    <div className={styles.appHeader} data-testid="app-header">
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Task
      </Button>

      <DateRangePickerComp value={initialFilterDates} onChange={updateFilterByDates}/>

      <SelectButton
        id="status"
        onChange={(e) => updateFilter(e)}
        value={filterStatus}
      >

        <option value="all">All</option>
        <option value="todo">ToDo</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
      </SelectButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
