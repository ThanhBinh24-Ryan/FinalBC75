// import { XMarkIcon } from "@heroicons/react/20/solid";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useAddJob } from "../../../../../hooks/job-hook";
// import Swal from "sweetalert2";

// type FormFields = {
//   tenCongViec: string;
//   danhGia: number;
//   giaTien: number;
//   nguoiTao: number;
//   hinhAnh: string;
//   moTa: string;
//   maChiTietLoaiCongViec: number;
//   moTaNgan: string;
//   saoCongViec: number;
// };

// interface AddJobModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddJob: () => void;
// }

// export default function AddJobModal({
//   isOpen,
//   onClose,
//   onAddJob,
// }: AddJobModalProps) {
//   const onSuccess = () => {
//     Swal.fire({
//       icon: "success",
//       title: "Success",
//       text: "New job created successfully",
//     }).then(() => {
//       onAddJob();
//     });
//   };
//   const onError = (error: any) => {
//     console.log(error);
//     Swal.fire({
//       icon: "error",
//       title: "Failed",
//       text: error.content + " Please try again later.",
//     });
//   };

//   const { mutate: addJob } = useAddJob(onSuccess, onError);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormFields>();
//   const onSubmit: SubmitHandler<FormFields> = (data) => {
//     addJob(data);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
//       <div className="bg-white rounded-lg p-6 z-10 w-11/12 md:w-3/4 lg:w-1/3 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
//         >
//           <XMarkIcon className="h-6 w-6" />
//         </button>

//         <h2 className="text-xl font-semibold mb-4">Add New Job</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div>
//             <label
//               htmlFor="tenCongViec"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Job Title
//             </label>
//             <input
//               {...register("tenCongViec", { required: true })}
//               type="text"
//               id="tenCongViec"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="danhGia"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Rating
//             </label>
//             <input
//               {...register("danhGia", { required: true, valueAsNumber: true })}
//               type="number"
//               id="danhGia"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="giaTien"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Price
//             </label>
//             <input
//               {...register("giaTien", { required: true, valueAsNumber: true })}
//               type="number"
//               id="giaTien"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="nguoiTao"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Creator ID
//             </label>
//             <input
//               {...register("nguoiTao", { required: true, valueAsNumber: true })}
//               type="number"
//               id="nguoiTao"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="hinhAnh"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Image URL
//             </label>
//             <input
//               {...register("hinhAnh", { required: true })}
//               type="text"
//               id="hinhAnh"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="moTa"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Description
//             </label>
//             <textarea
//               {...register("moTa", { required: true })}
//               id="moTa"
//               rows={3}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="maChiTietLoaiCongViec"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Job Type Detail ID
//             </label>
//             <input
//               {...register("maChiTietLoaiCongViec", {
//                 required: true,
//                 valueAsNumber: true,
//               })}
//               type="number"
//               id="maChiTietLoaiCongViec"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="moTaNgan"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Short Description
//             </label>
//             <input
//               {...register("moTaNgan", { required: true })}
//               type="text"
//               id="moTaNgan"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="saoCongViec"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Job Stars
//             </label>
//             <select
//               {...register("saoCongViec", {
//                 required: true,
//                 valueAsNumber: true,
//               })}
//               id="saoCongViec"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             >
//               <option value="">Select stars</option>
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <option key={star} value={star}>
//                   {star}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mt-5 flex justify-evenly">
//             <button
//               type="submit"
//               className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Add Job
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { XMarkIcon } from "@heroicons/react/20/solid";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddJob } from "../../../../../hooks/job-hook";
import Swal from "sweetalert2";

type FormFields = {
  tenCongViec: string;
  danhGia: number;
  giaTien: number;
  nguoiTao: number;
  hinhAnh: string;
  moTa: string;
  maChiTietLoaiCongViec: number;
  moTaNgan: string;
  saoCongViec: number;
};

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: () => void;
}

export default function AddJobModal({
  isOpen,
  onClose,
  onAddJob,
}: AddJobModalProps) {
  // Success handler
  const onSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "New job created successfully",
    }).then(() => {
      onAddJob();
    });
  };

  // Error handler
  const onError = (error: any) => {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: `${error.content || "Error occurred"}. Please try again later.`,
    });
  };

  // Add job mutation hook
  const { mutate: addJob } = useAddJob(onSuccess, onError);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    addJob(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white rounded-lg p-4 sm:p-6 z-10 w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl max-h-screen overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Add New Job</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Job Title */}
          <div>
            <label
              htmlFor="tenCongViec"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Job Title
            </label>
            <input
              {...register("tenCongViec", { required: true })}
              type="text"
              id="tenCongViec"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.tenCongViec && (
              <p className="text-red-500 text-sm mt-1">
                Job Title is required.
              </p>
            )}
          </div>

          {/* Other input fields */}
          {[
            { label: "Rating", name: "danhGia", type: "number" },
            { label: "Price", name: "giaTien", type: "number" },
            { label: "Creator ID", name: "nguoiTao", type: "number" },
            { label: "Image URL", name: "hinhAnh", type: "text" },
            { label: "Description", name: "moTa", type: "textarea" },
            {
              label: "Job Type Detail ID",
              name: "maChiTietLoaiCongViec",
              type: "number",
            },
            { label: "Short Description", name: "moTaNgan", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  {...register(field.name as keyof FormFields, {
                    required: true,
                  })}
                  id={field.name}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              ) : (
                <input
                  {...register(field.name as keyof FormFields, {
                    required: true,
                    valueAsNumber: field.type === "number",
                  })}
                  type={field.type}
                  id={field.name}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              )}
              {errors[field.name as keyof FormFields] && (
                <p className="text-red-500 text-sm mt-1">
                  {field.label} is required.
                </p>
              )}
            </div>
          ))}

          {/* Job Stars */}
          <div>
            <label
              htmlFor="saoCongViec"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Job Stars
            </label>
            <select
              {...register("saoCongViec", {
                required: true,
                valueAsNumber: true,
              })}
              id="saoCongViec"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select stars</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star}
                </option>
              ))}
            </select>
            {errors.saoCongViec && (
              <p className="text-red-500 text-sm mt-1">
                Job Stars are required.
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-5 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Job
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
