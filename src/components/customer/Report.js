import React from 'react'
import SimpleForm from "../SimpleForm";
import {getUser} from "../../firebase/authentication";

class Report extends React.Component {

    //Checks if user is logged in and redirects to sign in if not
    authenticateUser = async () => {
        const user = await getUser();
        if (user === null)
            this.props.history.push("signin");
        return user
    };

    //TODO: Add firebase function to make report
    handleSubmit = async (values) => {
        // return reportIssue(this.state.category, this.state.description)
        //     .then((obj) => {
        //
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         throw new SubmissionError({
        //             _error: err.message
        //         })
        //     })
        console.log(values)
    };

    render() {
        return (
            <SimpleForm
                title= "How can we help?"
                dropdown={
                [
                    {key: "bikeFault", value: "Bike Fault", text: "Bike Fault"},
                {key: "complaint", value: "Complaint", text: "Complaint"},
                {key: "feedback", value: "Feedback", text: "Feedback"}
                    ]}
                textArea= "Please describe your query here"
                button= "Send Report"
                handleSubmit = {(values) => this.handleSubmit(values)}
            />
        )
    }
}

export default Report


