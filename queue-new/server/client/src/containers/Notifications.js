import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

class Notifications extends Component {
    componentDidMount() {
        this.props.actions.requestListData();
        this.props.actions.requestCompletedList();
    }

    getNextUp(upNext) {
        if (upNext) {
            if (!this.props.smsSentStatus.smsSent) {
                console.log('NOTIF UP NEXT!: ', upNext);
                this.props.actions.sendSMS(
                    upNext,
                    this.props.completedList.avgWaitTime,
                    this.props.businessName
                );
            }
            return upNext.cName + ' | ' + upNext.cNumber;
        } else {
            return '';
        }
    }

    /*
    sendSMS(upNext, avgWaitTime, businessName) {
        axios
            .post('/twilio/sendsms', { upNext, avgWaitTime, businessName })
            .then(res => {
                console.log('SMS sent: ', res.data.message);
                this.props.actions.updateSmsStatus(upNext.id);
            });
    }
    */

    getCurrent(currentObj) {
        if (currentObj) {
            return currentObj.cName + ' | ' + currentObj.cNumber;
        } else {
            return 'No one currently being serviced!';
        }
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

        this.props.actions.moveQueue(
            nextUp,
            this.props.patientListData.current,
            third
        );
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
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Up Next:</td>
                            <td>
                                {this.getNextUp(
                                    this.props.patientListData.upNext
                                )}
                            </td>
                            <td />
                        </tr>
                        <tr>
                            <td>Current Customer:</td>
                            <td>
                                {this.getCurrent(
                                    this.props.patientListData.current
                                )}
                            </td>
                            <td>
                                {this.generateButton()}
                            </td>
                        </tr>
                        <tr>
                            <td>Average Wait Time:</td>
                            <td>
                                {this.props.completedList.avgWaitTime}
                            </td>
                            <td />
                        </tr>
                        <tr>
                            <td>Number of Customers Seen Today:</td>
                            <td>
                                {this.props.completedList.numCustSeen}
                            </td>
                            <td />
                        </tr>
                        <tr>
                            <td />
                            <td />
                            <td>
                                <button
                                    action="submit"
                                    className="btn-sm btn-primary"
                                    onClick={() => {
                                        this.handleCSVSubmit({
                                            filename: 'CustomerList.csv'
                                        });
                                    }}
                                >
                                    {' '}Export to CSV{' '}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    patientListData: state.patientListData,
    completedList: state.completedList,
    businessName: state.bName.businessName,
    smsSentStatus: state.smsSentStatus
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
