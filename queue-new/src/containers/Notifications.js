import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

class Notifications extends Component {
    componentWillMount() {
        this.props.actions.requestListData();
    }

    getNextUp(nextObj) {
        if (nextObj) {
            return  nextObj.cName + ' | ' + nextObj.cNumber;
        } else {
            return '';
        }
    }

    getCurrent(currentObj) {
        if (currentObj) {
            return  currentObj.cName + ' | ' + currentObj.cNumber;
        } else {
            return 'No one currently being serviced!';
        }
    }

    generateButton() {
        if (this.props.patientListData.data.length === 0 && !this.props.patientListData.current) {
            return <button disabled="true" action="submit" className="btn-xs btn-primary" onClick={() => {
                        if (window.confirm('Are you sure you want to complete this customers visit?')) { this.handleVisitSubmit();}
                    }}> Please add a customer </button>
        } else if (!(this.props.patientListData.current)) {
            return <button action="submit" className="btn-xs btn-primary" onClick={() => {
                          this.handleVisitSubmit()}
                    }> Send first patient through </button>
        } else {
            return <button action="submit" className="btn-xs btn-primary" onClick={() => {
                        if (window.confirm('Are you sure you want to complete this customers visit?')) { this.handleVisitSubmit();}
                    }}> Complete visit and move queue forward </button>
        }
    }

    handleVisitSubmit() {
        this.props.actions.moveQueue(this.props.patientListData.upNext, this.props.patientListData.current, this.props.patientListData.data[0]);
        console.log('Handeled!');
    }

    render() {
        return (
            <div>
                {console.log('notif data: ', this.props.patientListData.data)}
                <div> Up Next: {this.getNextUp(this.props.patientListData.upNext)} </div>
                <div> <span> Current Customer: {this.getCurrent(this.props.patientListData.current)} </span> { this.generateButton() } </div>
                <div> Average Wait Time: N/A </div>
                <div> Number of Customers Seen Today: 0 </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    patientListData: state.patientListData
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
