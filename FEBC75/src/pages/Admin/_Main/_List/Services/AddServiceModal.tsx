import { XMarkIcon } from "@heroicons/react/20/solid";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddService } from "../../../../../hooks/job-hook";
import Swal from "sweetalert2";

type FormFields = {
  maCongViec: number;
  maNguoiThue: number;
  ngayThue: string;
  hoanThanh: boolean;
};

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddService: () => void;
}

export default function AddServiceModal({
  isOpen,
  onClose,
  onAddService,
}: AddServiceModalProps) {
  const onSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "New service added successfully",
    }).then(() => {
      onAddService();
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

  const { mutate: addService } = useAddService(onSuccess, onError);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    addService(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white rounded-2xl shadow-lg p-6 z-10 w-full max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto max-h-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 focus:outline-none"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Add New Service
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="maCongViec"
              className="block text-sm font-medium text-gray-700"
            >
              Job ID
            </label>
            <input
              {...register("maCongViec", {
                required: true,
                valueAsNumber: true,
              })}
              type="number"
              id="maCongViec"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.maCongViec && (
              <p className="text-xs text-red-500 mt-1">Job ID is required.</p>
            )}
          </div>

          <div>
            <label
              htmlFor="maNguoiThue"
              className="block text-sm font-medium text-gray-700"
            >
              User ID
            </label>
            <input
              {...register("maNguoiThue", {
                required: true,
                valueAsNumber: true,
              })}
              type="number"
              id="maNguoiThue"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.maNguoiThue && (
              <p className="text-xs text-red-500 mt-1">User ID is required.</p>
            )}
          </div>

          <div>
            <label
              htmlFor="ngayThue"
              className="block text-sm font-medium text-gray-700"
            >
              Hire Date
            </label>
            <input
              {...register("ngayThue", { required: true })}
              type="date"
              id="ngayThue"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.ngayThue && (
              <p className="text-xs text-red-500 mt-1">
                Hire Date is required.
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              {...register("hoanThanh")}
              type="checkbox"
              id="hoanThanh"
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="hoanThanh"
              className="text-sm font-medium text-gray-700"
            >
              Completed
            </label>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              className="w-full mr-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Service
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full ml-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
