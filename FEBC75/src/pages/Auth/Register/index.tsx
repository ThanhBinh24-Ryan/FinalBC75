import FiverLogo from "../../../assets/Fiverr_Logo_Black.png";
import {
  EnvelopeIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { useInputState } from "../../../hooks/utils";
import { useSkills } from "../../../hooks/skill-hook";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "../../../hooks/user-hook";
import Swal from "sweetalert2";
import { useState } from "react";

type FormFields = {
  id: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
  skill: string[];
  certification: string[];
};

export default function Register() {
  const { data: skillsData } = useSkills();
  const {
    array: certifications,
    handleAdd: handleAddCertification,
    handleRemove: handleRemoveCertification,
    handleChange: handleCertificationChange,
  } = useInputState<string>([]);
  const {
    array: skills,
    handleAdd: handleAddSkill,
    handleRemove: handleRemoveSkill,
    handleChange: handleSkillChange,
  } = useInputState<string>([]);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();
  const onSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Sign Up Successfully",
      text: "Please login to Fiverr using your newly created email and password",
    }).then(() => {
      navigate("/login");
    });
  };

  const onError = (error: any) => {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Sign In Failed",
      text: error + " Please try again later.",
    });
  };

  const { mutate: signUp } = useSignUp(onSuccess, onError);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const updatedData = {
      ...data,
      skill: skills,
      certification: certifications,
    };
    console.log(updatedData);
    signUp(updatedData);
  };

  return (
    <>
      <input
        {...register("role")}
        className="hidden"
        type="text"
        name="role"
        id="role"
        value={"USER"}
      />
      <div className="flex min-h-screen">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex items-center">
              <img className="h-10 w-auto" src={FiverLogo} alt="Your Company" />
              <div>
                <h2 className="ml-5 text-4xl font-bold text-gray-900">
                  {" "}
                  Sign up
                </h2>
              </div>
            </div>

            <div className="mt-10">
              <div>
                <form
                  action="#"
                  method="POST"
                  className="space-y-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <EnvelopeIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        {...register("email", {
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <ShieldExclamationIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        {...register("password")}
                        type="password"
                        name="password"
                        id="password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <ShieldCheckIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        {...register("confirmPassword", {
                          validate: (value) =>
                            value === watch("password") ||
                            "Password and Confirm Password do not match",
                        })}
                        type="password"
                        name="confirmPassword"
                        id="confirm-password"
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                          const confirmPassword = e.target.value;
                          const password = watch("password");
                          setPasswordsMatch(confirmPassword === password);
                        }}
                      />
                    </div>
                    {!passwordsMatch && (
                      <p className="text-sm text-red-500">
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  <div className="flex">
                    <div className="w-2/3 pr-4">
                      <label
                        htmlFor="fullname"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <UserCircleIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          {...register("name")}
                          type="text"
                          name="name"
                          id="name"
                          required
                          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-1/3">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Gender
                      </label>
                      <select
                        {...register("gender")}
                        id="gender"
                        name="gender"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue="Male"
                      >
                        <option value="true">Male</option>
                        <option value="false">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-2/3 pr-4">
                      <label
                        htmlFor="phone-number"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center">
                          <label htmlFor="country" className="sr-only">
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            autoComplete="country"
                            className="h-full font-extralight rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500"
                          >
                            <option>VN</option>
                            <option>US</option>
                            <option>EU</option>
                          </select>
                        </div>
                        <input
                          {...register("phone")}
                          type="text"
                          name="phone"
                          id="phone-number"
                          required
                          className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400sm:text-sm sm:leading-6"
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-1/3">
                      <label
                        htmlFor="birthday"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Birthday
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("birthday")}
                          id="birthday"
                          name="birthday"
                          type="date"
                          autoComplete="bday-day"
                          required
                          className="text-sm block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Skills
                    </label>
                    {skills.map((_, index) => (
                      <div key={index} className="mt-2 flex">
                        <select
                          id="location"
                          name="location"
                          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                          onChange={(e) =>
                            handleSkillChange(index, e.currentTarget.value)
                          }
                        >
                          {skillsData?.map((skillData) => (
                            <option
                              key={skillData.id}
                              value={skillData.tenSkill}
                            >
                              {skillData.tenSkill}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          className="ml-2 rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                        >
                          -
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        handleAddSkill(skillsData?.[0].tenSkill || "")
                      }
                      className="mt-2 rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <label
                      htmlFor="certifications"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Certifications
                    </label>
                    {certifications.map((certification, index) => (
                      <div key={index} className="mt-2 flex">
                        <input
                          type="text"
                          name={`certification-${index}`}
                          id={`certification-${index}`}
                          value={certification}
                          onChange={(e) =>
                            handleCertificationChange(index, e.target.value)
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveCertification(index)}
                          className="ml-2 rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                        >
                          -
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddCertification("")}
                      className="mt-2 rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                      +
                    </button>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 border-transparent focus:border-transparent"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                  Already had account?
                  <Link
                    to="/login"
                    className="text-lg font-semibold pl-2 leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Sign in now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
