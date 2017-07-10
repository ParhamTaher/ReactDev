import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchList } from '../actions/eventActions';
//import { fetchList } from '../actions';


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
              Queue Index
              {this.renderList()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { patientList: state.patientList };
}

export default connect(mapStateToProps, { fetchList })(QueueIndex);
