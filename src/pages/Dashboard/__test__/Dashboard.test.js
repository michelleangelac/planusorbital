import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import ProjectDb from '../ProjectDb';
import TaskDb from '../TaskDashboard';
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

const MockTaskDb = () => {
    return (
        <Router>
            <TaskDb/>
        </Router>
    )
}

const MockProjectDb = () => {
    return (
        <Router>
            <ProjectDb/>
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

    /*it('should renders calendar', async () => {
        render(<MockCalendar/>);
        //const element = screen.getAllByText(/Schedules/i);
        //expect(element).toBeInTheDocument();
    });*/

    it('should renders taskdb', async () => {
        render(<MockTaskDb/>);
        //const element = screen.getAllByText(/Schedules/i);
        //expect(element).toBeInTheDocument();
    });

    it('should renders projectdb', async () => {
        render(<MockProjectDb/>);
    });
})