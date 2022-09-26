import React from 'react';
import s from '../../../assets/terms.module.css';

const Repair = () => {
    return (
        <div className={s.mainContainer}>
            <h3 className={s.title}>
                REPAIRS
            </h3>
            <p className={s.spacingOnlyTop}>
                repairs@fashion3.io
            </p>
            <p className={s.spacingOnlyTop}>
                Please use this email address for inquiries concerning product repairs only.
                In your email, please state type of product and type of damage, with photos.
            </p>
            <p className={s.spacingTopAndBottom}>
                We are unable to respond to any other requests using this address.
            </p>
        </div>
    )
}

export default Repair