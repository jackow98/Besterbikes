import React from 'react'
import DatePicker from 'react-datepicker';
import MobileDatePicker from 'react-mobile-datepicker';



import "react-datepicker/dist/react-datepicker.css";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            date: date
        });
    }

    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleCancel = () => {
        this.setState({ isOpen: false });
    }

    handleSelect = (date) => {
        this.setState({ date, isOpen: false });
    }

    render() {
        return (
            <div>

                <div className="ui horizontal divider">
                    Authentication
                </div>

                <div className="ui container middle aligned center aligned grid">
                    <p>Email </p>
                    <input type='text'/>

                    <p>Password</p>
                    <input type='text'/>
                </div>

                <div className="ui horizontal divider">
                    Your Name
                </div>

                <div className="ui container middle aligned center aligned grid">
                    <p>First Name</p>
                    <input type='text'/>

                    <p>Last Name</p>
                    <input type='text'/>
                </div>

                <div className="ui horizontal divider">
                    Select Date of Birth
                </div>

                <div className="ui container middle aligned center aligned grid">
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.handleChange}
                        dateFormat="MMMM d, yyyy"
                        showYearDropdown
                    />

                    <button
                        className="select-btn"
                        onClick={this.handleClick}>
                        Mobile Datepicker
                    </button>

                    <MobileDatePicker
                        value={this.state.date}
                        isOpen={this.state.isOpen}
                        onSelect={this.handleSelect}
                        onCancel={this.handleCancel}
                        confirmText="Confirm"
                        cancelText="Cancel"
                    />

                </div>
        </div>

        );
    }
}

export default SignUp