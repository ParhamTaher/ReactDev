import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupActions';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        // Post user info to firebase
        console.log(this.state);

        this.props.userSignupRequest(this.state);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Create an account with us!</h1>

                <div className="form-group">
                    <label htmlFor="username" className="control-label">Username</label>
                    <input
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        name="username"
                        className="form-control"
                    />
                </div>

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

                <div className="form-group">
                    <label htmlFor="passwordConfirmation" className="control-label">Confirm Password</label>
                    <input
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange}
                        type="text"
                        name="passwordConfirmation"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg">Sign Up</button>
                </div>
            </form>
        );
    }
}

SignUp.propTypes = {
    userSignupRequest: React.PropTypes.funcisRequired
};

export default connect(null, { userSignupRequest })(SignUp);
