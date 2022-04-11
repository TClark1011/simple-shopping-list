import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Global, MantineProvider } from '@mantine/core';
import { theme } from '@/config';

ReactDOM.render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <Global
                styles={(t) => ({
                    '*': {
                        color: t.white,
                    },
                    body: {
                        background: t.colors.dark[8],
                        margin: 0,
                    },
                })}
            />
            <App />
        </MantineProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
