import React, { useEffect, useMemo, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    resendVerification,
    verifyEmail,
} from '../actions/auth';

import {
    useLocation,
} from "react-router-dom";

const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}


const VerifyEmail = (props) => {
    const {
        errorMessage
    } = props;
    const dispatch = useDispatch();
    const query = useQuery();
    const [resend, setResend] = useState(false);
    const email = query.get("email");
    const token = query.get("token");

    useEffect(() => {
        dispatch(verifyEmail({ email, token }));
    }, []);

    const resendEmail = (myProps) => {
        setResend(true);
        dispatch(resendVerification(myProps));
    }

    return (
        <div className="content index600 shadow-w">
            {
                errorMessage && errorMessage.verifyEmail
                && (
                    <div>
                        <h2 className="textCenter">Failed to verify account</h2>
                        <h3 className="textCenter">
                            {errorMessage.verifyEmail.message === 'INCORRECT_TOKEN' && 'Incorrect Token'}
                            {errorMessage.verifyEmail.message === 'AUTH_TOKEN_ALREADY_USED' && 'Token Already Used'}
                            {errorMessage.verifyEmail.message === 'AUTH_TOKEN_EXPIRED' && 'Token Expired'}
                            {errorMessage.verifyEmail.message === 'USER_NOT_EXIST' && 'User Does\'nt Exist'}
                        </h3>
                    </div>
                )
            }
            {
                errorMessage
                && errorMessage.verifyEmail
                && errorMessage.verifyEmail.resend
                && !resend
                && (
                    <p className="resend" onClick={() => resendEmail({ email: email })}>
                        Resend verification code
                    </p>
                )
            }
            {
                resend
                && (
                    <p className="resended">
                        Email verification code has been resended
                    </p>
                )
            }
        </div>
    )
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, null)(VerifyEmail);