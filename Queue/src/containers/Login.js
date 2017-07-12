import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        console.log(this.props.authenticated);
        this.props.userLoginRequest(this.state);
        console.log(this.props.authenticated);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login!</h1>

                <div className="form-group">
                    <label htmlFor="email" className="control-label">Email</label>
                    <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="control-label">Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onChange}
                        type="text"
                        name="password"
                        className="form-control"
                    />
                </div>

                <div>
                    {this.props.authenticationError &&
                        <span className="help-block">
                            {this.props.authenticationError}
                            </span>
                    }
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg">Login</button>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticationError: state.auth.error,
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps, Actions)(Login);
