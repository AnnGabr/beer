import React, { Fragment } from 'react';

import './error-field.css';

const ErrorField = ({ errors }) => {
    const makeString = (array) => {
        if (Array.isArray(array)) {
            if (array.length === 1) {
                return array[0];
            }

            return array.map((item, index) => (
                index === array.length - 1
                    ? (
                        <span key={index} >{item}</span>
                    )
                    : (
                        <Fragment key={index}>
                            <span>{item}</span>&nbsp;·&nbsp;
                        </Fragment>
                    )
            ));
        }

        return array;
    };

    return (
        <div className="field error-field">
            {makeString(errors)}
        </div>
    );
};

export default ErrorField;
