import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import NotFound from './NotFound';
import './index.css';

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
);