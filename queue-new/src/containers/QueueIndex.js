import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchList } from '../actions';
//import { fetchList } from '../actions';

import SearchBar from '../components/SearchBar';
let customers = [];

class QueueIndex extends Component {
    //state = { patientList: ''};


    componentWillMount() {
        this.props.fetchList();
    }

    refactorList(lst) {
        let new_list = [];
        _.map(lst, (post, key) => {
            return (
                new_list.push({id: key, cName: post.cName, cNumber: post.cNumber})
            );
        });
        return new_list;
    }

    renderList(term) {
        console.log(term);
        /*
        let filteredList = this.refactorList(this.props.patientList).filter(
            (person) => {
                return person.cName.indexOf(term) !== -1;
            }
        );
        */
        console.log(this.refactorList(this.props.patientList));
        /*
        return _.map(this.props.patientList, post => {
            return (
              <li className="list-group-item" key={post.id}>
                  {post.cName}
              </li>
            );
        });
        */
    }


    render() {
        return (
            <div>
                {this.renderList('')}
                <SearchBar onSearchTermChange={this.renderList}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { patientList: state.patientList };
}

export default connect(mapStateToProps, { fetchList })(QueueIndex);
