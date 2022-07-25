import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageLogin from './PageLogin';
import PageSignUp from './PageSignUp';
import ResetPassword from './ResetPassword';
import Settings from './Settings';
import { BrowserRouter as Router } from 'react-router-dom';

const MockLogin = () => {
    return (
        <Router>
            <PageLogin/>
        </Router>
    )
}

const MockSignup = () => {
    return (
        <Router>
            <PageSignUp/>
        </Router>
    )
}

const MockResetPW = () => {
    return (
        <Router>
            <ResetPassword/>
        </Router>
    )
}

const MockSettings = () => {
    return (
        <Router>
            <Settings/>
        </Router>
    )
}

describe("other pages", () => {
    it('should renders login page', async () => {
        render(<MockLogin/>);
        //const element = screen.getAllByText(/Schedules/i);
        //expect(element).toBeInTheDocument();
    });

    it('should renders signup page', async () => {
        render(<MockSignup/>);
        //const element = screen.getAllByText(/Schedules/i);
        //expect(element).toBeInTheDocument();
    });

    it('should renders rpw page', async () => {
        render(<MockResetPW/>);
        //const element = screen.getAllByText(/Schedules/i);
        //expect(element).toBeInTheDocument();
    });

    it('should renders set page', async () => {
        render(<MockSettings/>);
        //const element = screen.getAllByText(/Schedules/i);
        //expect(element).toBeInTheDocument();
    });

})