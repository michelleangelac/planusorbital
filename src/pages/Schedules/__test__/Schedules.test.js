import { render, screen } from '@testing-library/react';
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import Schedules from '../Schedules';
import BigCalendar from '../Calendar';
import PopupSch from '../Popup';
import { BrowserRouter as Router } from 'react-router-dom';

const MockSched = () => {
    return (
        <Router>
            <Schedules/>
        </Router>
    )
}

const MockCalendar = () => {
    return (
        <Router>
            <BigCalendar/>
        </Router>
    )
}

describe("Schedules", () => {
    it('should renders Schedule', async () => {
        render(<MockSched/>);
        //const element = screen.getAllByText(/Schedules/i);
        //expect(element).toBeInTheDocument();
    });

    it('should renders Calendar', async () => {
        render(<MockCalendar/>);
        //const element = screen.getAllByText(/Schedules/i);
        //expect(element).toBeInTheDocument();
    });

    it('should renders Popup', async () => {
        render(<PopupSch/>);
    });
})