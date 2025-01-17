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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-10 w-11/12 md:w-3/4 lg:w-1/3 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="maCongViec"
              className="block text-sm font-medium leading-6 text-gray-900"
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
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.maCongViec && (
              <p className="text-sm text-red-500">This field is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="maNguoiThue"
              className="block text-sm font-medium leading-6 text-gray-900"
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
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.maNguoiThue && (
              <p className="text-sm text-red-500">This field is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="ngayThue"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Hire Date
            </label>
            <input
              {...register("ngayThue", { required: true })}
              type="date"
              id="ngayThue"
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.ngayThue && (
              <p className="text-sm text-red-500">This field is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="hoanThanh"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Completed
            </label>
            <input
              {...register("hoanThanh")}
              type="checkbox"
              id="hoanThanh"
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>

          <div className="mt-5 flex justify-evenly">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Service
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
