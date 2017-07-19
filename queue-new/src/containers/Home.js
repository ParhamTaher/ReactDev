import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import SearchBar from '../components/SearchBar';

class Home extends Component {

    componentWillMount() {
        this.props.actions.requestList();
    }

    handleFormSubmit = (values) => {
        console.log('Form Info:', values);
        this.props.actions.addCustomer(values);
    };

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
                <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)} className="form-inline">
                    <Field name="name" component="input" className="form-control" type="text" label="Name" placeholder="Customer Name"/>
                    <Field name="number" component="input" className="form-control" type="text" label="Number" placeholder="Customer Number"/>
                    <button action="submit" className="btn btn-success">Add</button>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'add-customer',
})(Home));
