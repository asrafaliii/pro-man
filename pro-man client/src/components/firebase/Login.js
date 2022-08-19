import React from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from './firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import Loading from '../shared/Loading';
// import { toast } from 'react-toastify';

const Login = () => {
    let location = useLocation();
    let from = location.state?.from?.pathname || '/'
    const { register, formState: { errors }, handleSubmit, reset, getValues } = useForm();
    const navigate = useNavigate()
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(
        auth
    );


    if (loading || sending) {
        <Loading></Loading>
    }

    if (user) {
        navigate(from, { replace: true })
    }

    let signInError;
    if (error || resetError) {
        signInError = <p className='text-red-500'><small>{error?.message || resetError?.message}</small></p>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
        reset()
        console.log(data)
    };
    return (
        <div className='mt-12'>
            <h1 className='text-3xl font-bold text-center '>Please Login First!</h1>
            <div className="hero-content mx-auto flex-col lg:flex-row-reverse ">
                <div className="card w-full  max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid email'
                                    }
                                })} type="text" placeholder="email" className="input input-bordered" />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500 ">{errors.email.message}</span>}
                                </label>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password is Required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters or longer'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                </label>
                            </div>
                            {signInError}

                            <p>Forgot password? <button type='button' onClick={async () => {
                                const values = getValues('email');
                                await sendPasswordResetEmail(values);
                                alert('Sent email');
                            }} className=" link-hover">Reset </button></p>

                            <div className="form-control ">
                                <button style={{ backgroundColor: 'black' }} className="btn text-white w-full mx-auto">Login</button>
                            </div>
                        </form>

                        <SocialLogin><span className='px-2'>Continue With</span></SocialLogin>
                        <label className="label">
                            <small>New to Pro-Man?<a href="/register" className="label-text-alt link px-2 font-bold link-hover">Please Register</a></small>
                        </label>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;