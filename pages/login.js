import { useEffect, useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import useTranslation from "../hook/useTranslation";
import Layout from "../components/Layout";

const schema = yup
  .object({
    Email: yup.string().required().email(),
    Password: yup.string().required(),
  })
  .required();

const login = () => {
  const [ApiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { t } = useTranslation();

  //form config
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //check valid user
  async function getss() {
    const session = await getSession();
    if (session) {
      router.push("/");
    }
  }
  useEffect(() => {
    getss();
  }, []);
  // methods

  const onSubmit = (data) => {
    console.log(data);
    handleClick(data);
  };

  const handleClick = async (data) => {
    const userdata = JSON.stringify(data);
    try {
      const res = await signIn("credentials", {
        userdata,
        redirect: false,
        callbackUrl: "/",
      });

      if (res.ok) {
        router.push("/");
      } else {
        setApiError("Invalid User Name or Password");
        //  console.log(res)
      }
    } catch (err) {
      // console.log(err)
      setApiError(`Something went wrong in api`);
    }
  };
  const loginWithProvider = async (loginProvider) => {
    await signIn(loginProvider, { callbackUrl: "http://localhost:3000" });
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5 text-capitalize">
                  {t.login}
                </h5>
                <p className="my-2 text-danger"> {ApiError}</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label text-capitalize">
                      {t.email_address}
                    </label>
                    <input
                      {...register("Email")}
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder={t.email_address}
                    />
                    {errors.Email && (
                      <p className="my-2 text-danger">{errors.Email.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-capitalize">
                      {t.password}
                    </label>

                    <div className="input-group mb-3">
                      <input
                        type={showPassword ? "text" : "password"}
                        autoComplete="on"
                        {...register("Password")}
                        className="form-control"
                        placeholder={t.password}
                        aria-label="Recipient's username"
                        aria-describedby="pass-addon2"
                      />
                      <div className="input-group-append">
                        <button
                          className="rounded-0 rounded-end btn btn-outline-secondary"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <AiFillEye size={24} />
                          ) : (
                            <AiFillEyeInvisible size={24} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* <input type={showPassword ? "text" : "password"} autoComplete="on"  {...register("Password")} className="form-control" id="password" placeholder="Password" /> */}
                    {errors.Password && (
                      <p className="my-2 text-danger">
                        {errors.Password.message}
                      </p>
                    )}
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberPasswordCheck"
                    />
                    <label
                      className="form-check-label text-capitalize"
                      htmlFor="rememberPasswordCheck"
                    >
                      {t.remember_me}
                    </label>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      {t.login}
                    </button>
                  </div>

                  <div className="form-check my-3 w-100 text-center">
                    <label
                      className="form-check-label"
                      htmlFor="rememberPasswordCheck"
                    >
                      <Link href="forgot-password"> {t.forgot_password}</Link>
                    </label>
                  </div>

                  <div className="d-grid">
                    <Link href="register">
                      <button
                        className="btn btn-secondary btn-login text-uppercase fw-bold w-100"
                        type="submit"
                      >
                        {t.register}
                      </button>
                    </Link>
                    {/*  onClick={() => handleClick()} */}
                  </div>
                </form>
                <hr className="my-4" />
                <div className="d-grid mb-2">
                  <button
                    onClick={() => loginWithProvider("google")}
                    className="btn btn-danger btn-login text-uppercase fw-bold"
                    type="button"
                  >
                    <i className="fab fa-google me-2"></i>{" "}
                    {t.sign_in_with_google}
                  </button>
                </div>
                <div className="d-grid">
                  <button
                    onClick={() => loginWithProvider("facebook")}
                    className="btn  btn-primary btn-facebook btn-login text-uppercase fw-bold"
                    type="button"
                  >
                    <i className="fab fa-facebook-f me-2"></i>{" "}
                    {t.sign_in_with_facebook}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default login;
