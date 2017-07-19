import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

const validate = values => {
    const errors = {};

    if (values.password !== values.passwordConfirmation ) {
        errors.password = 'Passwords do not match';
    }

    return errors;
};

class Profile extends React.Component {

    handleChangeTitleSubmit = (newName) => {
        console.log('Business Name:', newName);
        this.props.actions.updateBusinessName(newName);
    };

    handleFormSubmit = (values) => {
      console.log('Login Info:', values);
      //this.props.requestPasswordChange(values);
    };

    renderField = ({ input, label, type, meta: { touched, error } }) => (
          <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
              <label className="control-label">{label}</label>
              <div>
                  <input {...input} placeholder={label} className="form-control" type={type} />
                  {touched && error && <div className="help-block">{error}</div>}
              </div>
          </fieldset>
      );

    renderAuthenticationError() {
          if (this.props.authenticationError) {
              return <div className="alert alert-danger">{ this.props.authenticationError }</div>;
          } else {
              return <div></div>;
          }
    }

    render() {
        return (
            <div className="container">
                <h1>My Profile</h1>
                <input type="text" placeholder={ this.props.businessName } ref="myInput"/>
                <button action="submit" className="btn-xs btn-primary" onClick={() => this.handleChangeTitleSubmit(this.refs.myInput.value)}>Save</button>
                <h3> Change password </h3>
                <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                    <Field name="email" component={this.renderField} className="form-control" type="text" label="Current Password"/>
                    <Field name="password" component={this.renderField} className="form-control" type="password" label="New Password"/>
                    <Field name="passwordConfirmation" component={this.renderField} className="form-control" type="password" label="Confirm New Password"/>
                    <button action="submit" className="btn btn-primary">Submit</button>
                </form>

                { this.renderAuthenticationError() }

            </div>
        );
    }
}

const mapStateToProps = state => ({
	businessName: state.bName.businessName
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'add-customer',
  validate
})(Profile));
