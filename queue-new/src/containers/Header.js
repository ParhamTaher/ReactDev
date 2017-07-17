import React from 'react';
import { connect } from 'react-redux';
// By replacing our <a> tags with <Link>, we let react-router-dom know
    // it should just swap out the component passed into App instead of refreshing the page.
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Business Name</Link>
          </div>
           <ul className="nav navbar-nav navbar-right">
             <li className="nav-item">
               <Link className="nav-link" to="/login">Login</Link>
             </li>
             <li className="nav-item">
               <Link className="nav-link" to="/signup">Signup</Link>
             </li>
           </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Header);
