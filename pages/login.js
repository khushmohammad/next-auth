import React, { useEffect, useState } from 'react'
import { providers, signIn, getSession, csrfToken } from "next-auth/react";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { } from 'react-icons/ai';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


const schema = yup.object({
    Email: yup.string().required().email(),
    Password: yup.string().required(),
}).required();

function login() {
    const router = useRouter()
    // state
    const [ShowPage, setShowPage] = useState(null)
    const [ApiError, setApiError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    //form config
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: yupResolver(schema)
        });
    //check valid user
    async function getss() {
        const session = await getSession()

        if (session) {
            router.push('/')
        } else {
            setShowPage(true)
        }

    }
    useEffect(() => {
        getss()
    }, [])
    // methods

    const onSubmit = data => handleClick(data);

    const handleClick = async (data) => {

        const userdata = JSON.stringify(data)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_PATH}/login`, { email: data.Email, password: data.Password })

            if (res.data.data.token && res.status == 200) {
                await signIn("credentials", {
                    userdata,
                    redirect: true,
                    callbackUrl: '/'
                })
            } else {
                setApiError(`${res.data} Something went wrong in api`)
            }

        }
        catch (err) {
            console.log(err)
            setApiError("Email and Password In incorrect")

        }
    }
    const loginWithProvider = async (loginProvider) => {
        await signIn(loginProvider, { callbackUrl: "http://localhost:3000" });
    };

    return (
        <div>

            {ShowPage && ShowPage ?
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card border-0 shadow rounded-3 my-5">

                                <div className="card-body p-4 p-sm-5">
                                    <h5 className="card-title text-center mb-5 fw-light fs-5" >Sign In</h5>
                                    <p className='my-2 text-danger'> {ApiError}</p>

                                    <form onSubmit={handleSubmit(onSubmit)} >
                                        <div className="mb-3">
                                            {/* <label for="exampleFormControlInput1" className="form-label">Email address</label> */}
                                            <input

                                                {...register("Email")}

                                                type="text" className="form-control" id="email" placeholder="name@example.com" />
                                            {errors.Email && <p className='my-2 text-danger'>{errors.Email.message}</p>}
                                        </div>
                                        <div className="mb-3">

                                            <div className="input-group mb-3">
                                                <input type={showPassword ? "text" : "password"} autoComplete="on"  {...register("Password")} className="form-control" placeholder="Password" aria-label="Recipient's username" aria-describedby="pass-addon2" />
                                                <div className="input-group-append">

                                                    <button className="rounded-0 rounded-end btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword
                                                            ?
                                                            <AiFillEyeInvisible size={24} />

                                                            :
                                                            <AiFillEye size={24} />
                                                        }
                                                    </button>
                                                </div>

                                            </div>

                                            {/* <input type={showPassword ? "text" : "password"} autoComplete="on"  {...register("Password")} className="form-control" id="password" placeholder="Password" /> */}
                                            {errors.Password && <p className='my-2 text-danger'>{errors.Password.message}</p>}

                                        </div>

                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                                            <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                                Remember password
                                            </label>
                                        </div>
                                        <div className="d-grid">
                                            <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Login</button>
                                            {/*  onClick={() => handleClick()} */}
                                        </div>

                                    </form>
                                    <hr className="my-4" />
                                    <div className="d-grid mb-2">
                                        <button onClick={() => loginWithProvider('google')} className="btn btn-danger btn-login text-uppercase fw-bold" type="button">
                                            <i className="fab fa-google me-2"></i> Sign in with Google
                                        </button>
                                    </div>
                                    <div className="d-grid">
                                        <button onClick={() => loginWithProvider('facebook')} className="btn  btn-primary btn-facebook btn-login text-uppercase fw-bold" type="button">
                                            <i className="fab fa-facebook-f me-2"></i> Sign in with Facebook
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : ""
            }
        </div >
    )
}

export default login