import { render, screen , cleanup} from '@testing-library/react';
import AppHeader from '../AppHeader';
import "@testing-library/jest-dom";
import { updateFilterStatus } from '../../slices/todoSlice';

afterEach(() => {
    cleanup();
})

jest.mock('../Button')
jest.mock('../ToDoModel')
jest.mock('../DateRangePicker')
jest.mock(updateFilterStatus)

test('AppHeader Component renders and Button Component render in the parent component', () => {
    render(<AppHeader />);
    expect(screen.getByTestId("app-header")).toBeInTheDocument();
    expect(screen.getByTestId("button")).toBeInTheDocument();
    expect(screen.getByTestId("todo-model")).toBeInTheDocument();
    expect(screen.getByTestId("dateRangePicker")).toBeInTheDocument();
  })
