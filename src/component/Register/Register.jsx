import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";
import auth from '../../firebase/firebase.init';

const Register = () => {

    // useState
    const [toggleEye, setToggleEye] = useState(false);
    const [registerError, setRegisterError] = useState(null);
    const [registerSuccess, setRegisterSuccess] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    // handleRegister function
    const handleRegister = e => {
        e.preventDefault();

        // remove previous success and error
        setRegisterError('');
        setRegisterSuccess('');
        setPasswordError('');

        // all input field value
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(name, email, password,terms)

        // email verification
        if (password.length < 6) {
            setPasswordError("Password should be at least 6 characters")
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setPasswordError("Password must contain at least 1 Upper case letter");
            return;
        }
        else if (!/[0-9]/.test(password)) {
            setPasswordError("Password must contain at least any number");
            return;
        }
        else if (!/[!@#$%^&*]/.test(password)) {
            setPasswordError("Password must contain at least 1 special character '!@#$%^&*'");
            return;
        }
        else if(!terms){
            setPasswordError("Please accept our term and condition");
            return;
        }

        // create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);

                //send email veriFication
                sendEmailVerification(result.user)
                .then(() => alert("Please check your email and do verification"))
                setRegisterSuccess("User created successfully")

                // updateProfile
                updateProfile(result.user,{
                    displayName: name,
                })
            })
            .catch(error => {
                console.error(error);
                if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                    setRegisterError("This email already in use, Please login or Create another account")
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleRegister} className='bg-slate-200 p-8 shadow-xl rounded-2xl w-3/5 mx-auto '>
                <h2 className='text-3xl w-72 rounded-xl mx-auto text-center mb-5 border-b-8 pb-3 border-blue-400'>Please Register</h2>
                <div className=''>
                    <input className='shadow-xl border border-gray-200 rounded-md py-3 px-8 mb-4 w-full' type="text" name="name" placeholder='Your Name' id="" required /><br />
                    <input className='shadow-xl border border-gray-200 rounded-md py-3 px-8 mb-4 w-full' type="email" name="email" placeholder='Email Address' id="" required /><br />
                    <div className='relative'>
                        <input className='shadow-xl border border-gray-200 rounded-md py-3 px-8 mb-2 w-full' type={toggleEye ? "text" : "password"} name="password" placeholder='Password' id="" required />
                        <div onClick={() => setToggleEye(!toggleEye)} className='text-3xl absolute top-3 right-8'>{toggleEye ? <IoEyeOff /> : < IoEye />}</div>
                    </div><br />
                    {
                        passwordError && <h2 className='text-red-700 mb-2 text-2xl'>{passwordError}</h2>
                    }
                    <div className='flex gap-3 mb-3 items-center'>
                        <input className='h-4 w-4' type="checkbox" name="terms" id="" /> <h2 className='text-xl'>Accepts our <a>Terms and Conditions</a></h2>
                    </div>
                    <input className='w-full h-14 btn btn-primary' type="submit" value="Register" />
                    {
                        registerError && <h2 className='text-red-700 my-4 text-2xl'>{registerError}</h2>
                    }
                    {
                        registerSuccess && <h2 className='text-green-700 my-4 text-2xl'>{registerSuccess}</h2>
                    }
                </div>
            </form>
        </div>
    );
};

export default Register;