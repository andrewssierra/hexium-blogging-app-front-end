import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    request: operation => {
        const token = document.cookie.replace('Authorization=', '');
        console.log(token);
        if (token) {
            operation.setContext({
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
    }
});

ReactDOM.render(
    <BrowserRouter>
        <App client={client} />
    </BrowserRouter>,
    document.getElementById('root')
);
