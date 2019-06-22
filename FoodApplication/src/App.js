import React, { Component } from 'react';
import Navigations from './config/router'
import {store,persistor} from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component {

  render() {
    return (
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
      <div className="App">
      <Navigations />      
      </div>
       </PersistGate>
     </Provider>
    );
  }

}

export default App;