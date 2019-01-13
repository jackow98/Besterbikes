import React from 'react'
import {Field, reduxForm} from "redux-form";
import {signIn, signUp} from "../Firebase/authentication";

//Class to render a form based on props
class AccountForm extends React.Component{

    //Calls firebase to handle account correctly depending on what account process is being carried out
    onSubmit = (formValues) => {
            if (this.props.button.text === 'Sign In'){
                signIn(formValues)
            }else if (this.props.button.text === 'Sign Up'){
                signUp(formValues)
            }
    };

    //Renders Error if field invalid
    renderError = ({error, touched}) => {
        if (touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    };


    // Renders JSX elements for each field in the redux form
    renderInput = ({input, label, type, meta}) => {

        const classname = `field ${meta.error && meta.touched ? 'error' : ''}`;

        return(
            <div className={classname}>
                <label>{label}</label>
                <input {...input} placeholder={label} type={type}/>
                {this.renderError(meta)}
            </div>
        )
    };

    //Renders Redux Form Fields for all props passed in from parent component
    renderFields = Object.values(this.props.fields).map((key, index) => {
        return(
            <Field
                key = {index}
                name = {key.name}
                component = {this.renderInput}
                label = {key.label}
                type = {key.type}
            />
        )
    });

    //Renders main body of form
    render(){
        return(

            <form className="ui container middle aligned center aligned grid form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="column">

                    {this.renderFields}

                    <button className="ui big primary button">
                        {this.props.button.text}
                    </button>

                    <br/>

                </div>
            </form>
        )
    }
};

const validate = (formValues) => {

    const errors = {};

    // Object.values(this.props.fields).map((key, index) => {
    //
    //     const name = key.name;

        if (!formValues.email) {
            //Only run if user did not enter email
            errors.email = 'You must enter a email' ;
        }
    // };

    return errors;
};

export default reduxForm({
    form: 'AccountForm',
    validate
})(AccountForm);