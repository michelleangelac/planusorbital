import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from './Projects';
import Project from './Project';
import PopupPrj from './Popup';
import MemberList from './Member';
import { BrowserRouter as Router } from 'react-router-dom';

const MockProjects = () => {
    return (
        <Router>
            <Projects/>
        </Router>
    )
}

const MockProject = () => {
    return (
        <Router>
            <Project/>
        </Router>
    )
}

const MockMember = () => {
    return (
        <Router>
            <Project/>
        </Router>
    )
}

describe("Projects", () => {
    it('should renders projects', async () => {
        render(<MockProjects/>);
        //const element = screen.getAllByText(/Schedules/i);
        //expect(element).toBeInTheDocument();
    });

    it('should renders project', async () => {
        render(<MockProject/>);
        //const element = screen.getAllByText(/Schedules/i);
        //expect(element).toBeInTheDocument();
    });

    it('should renders popup', async () => {
        render(<PopupPrj/>);
    });

    it('should renders member', async () => {
        render(<MockMember/>);
        //const element = screen.getAllByText(/Schedules/i);
        //expect(element).toBeInTheDocument();
    });

})