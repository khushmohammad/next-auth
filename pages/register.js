import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import Link from "next/link";
import useTranslation from "../hook/useTranslation";
import Layout from "../components/Layout";

const schema = yup
  .object({
    FirstName: yup
      .string()
      .required("Must have minimun 3 characters")
      .min(3)
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    MiddleName: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    LastName: yup
      .string()
      .required("Must have minimun 3 characters")
      .min(3)
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    userName: yup.string().required().email(),
    Country: yup.string(),
    // DateOfBirth: yup
    //   .date()
    //   .transform(function (value, originalValue) {
    //     if (this.isType(value)) {
    //       return value;
    //     }
    //     const result = parse(originalValue, "dd/MM/yyyy", new Date());
    //     console.log(result);
    //     return result;
    //   })
    //   .typeError("please enter a valid date")
    //   .required()
    //   .min("01/01/2006", "Date is too early"),
    Password: yup.string().required("Password is required").min(6),
    ConfirmPassword: yup
      .string()
      .oneOf([yup.ref("Password"), null], "Password doesn't match")
      .required(),
    // acceptTerms: yup
    //   .boolean()
    //   .oneOf([true], "Please accept Term and conditions"),
    // .required(),
  })
  .required();

const Register = () => {
  const [ShowPage, setShowPage] = useState(null);
  const [ApiError, setApiError] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const router = useRouter();
  const { t } = useTranslation();
  const { locale } = router;

  //form config
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  //check valid user
  async function getss() {
    const session = await getSession();
    if (session) {
      router.push("/");
    } else {
      setShowPage(true);
    }
  }
  useEffect(() => {
    getss();
  }, []);
  // methods

  const onSubmit = (data) => {
    alert("Data submitted");
    console.log(data);
  };

  return (
    <Layout>
      {ShowPage && ShowPage ? (
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-5">
                  <h5 className="card-title text-center mb-5 fw-light fs-5 text-capitalize">
                    Register
                  </h5>
                  <p className="my-2 text-danger"> {ApiError}</p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label className="form-label text-capitalize">
                        First Name
                      </label>
                      <input
                        {...register("FirstName")}
                        type="text"
                        className="form-control"
                        id="FirstName'"
                        placeholder="FirstName"
                      />
                      {errors.FirstName && (
                        <p className="my-2 text-danger">
                          {errors.FirstName.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-capitalize">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        {...register("MiddleName")}
                        className="form-control"
                        id="MiddleName'"
                        placeholder="MiddleName"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-capitalize">
                        Last Name
                      </label>
                      <input
                        {...register("LastName")}
                        type="text"
                        className="form-control"
                        id="LastName'"
                        placeholder="LastName"
                      />
                      {errors.LastName && (
                        <p className="my-2 text-danger">
                          {errors.LastName.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-capitalize">
                        userName/Email
                      </label>
                      <input
                        {...register("userName")}
                        type="email"
                        className="form-control"
                        id="userName'"
                        placeholder="Email address"
                      />
                      {errors.userName && (
                        <p className="my-2 text-danger">
                          {errors.userName.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <Controller
                        name="DateOfBirth"
                        control={control}
                        defaultValue={null}
                        render={({ field: { onChange, value } }) => (
                          <DatePicker
                            value={value}
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            closeOnScroll={true}
                            onChange={onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="mb-3">
                      <Controller
                        control={control}
                        name="Gender"
                        render={({ field: { onChange, value } }) => (
                          <fieldset
                            className="form-group"
                            value={value}
                            onChange={onChange}
                          >
                            <legend>Gender:</legend>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                value="Male"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault1"
                              >
                                Male
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                value="female"
                                id="flexRadioDefault2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault2"
                              >
                                Female
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                value="Other"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault2"
                              >
                                Other
                              </label>
                            </div>
                          </fieldset>
                        )}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-capitalize">
                        Password
                      </label>

                      <div className="mb-3">
                        <input
                          type="password"
                          {...register("Password")}
                          className="form-control"
                          placeholder="***"
                          aria-label="password"
                          aria-describedby="pass-addon2"
                        />
                      </div>
                      {errors.Password && (
                        <p className="my-2 text-danger">
                          {errors.Password.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-capitalize">
                        Confirm Password
                      </label>

                      <div className=" mb-3">
                        <input
                          type="password"
                          {...register("ConfirmPassword")}
                          className="form-control"
                          placeholder="***"
                          aria-label="ConfirmPassword"
                          aria-describedby="pass-addon"
                        />
                      </div>
                      {errors.ConfirmPassword && (
                        <p className="my-2 text-danger">
                          {errors.ConfirmPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <select
                        className="form-select"
                        {...register("Country")}
                        aria-label="Default select example"
                      >
                        <option defaultValue disabled>
                          Country
                        </option>
                        <option value="IN">India</option>
                        <option value="US">USA</option>
                        <option value="UK">UK</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          I agree all{" "}
                          <Link
                            href="/term-condition"
                            className="ml-2 text-blue-500"
                          >
                            terms & conditions
                          </Link>
                        </label>
                        {/* {errors.acceptTerms && (
                          <p className="my-2 text-danger">
                            {errors.acceptTerms.message}
                          </p>
                        )} */}
                      </div>
                    </div>

                    <div className="d-grid">
                      <button
                        className="btn btn-primary btn-login text-uppercase fw-bold"
                        type="submit"
                      >
                        {t.register}
                      </button>
                    </div>

                    <div className="form-check my-3 w-100 text-center">
                      <label className="form-check-label" htmlFor="login">
                        <Link href="forgot-password"> {t.login}</Link>
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

export default Register;
