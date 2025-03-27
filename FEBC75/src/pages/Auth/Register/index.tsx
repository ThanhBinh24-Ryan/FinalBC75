import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "../../../hooks/user-hook";
import { useSkills } from "../../../hooks/skill-hook";
import { useInputState } from "../../../hooks/utils";
import FiverrLogo from "../../../assets/Fiverr_Logo_Black.png";
import {
  EnvelopeIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import Swal from "sweetalert2";

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
      title: "Sign Up Successful",
      text: "Please log in with your new email and password.",
    }).then(() => navigate("/login"));
  };

  const onError = (error: any) => {
    Swal.fire({
      icon: "error",
      title: "Sign Up Failed",
      text: `${error}. Please try again later.`,
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
    signUp(updatedData);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Form Section */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center">
            <img
              className="h-12 w-auto mx-auto"
              src={FiverrLogo}
              alt="Fiverr Logo"
            />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Create an Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us today! Fill in your details below.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input {...register("role")} type="hidden" value="USER" />

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative mt-1">
                <EnvelopeIcon className="absolute left-3 top-1/2 h-5 w-5 text-gray-400 transform -translate-y-1/2" />
                <input
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  id="email"
                  required
                  className="block w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <ShieldExclamationIcon className="absolute left-3 top-1/2 h-5 w-5 text-gray-400 transform -translate-y-1/2" />
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  id="password"
                  required
                  className="block w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative mt-1">
                <ShieldCheckIcon className="absolute left-3 top-1/2 h-5 w-5 text-gray-400 transform -translate-y-1/2" />
                <input
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  type="password"
                  id="confirm-password"
                  required
                  className="block w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Confirm your password"
                  onChange={(e) =>
                    setPasswordsMatch(e.target.value === watch("password"))
                  }
                />
              </div>
              {!passwordsMatch && (
                <p className="mt-1 text-sm text-red-600">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Full Name & Gender */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative mt-1">
                  <UserCircleIcon className="absolute left-3 top-1/2 h-5 w-5 text-gray-400 transform -translate-y-1/2" />
                  <input
                    {...register("name", { required: "Full name is required" })}
                    type="text"
                    id="name"
                    required
                    className="block w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  {...register("gender")}
                  id="gender"
                  className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue="true"
                >
                  <option value="true">Male</option>
                  <option value="false">Female</option>
                </select>
              </div>
            </div>

            {/* Phone & Birthday */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="relative mt-1">
                  <select className="absolute left-0 top-0 h-full py-2 pl-3 pr-2 border-r border-gray-300 bg-gray-50 rounded-l-md text-gray-500 sm:text-sm">
                    <option>VN</option>
                    <option>US</option>
                    <option>EU</option>
                  </select>
                  <input
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                    type="text"
                    id="phone-number"
                    required
                    className="block w-full pl-16 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="birthday"
                  className="block text-sm font-medium text-gray-700"
                >
                  Birthday
                </label>
                <input
                  {...register("birthday", {
                    required: "Birthday is required",
                  })}
                  type="date"
                  id="birthday"
                  required
                  className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              {skills.map((skill, index) => (
                <div key={index} className="mt-2 flex items-center gap-2">
                  <select
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {skillsData?.map((skillData) => (
                      <option key={skillData.id} value={skillData.tenSkill}>
                        {skillData.tenSkill}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    -
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddSkill(skillsData?.[0]?.tenSkill || "")}
                className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                + Add Skill
              </button>
            </div>

            {/* Certifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Certifications
              </label>
              {certifications.map((cert, index) => (
                <div key={index} className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={cert}
                    onChange={(e) =>
                      handleCertificationChange(index, e.target.value)
                    }
                    className="block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter certification"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCertification(index)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    -
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddCertification("")}
                className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                + Add Certification
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>

            {/* Login Link */}
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Background Image */}
      <div className="relative hidden flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80"
          alt="Background"
        />
      </div>
    </div>
  );
}
