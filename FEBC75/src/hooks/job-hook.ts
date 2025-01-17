import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addJobApi,
  addServiceApi,
  deleteHiredJobApi,
  deleteJobApi,
  getAllJobTypesApi,
  getAllJobsApi,
  getAllServicesApi,
  getHiredJobsApi,
  updateJobApi,
} from "../apis/job-api";

export const useGetAllJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getAllJobsApi,
  });
};

export const useGetAllJobTypes = () => {
  return useQuery({
    queryKey: ["jobTypes"],
    queryFn: getAllJobTypesApi,
  });
};

export const useAddJob = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: addJobApi,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useUpdateJob = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: updateJobApi,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useGetAllServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getAllServicesApi,
  });
};

export const useAddService = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: addServiceApi,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useGetHiredJobs = () => {
  return useQuery({
    queryKey: ["hiredJobs"],
    queryFn: getHiredJobsApi,
  });
};

export const useDeleteHiredJob = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: deleteHiredJobApi,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useDeleteJob = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: deleteJobApi,
    onSuccess: onSuccess,
    onError: onError,
  });
};
