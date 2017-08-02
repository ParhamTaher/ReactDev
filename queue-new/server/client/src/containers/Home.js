import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import SearchBar from '../components/SearchBar';
import Notifications from './Notifications';

class Home extends Component {
    componentWillMount() {
        this.props.actions.requestList();
    }

    handleAddSubmit = values => {
        console.log('Form Info:', values);
        this.props.actions.addCustomer(values);
        this.props.dispatch(reset('add-customer'));
    };

    handleRemoveSubmit = postID => {
        console.log('Remove ID:', postID);
        this.props.actions.removeCustomer(postID);
    };

    renderList() {
        var i = 0;
        return _.map(this.props.patientList.data, post => {
            i += 1;
            return (
                <tr key={post.id}>
                    <td>
                        {i}
                    </td>
                    <td>
                        {post.cName}
                    </td>
                    <td>
                        {post.cNumber}
                    </td>
                    <td>
                        {post.enterTime}
                    </td>
                    <td>
                        <button
                            action="submit"
                            className="btn-xs btn-danger pull-right"
                            onClick={() => this.handleRemoveSubmit(post.id)}
                        >
                            Remove
                        </button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-push-6">
                        <h4>Information</h4>
                        <Notifications />
                    </div>
                    <div className="col-sm-6 col-sm-pull-6">
                        <h4>Customer Queue</h4>
                        <SearchBar
                            onTermChange={this.props.actions.requestList}
                        />
                        <form
                            onSubmit={this.props.handleSubmit(
                                this.handleAddSubmit
                            )}
                            className="form-inline"
                        >
                            <Field
                                name="name"
                                component="input"
                                className="form-control"
                                type="text"
                                label="Name"
                                placeholder="Customer Name"
                            />
                            <Field
                                name="number"
                                component="input"
                                className="form-control"
                                type="text"
                                label="Number"
                                placeholder="Customer Number"
                            />
                            <button
                                action="submit"
                                className="btn btn-success pull-right"
                            >
                                Add
                            </button>
                        </form>
                        <table className="table table-striped table-hover">
                            <tbody>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Time Entered</th>
                                    <th />
                                </tr>
                                {this.renderList()}
                            </tbody>
                        </table>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'add-customer'
    })(Home)
);
