import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";
import auth from '../../firebase/firebase.init';

const Login = () => {

    // useState and useRef
    const [toggleEye, setToggleEye] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(null);
    const emailRef = useRef();

    // handle login function 
    const handleLogin = e => {
        e.preventDefault();

        // all input field
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // previous error and success remove
        setLoginError('');
        setLoginSuccess('');

        // sign in with email and password
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if (!result.user.emailVerified) {
                    setLoginError("You didn't do verification please enter login again and check your email")
                    sendEmailVerification(result.user)
                        .then(() => alert("Please check your email and verify email"))
                    return;
                }
                else if (result.user.displayName) {
                    setLoginSuccess(result.user.displayName,'Login has done successfully')
                }
            })
            .catch(error => {
                console.error(error);
                console.log(error.message)
                if (error.message === "Firebase: Error (auth/invalid-credential).") {
                    setLoginError("Wrong Password Please provide a right password")
                }
            })
    }

    // handleForgotPassword function
    const handleForgotPassword = () => {
        const email = emailRef.current.value;
        console.log('clicked', email);
        if (!email) {
            alert("Please Provide a Email")
            return;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please Provide a valid Email like 'example.gmail.com'")
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(result => {
                console.log(result);
                alert("Please check your email")
            })
            .catch(error => {
                console.error(error);
            })

    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                name='email'
                                className="input input-bordered"
                                ref={emailRef}
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className='relative'>
                                <input className='shadow-xl border border-gray-200 rounded-md py-3 px-4 mb-2 w-full' type={toggleEye ? "text" : "password"} name="password" placeholder='Password' id="" required />
                                <div onClick={() => setToggleEye(!toggleEye)} className='text-3xl absolute top-2 right-[10%]'>{toggleEye ? <IoEyeOff /> : < IoEye />}</div>
                            </div>
                            <label className="label">
                                <a onClick={handleForgotPassword} className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    
                    {
                            loginError && <h2 className='text-red-700 my-4 text-2xl'>{loginError}</h2>
                        }
                        {
                            loginSuccess && <h2 className='text-green-700 my-4 text-2xl'>{loginSuccess}</h2>
                        }
                </div>
            </div>
        </div>
    );
};

export default Login;