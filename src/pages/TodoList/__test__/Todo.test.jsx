import { render, screen } from '@testing-library/react';
import Dashboard from '../../Dashboard/Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';

const MockDb = ({totalTasks, numOfTasks}) => {
    return (
        <Router>
            <Dashboard
                //totalTasks={totalTasks}
                //numOfTasks={numOfTasks}
            />
        </Router>
    )
}

describe("renders Dashboard", () => {
    it('db', () => {
        render(
            <MockDb
                //totalTasks={9}
                //numOfTasks={7}
            />
        );
        //const element = screen.getByText(/2/i);
        //expect(element).toBeInTheDocument();
    });
});