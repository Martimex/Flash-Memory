import React from "react";
import ErrorTemplate from "./error_template";
import Router from "next/router";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, message: 'to_be_announced' };
    }

    dismissError() {
        this.setState({ hasError: false, message: 'to_be_announced' });
    }

    componentDidCatch(error, info) {
        // Show fallback UI
        this.setState({ hasError: true, message: error.message });
        // If a client-side error occur, user is safely relocated to the app landing page
        Router.push('/'); 
    }

    render() {
        if(this.state.hasError) {
            const error_message = `Application error`;
            const error_description = `There has been some bug detected, that was not expected to happen. Please click the button below to return to the
                landing page. If you have encountered similiar issues before, please contact me at ____@gmail.com by including the error message below: 
            `;

            return(
                <ErrorTemplate errNo={417} errMessage={error_message} errDesc={error_description} errStack={this.state.message} closeError={() => this.dismissError()} />
            )
        }
        return this.props.children;
    }

}

export default ErrorBoundary;