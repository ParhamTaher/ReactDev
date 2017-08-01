import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

class Notifications extends Component {
    componentWillMount() {
        this.props.actions.requestListData();
        this.props.actions.requestCompletedList();
    }

    getNextUp(upNext) {
        if (upNext) {
            console.log('NEXTTTTTTTTT!!T!T!', upNext);
            if (upNext.smsSent !== true) {
                this.sendSMS(upNext);
                console.log('sending sms...');
            }

            return upNext.cName + ' | ' + upNext.cNumber;
        } else {
            return '';
        }
    }

    getCurrent(currentObj) {
        if (currentObj) {
            return currentObj.cName + ' | ' + currentObj.cNumber;
        } else {
            return 'No one currently being serviced!';
        }
    }

    sendSMS(upNext) {
        axios.post('/twilio/sendsms', upNext).then(res => {
            console.log('SMS sent: ', res.data.message);
            this.props.actions.updateSmsStatus(upNext.id);
        });
    }

    generateButton() {
        if (
            this.props.patientListData.data.length === 0 &&
            !this.props.patientListData.current
        ) {
            return (
                <button
                    disabled="true"
                    action="submit"
                    className="btn-xs btn-primary"
                    onClick={() => {
                        if (
                            window.confirm(
                                'Are you sure you want to complete this customers visit?'
                            )
                        ) {
                            this.handleVisitSubmit();
                        }
                    }}
                >
                    {' '}Please add a customer{' '}
                </button>
            );
        } else if (!this.props.patientListData.current) {
            return (
                <button
                    action="submit"
                    className="btn-xs btn-primary"
                    onClick={() => {
                        this.handleVisitSubmit();
                    }}
                >
                    {' '}Send patient through{' '}
                </button>
            );
        } else {
            return (
                <button
                    action="submit"
                    className="btn-xs btn-primary"
                    onClick={() => {
                        if (
                            window.confirm(
                                'Are you sure you want to complete this customers visit?'
                            )
                        ) {
                            this.handleVisitSubmit();
                        }
                    }}
                >
                    {' '}Complete visit and move queue forward{' '}
                </button>
            );
        }
    }

    handleVisitSubmit() {
        var third = null;
        var nextUp = null;

        if (!(typeof this.props.patientListData.data[1] === 'undefined')) {
            third = this.props.patientListData.data[1];
        }

        if (!(typeof this.props.patientListData.upNext === 'undefined')) {
            nextUp = this.props.patientListData.upNext;
        }

        console.log('NOTF upNext: ', this.props.patientListData.data[0]);
        this.props.actions.moveQueue(
            nextUp,
            this.props.patientListData.current,
            third
        );
        console.log('Handeled!: ', this.props.completedList.data);
    }

    handleCSVSubmit() {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = this.props.completedList.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = this.props.completedList.data.columnDelimiter || ',';
        lineDelimiter = this.props.completedList.data.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        if (!result.match(/^data:text\/csv/i)) {
            result = 'data:text/csv;charset=utf-8,' + result;
        }

        var encodedUri = encodeURI(result);
        window.open(encodedUri);
    }

    render() {
        return (
            <div>
                <div>
                    {' '}Up Next:{' '}
                    {this.getNextUp(this.props.patientListData.data[0])}{' '}
                </div>
                <div>
                    {' '}<span>
                        {' '}Current Customer:{' '}
                        {this.getCurrent(
                            this.props.patientListData.current
                        )}{' '}
                    </span>{' '}
                    {this.generateButton()}{' '}
                </div>
                <div>
                    {' '}Average Wait Time:{' '}
                    {this.props.completedList.avgWaitTime}{' '}
                </div>
                <div>
                    {' '}Number of Customers Seen Today:{' '}
                    {this.props.completedList.numCustSeen}{' '}
                </div>
                <div>
                    <button
                        action="submit"
                        className="btn-xs btn-primary"
                        onClick={() => {
                            this.handleCSVSubmit({
                                filename: 'CustomerList.csv'
                            });
                        }}
                    >
                        {' '}Export to CSV{' '}
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    patientListData: state.patientListData,
    completedList: state.completedList
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
