import {
  EnvelopeIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddAdmin, useUpdateUser } from "../../../../../hooks/user-hook";
import Swal from "sweetalert2";
import { User } from "../../../../../types/User.type";
import { useSkills } from "../../../../../hooks/skill-hook";
import { useInputState } from "../../../../../hooks/utils";
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

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser: () => void;
  selectingUser: User | null;
}

export default function UpdateUserModal({
  isOpen,
  onClose,
  onUpdateUser,
  selectingUser,
}: UpdateUserModalProps) {
  if (!isOpen || !selectingUser) return null;
  console.log(selectingUser);
  const { data: skillsData } = useSkills();
  const {
    array: certifications,
    handleAdd: handleAddCertification,
    handleRemove: handleRemoveCertification,
    handleChange: handleCertificationChange,
  } = useInputState<string>(selectingUser.certification || []);
  const {
    array: skills,
    handleAdd: handleAddSkill,
    handleRemove: handleRemoveSkill,
    handleChange: handleSkillChange,
  } = useInputState<string>(selectingUser.skill || []);

  const onSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "User updated successfully",
    }).then(() => {
      onUpdateUser();
    });
  };
  const onError = (error: any) => {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: error.content + " Please try again later.",
    });
  };
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const { mutate: updateUser } = useUpdateUser(onSuccess, onError);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const updatedData = {
      userId: selectingUser.id!,
      payload: {
        ...data,
        skill: skills,
        certification: certifications,
      },
    };
    console.log(updatedData);
    updateUser(updatedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-10 w-11/12 md:w-3/4 lg:w-1/3 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Update User</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="w-2/3 pr-4">
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
                  value={selectingUser.email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="w-1/3">
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </label>
              <select
                {...register("role")}
                id="role"
                name="role"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={selectingUser.role}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
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
              <p className="text-sm text-red-500">{errors.password.message}</p>
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
              <p className="text-sm text-red-500">Passwords do not match</p>
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
                  defaultValue={selectingUser.name}
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
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
                  defaultValue={selectingUser.phone}
                  className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400sm:text-sm sm:leading-6"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
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
                  defaultValue={selectingUser.birthday}
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
            {skills.map((skill, index) => (
              <div key={index} className="mt-2 flex">
                <select
                  id="location"
                  name="location"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                  value={skill}
                  onChange={(e) =>
                    handleSkillChange(index, e.currentTarget.value)
                  }
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
                  className="ml-2 rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddSkill(skillsData?.[0].tenSkill || "")}
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

          <div className="mt-5 flex justify-evenly">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Confirm Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
