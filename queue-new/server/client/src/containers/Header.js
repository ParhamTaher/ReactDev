import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// By replacing our <a> tags with <Link>, we let react-router-dom know
// it should just swap out the component passed into App instead of refreshing the page.
import { Link } from 'react-router-dom';
import * as Actions from '../actions';

class Header extends React.Component {
    componentWillMount() {
        this.props.actions.getBusinessName();
    }

    handleSignout() {
        this.props.actions.signOutUser();
    }

    renderAuthLinks() {
        // return an array of comma-separated <li>s, and React will just list them in order
        if (this.props.authenticated) {
            return [
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/profile">
                        My Profile
                    </Link>
                </li>,
                <li className="nav-item" key={2}>
                    <a
                        className="nav-link"
                        href="#"
                        onClick={() => this.handleSignout()}
                    >
                        Sign Out
                    </a>
                </li>
            ];
        } else {
            return [
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to="/signup">
                        Sign Up
                    </Link>
                </li>
            ];
        }
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/home">
                            {this.props.businessName}
                        </Link>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        {this.renderAuthLinks()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        businessName: state.bName.businessName
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
