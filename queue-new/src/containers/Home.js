import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import SearchBar from '../components/SearchBar';

class Home extends Component {

    componentWillMount() {
        this.props.actions.requestList();
    }

    renderList() {
        return _.map(this.props.patientList, post => {
            return (
              <li className="list-group-item" key={post.id}>
                  {post.cName}
              </li>
            );
        });
    }

    render() {
        return (
            <div>
                <SearchBar onTermChange={this.props.actions.requestList} />
                {this.renderList()}
            </div>
        );
    }
}


const mapStateToProps = state => ({
	patientList: state.patientList
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
