import React from 'react'
import {reduxForm} from 'redux-form'
import validate from './validate'
import ReservationHandlingForm from "./ReservationHandlingForm";


//Component that passes relevant fields to ReservationHandlingForm for a reserving a bike process
const ReviewOrder = (props) => {
    return (
        <div>
            <ReservationHandlingForm
                header={{
                    title: "Review Order",
                    description: "Review your order before paying",
                    progress: 70,
                    icon: "check"
                }}

                fields={{
                    station: {
                        name: 'station',
                        label: 'Station',
                        type: 'readOnly',
                    },
                    mountainBikes: {
                        name: 'mountainBikes',
                        label: 'Mountain Bikes',
                        type: 'readOnly',
                    },
                    roadBikes: {
                        name: 'roadBikes',
                        label: 'Road Bikes',
                        type: 'readOnly',
                    },
                    startDate: {
                        name: 'startDate',
                        label: 'Start Date',
                        type: 'readOnly',
                    },
                    startTime: {
                        name: 'startTime',
                        label: 'Start Time',
                        type: 'readOnly',
                    }

                }}

                operations={{
                    back: {
                        link: props.previousPage,
                        type: 'button',
                        className: 'previous',
                        color: 'red',
                        text: 'Back'
                    },
                    next: {
                        link: props.onSubmit,
                        type: 'submit',
                        className: 'next',
                        color: 'green',
                        text: 'Next'
                    }
                }}
            />
        </div>
    )

};

export default reduxForm({
    form: 'reservebike',  //Form name is same
    destroyOnUnmount: false,
    validate
})(ReviewOrder)