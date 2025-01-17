import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addAdminApi,
  deleteUserApi,
  getAllUsersApi,
  getAllUsersByPageIndex,
  loginApi,
  signUpApi,
  updateUserApi,
} from "../apis/user-api";
import { User } from "../types/User.type";

export const useLogin = (
  onSuccess?: (data: User) => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useSignUp = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: signUpApi,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useUpdateUser = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: updateUserApi,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useAddAdmin = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: addAdminApi,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersApi,
  });
};

export const useGetAllUsersByPageIndex = (pageIndex: number) => {
  return useQuery({
    queryKey: ["users", pageIndex],
    queryFn: () => getAllUsersByPageIndex(pageIndex),
  });
};

export const useDeleteUser = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: deleteUserApi,
    onSuccess: onSuccess,
    onError: onError,
  });
};
