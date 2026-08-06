import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

// form 
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  MdKeyboardBackspace, MdKeyboardDoubleArrowLeft, MdKeyboardArrowLeft, MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight, MdEdit, MdDelete
} from 'react-icons/md'

import { useQueryClient } from '@tanstack/react-query'
import usePagination from '../hooks/pagination'

import LoadingPage from '../components/LoadingPage'
import DataTable from '../components/table/dataTable'

// toast 
import { showSuccess, showError } from '../utils/toast'
import { useAdminSettings, useDeleteAdminSetting, useCreateAdminSetting } from '../hooks/apiHooks';

const AdminSettings = () => {

  // form   related
  const initialValues = {
    gstPercentage: "",
    travelFee: "",
    commissionPercentage: "",
    cancellationFeePercentage: "",
    refundProcessingDays: "",
    cashDeductionPercentage: "",
    supportContactEmail: "",
    supportContactPhone: "",
  };

  const validationSchema = yup.object({
    gstPercentage: yup
      .number()
      .typeError("GST Percentage must be a number")
      .required("GST Percentage is required")
      .min(0, "GST Percentage cannot be negative")
      .max(100, "GST Percentage cannot exceed 100"),

    travelFee: yup
      .number()
      .typeError("Travel Fee must be a number")
      .required("Travel Fee is required")
      .min(0, "Travel Fee cannot be negative"),

    commissionPercentage: yup
      .number()
      .typeError("Commission Percentage must be a number")
      .required("Commission Percentage is required")
      .min(0, "Commission Percentage cannot be negative")
      .max(100, "Commission Percentage cannot exceed 100"),

    cancellationFeePercentage: yup
      .number()
      .typeError("Cancellation Fee Percentage must be a number")
      .required("Cancellation Fee Percentage is required")
      .min(0, "Cancellation Fee Percentage cannot be negative")
      .max(100, "Cancellation Fee Percentage cannot exceed 100"),

    refundProcessingDays: yup
      .number()
      .typeError("Refund Processing Days must be a number")
      .required("Refund Processing Days is required")
      .min(0, "Refund Processing Days cannot be negative")
      .integer("Refund Processing Days must be a whole number"),

    cashDeductionPercentage: yup
      .number()
      .typeError("Cash Deduction Percentage must be a number")
      .required("Cash Deduction Percentage is required")
      .min(0, "Cash Deduction Percentage cannot be negative")
      .max(100, "Cash Deduction Percentage cannot exceed 100"),

    supportContactEmail: yup
      .string()
      .required("Support Email is required")
      .email("Enter a valid email address"),

    supportContactPhone: yup
      .string()
      .required("Support Phone is required")
      .matches(
        /^[6-9]\d{9}$/,
        "Enter a valid 10-digit phone number"
      ),
  });

  const { register, control, handleSubmit, reset, setValue, clearErrors,
    formState: { errors, isSubmitting }, } = useForm({
      defaultValues: initialValues,
      resolver: yupResolver(validationSchema),
    });

  const preventNegativeKey = (e) => {
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const [pageInput, setPageInput] = useState("");

  const { page, setPage, prevPage, nextPage, firstPage, lastPage } = usePagination()

  // data 
  const { data: adminSettings, isLoading, error } = useAdminSettings();
  const queryClient = useQueryClient();
  const { mutate } = useDeleteAdminSetting()
  const { mutate: adminMutate } = useCreateAdminSetting();


  const adminSettingsMapped = Array.isArray(adminSettings?.data)
    ? adminSettings.data
    : adminSettings?.data
      ? [adminSettings.data]
      : [];

  const adminMapped = adminSettingsMapped.map((item) => ({
    _id: item?._id,
    gstPercentage: item?.gstPercentage ?? 0,
    travelFee: item?.travelFee ?? 0,
    commissionPercentage: item?.commissionPercentage ?? 0,
    cancellationFeePercentage: item?.cancellationFeePercentage ?? 0,
    refundProcessingDays: item?.refundProcessingDays ?? 0,
    cashDeductionPercentage: item?.cashDeductionPercentage ?? 0,
    supportContactEmail: item?.supportContactEmail || "N/A",
    supportContactPhone: item?.supportContactPhone || "N/A",
  }));

  const onSubmit = (values) => {
    const payload = {
      gstPercentage: Number(values.gstPercentage),
      travelFee: Number(values.travelFee),
      commissionPercentage: Number(values.commissionPercentage),
      cancellationFeePercentage: Number(values.cancellationFeePercentage),
      refundProcessingDays: Number(values.refundProcessingDays),
      cashDeductionPercentage: Number(values.cashDeductionPercentage),
      supportContactEmail: values.supportContactEmail,
      supportContactPhone: values.supportContactPhone,
    };

    adminMutate(payload, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ["admin-settings"],
        });
        const newId = response?.data?._id;

        if (newId) {
          localStorage.setItem("adminSettingId", newId);
        }

        showSuccess("Admin settings created successfully!");

        // React Hook Form
        reset(initialValues);
      },

      onError: (error) => {
        console.error("Failed to save admin settings", error);
        const msg =
          error?.response?.data?.message || "Failed to save settings";
        showError(msg);
      },
    });
  };

  const handleDelete = (item) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this admin setting?"
    );

    if (!confirmed) return;

    mutate(item._id, {

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["admin-settings"],
        });

        showSuccess('Deleted successfully!')

        const storedId = localStorage.getItem("adminSettingId");

        if (storedId === item._id) {
          localStorage.removeItem("adminSettingId");
        }
      },

      onError: (err) => {
        console.error("Delete failed:", err);
        showError("Failed to delete");
      },
    });
  };

  const columns = useMemo(
    () => [
      { Header: "GST %", accessor: "gstPercentage" },
      { Header: "Travel Fee", accessor: "travelFee" },
      { Header: "Commission %", accessor: "commissionPercentage" },
      { Header: "Cancellation Fee %", accessor: "cancellationFeePercentage" },
      { Header: "Refund Days", accessor: "refundProcessingDays" },
      { Header: "Cash Deduction %", accessor: "cashDeductionPercentage" },
      { Header: "Support Email", accessor: "supportContactEmail" },
      { Header: "Support Phone", accessor: "supportContactPhone" },
      {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
        Cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="d-flex gap-3">
              <MdDelete
                title="Delete"
                onClick={() => handleDelete(item)}
                style={{ cursor: "pointer", color: "red", fontSize: "1.1rem" }}
              />
            </div>
          );
        },
      },
    ],
    [handleDelete],
  );


  if (isLoading) return <LoadingPage />;

  return (
    <div className='flex flex-col gap-3'>

      {/* navigate back */}
      <div className='flex mb-5 gap-5 items-center p-2 bg-gray-100 font-semibold'>

        <span className='text-xl'
          onClick={() => navigate(-1)}>
          <MdKeyboardBackspace />
        </span>

        <span>Admin Settings</span>
      </div>

      <div className='bg-white p-5'>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* GST Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST Percentage
              </label>

              <Controller
                name="gstPercentage"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min={0}
                    step="1"
                    inputMode="numeric"
                    placeholder="e.g., 20"
                    onFocus={() => clearErrors("gstPercentage")}
                    onKeyDown={preventNegativeKey}
                    onBlur={(e) => {
                      const v = Number(e.target.value);
                      setValue(
                        "gstPercentage",
                        Number.isFinite(v) && v >= 0 ? v : 0
                      );
                    }}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
                  />
                )}
              />

              {errors.gstPercentage && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.gstPercentage.message}
                </p>
              )}
            </div>

            {/* Travel Fee */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Travel Fee
              </label>

              <Controller
                name="travelFee"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min={0}
                    step="0.01"
                    inputMode="decimal"
                    placeholder="e.g., 10"
                    onFocus={() => clearErrors("travelFee")}
                    onKeyDown={preventNegativeKey}
                    onBlur={(e) => {
                      const v = Number(e.target.value);
                      setValue(
                        "travelFee",
                        Number.isFinite(v) && v >= 0 ? v : 0
                      );
                    }}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
                  />
                )}
              />

              {errors.travelFee && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.travelFee.message}
                </p>
              )}
            </div>

            {/* Commission Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commission Percentage
              </label>

              <Controller
                name="commissionPercentage"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min={0}
                    step="1"
                    inputMode="numeric"
                    placeholder="e.g., 5"
                    onFocus={() => clearErrors("commissionPercentage")}
                    onKeyDown={preventNegativeKey}
                    onBlur={(e) => {
                      const v = Number(e.target.value);
                      setValue(
                        "commissionPercentage",
                        Number.isFinite(v) && v >= 0 ? v : 0
                      );
                    }}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
                  />
                )}
              />

              {errors.commissionPercentage && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.commissionPercentage.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Cancellation Fee Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cancellation Fee Percentage
              </label>

              <Controller
                name="cancellationFeePercentage"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min={0}
                    step="1"
                    inputMode="numeric"
                    placeholder="e.g., 5"
                    onFocus={() => clearErrors("cancellationFeePercentage")}
                    onKeyDown={preventNegativeKey}
                    onBlur={(e) => {
                      const v = Number(e.target.value);
                      setValue(
                        "cancellationFeePercentage",
                        Number.isFinite(v) && v >= 0 ? v : 0
                      );
                    }}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
                  />
                )}
              />

              {errors.cancellationFeePercentage && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.cancellationFeePercentage.message}
                </p>
              )}
            </div>

            {/* Refund Processing Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Refund Processing Days
              </label>

              <Controller
                name="refundProcessingDays"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min={0}
                    step="1"
                    inputMode="numeric"
                    placeholder="e.g., 3"
                    onFocus={() => clearErrors("refundProcessingDays")}
                    onKeyDown={preventNegativeKey}
                    onBlur={(e) => {
                      const v = Number(e.target.value);
                      setValue(
                        "refundProcessingDays",
                        Number.isFinite(v) && v >= 0 ? v : 0
                      );
                    }}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
                  />
                )}
              />

              {errors.refundProcessingDays && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.refundProcessingDays.message}
                </p>
              )}
            </div>

            {/* Support Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Support Email
              </label>

              <input
                type="email"
                placeholder="support@cookedin.com"
                {...register("supportContactEmail")}
                onFocus={() => clearErrors("supportContactEmail")}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
              />

              {errors.supportContactEmail && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.supportContactEmail.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Cash Deduction Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cash Deduction Percentage
              </label>

              <Controller
                name="cashDeductionPercentage"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min={0}
                    max={100}
                    step="1"
                    inputMode="numeric"
                    placeholder="e.g., 5"
                    onFocus={() => clearErrors("cashDeductionPercentage")}
                    onKeyDown={preventNegativeKey}
                    onBlur={(e) => {
                      const v = Number(e.target.value);
                      setValue(
                        "cashDeductionPercentage",
                        Number.isFinite(v) && v >= 0 ? v : 0
                      );
                    }}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
                  />
                )}
              />

              {errors.cashDeductionPercentage && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.cashDeductionPercentage.message}
                </p>
              )}
            </div>

            {/* Support Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Support Phone
              </label>

              <input
                type="text"
                placeholder="+919898989898"
                {...register("supportContactPhone")}
                onFocus={() => clearErrors("supportContactPhone")}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
              />

              {errors.supportContactPhone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.supportContactPhone.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-green-600 px-5 py-2 text-white font-medium transition hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Create Admin Settings"}
          </button>
        </form>

      </div>

      <div className='bg-white p-5'>
        <DataTable
          columns={columns}
          data={adminMapped || []}
          page={page}
          // totalPages={totalPages}
          firstPage={firstPage}
          prevPage={prevPage}
          nextPage={nextPage}
          lastPage={lastPage}
          pageInput={pageInput}
          setPageInput={setPageInput}
          goToPage={(pageNumber) => {
            if (pageNumber >= 1 && pageNumber <= totalPages) {
              setPage(pageNumber);
            }
          }}
        />
      </div>

    </div>
  )
}

export default AdminSettings