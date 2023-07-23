import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const MockApp = () => {
    return (
        <Router>
            <App/>
        </Router>
    )
}

test('renders learn react link', () => {
    render(<MockApp/>);
    //const linkElement = screen.getByText(//i);
    //expect(linkElement).toBeInTheDocument();
});