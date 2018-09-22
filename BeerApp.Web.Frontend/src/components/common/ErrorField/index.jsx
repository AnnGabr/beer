import React, { Fragment } from 'react';

import './error-field.css';

const ErrorField = ({ errors }) => (
    <div className="field error-field">
        {errors && makeString(errors)}
    </div>
);

const makeString = (object) => {
    if (Array.isArray(object)) {
        if (object.length === 1) {
            return trimDot(object[0]);
        }

        return object.map((item, index) => (
            index === object.length - 1
                ? (
                    <span key={index} >{trimDot(item)}</span>
                )
                : (
                    <Fragment key={index}>
                        <span>{trimDot(item)}</span>&nbsp;·&nbsp;
                    </Fragment>
                )
        ));
    }

    return trimDot(object);
};

const trimDot = str => str.replace(new RegExp(/\. +$/, ''));

export default ErrorField;
