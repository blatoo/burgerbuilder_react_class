import "./App.css";
import Layout from './components/Layout/Layout';

import React, { Component } from 'react'
import BurgerBuilder from "./components/BurgerBuilder/BurgerBuilder";

export class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder></BurgerBuilder>
        </Layout>
      </div>
    )
  }
}

export default App
