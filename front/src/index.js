import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';

// redux
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// reducer
import qnaReducer from './reducers/qnaReducer.js';
import menuReducer from './reducers/menuReducer.js';
import notievtReducer from './reducers/notievtReducer.js';
import PersonalQnAReducer from "./reducers/personalQnaReducer.js"

// css
import "./css/reset.css";
import "./css/style.css";
import "./css/common.css";

const store = configureStore({
  reducer : {
    notievt : notievtReducer,
    qna : qnaReducer,
    menu : menuReducer,
    personal : PersonalQnAReducer,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
