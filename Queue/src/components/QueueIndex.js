import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
//import { fetchList } from '../actions';

import Header from '../components/common/Header';


class QueueIndex extends Component {
    state = { patientList: '' };

    componentWillMount() {
        this.props.fetchList();
    }

    renderList() {
        return _.map(this.props.patientList, (post, key) => {
          console.log(post);
          console.log(key);
        });
    }

    render() {
        return (
            <div>
            <Header />
              Queue Index
              {this.renderList()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { patientList: state.patientList };
}

export default connect(mapStateToProps, actions)(QueueIndex);
