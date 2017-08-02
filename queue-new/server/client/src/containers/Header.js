import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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
                <LinkContainer to="/profile" key={1}>
                    <NavItem eventKey={1}>My Profile</NavItem>
                </LinkContainer>,
                <NavItem
                    key={2}
                    eventKey={2}
                    onClick={() => this.handleSignout()}
                >
                    Sign Out
                </NavItem>
            ];
        } else {
            return [
                <LinkContainer to="/login" key={1}>
                    <NavItem eventKey={1}>Login</NavItem>
                </LinkContainer>,
                <LinkContainer to="/signup" key={2}>
                    <NavItem eventKey={2}>Sign Up</NavItem>
                </LinkContainer>
            ];
        }
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link className="navbar-brand" to="/home">
                            {this.props.businessName}
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {this.renderAuthLinks()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
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

export default connect(mapStateToProps, mapDispatchToProps, null, {
    pure: false
})(Header);
