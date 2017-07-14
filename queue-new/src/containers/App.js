import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QueueIndex from './QueueIndex';
import * as Actions from '../actions';

class App extends React.Component {
  render() {
    return (
      <div>
        <QueueIndex />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gifs: state.gifs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
