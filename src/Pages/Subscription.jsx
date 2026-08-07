import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import Select from 'react-select'

// form 
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  MdKeyboardBackspace, MdKeyboardDoubleArrowLeft, MdKeyboardArrowLeft, MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight, MdEdit, MdDelete, MdKeyboardArrowDown, MdClose
} from 'react-icons/md'

import usePagination from '../hooks/pagination'

import LoadingPage from '../components/LoadingPage'
import DataTable from '../components/table/dataTable'
import IOSSwitch from '../components/buttons/isonBtn';

// toast 
import { showSuccess, showError } from '../utils/toast'
import { useSubscriptionList, useUpdateSubcriptionStatus, usePostSubcription, useChefDetails, useChefAssign } from '../hooks/apiHooks';


const Subscription = () => {

  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChefs, setSelectedChefs] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [pageInput, setPageInput] = useState("");
  const { page, setPage, prevPage, nextPage, firstPage, lastPage } = usePagination();

  const { data: chef, isError } = useChefDetails(page);
  // console.log(chef);

  const chefList = chef?.results || []
  // console.log(chefList);

  const { mutate: PostSubscription, isPending } = usePostSubcription();
  const { mutate } = useUpdateSubcriptionStatus();
  const { mutate: assignChef } = useChefAssign()

  const { data, isLoading } = useSubscriptionList();
  const rawList = data?.data || [];

  const mappedData = rawList.map((item) => ({
    id: item?._id || item?.id,
    name: item?.name || "N/A",
    label: item?.label || "N/A",
    planType: item?.planType || "N/A",
    frequency: item?.frequency || "N/A",
    price: item?.price || "N/A",
    oldPrice: item?.oldPrice || "N/A",
    description: item?.description || "N/A",
    isActive: item?.isActive ?? true,
    chef: item?.chef || [],
  }))
  // console.log(mappedData);

  // form 
  const initialValues = {
    chef: [],
    name: "",
    label: "",
    planType: "",
    frequency: 1,
    price: 0,
    oldPrice: 0,
    description: "",
    isActive: true,
  };

  const validationSchema = Yup.object({
    chef: Yup.array()
      .min(1, "Please select at least one chef")
      .required("Please select a chef"),
    name: Yup.string().required("Plan Name is required"),
    label: Yup.string().required("Label is required"),
    planType: Yup.string().required("Plan Type is required"),
    frequency: Yup.number().required(),
    price: Yup.number().required(),
    oldPrice: Yup.number().required(),
    description: Yup.string().required(),
    isActive: Yup.boolean().required(),
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

  const onSubmit = (values) => {

    // console.log(values);
    const payload = {
      chef: values.chef,
      name: values.name,
      label: values.label,
      planType: values.planType,
      frequency: Number(values.frequency),
      price: Number(values.price),
      oldPrice: Number(values.oldPrice),
      description: values.description,
      isActive: values.isActive === true || values.isActive === "true",
    };

    PostSubscription(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["subcription-list"],
        });
        showSuccess("Subscription created successfully");
        reset(initialValues);
      },
      onError: (error) => {
        console.error(error);
        showError("Failed to create subscription");
      },
    });


  };

  const handleStatusToggle = (id, active) => {
    mutate(
      {
        id,
        status: !active,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["subcription-list"],
          });

          if (!active) {
            showSuccess("Subscription activated successfully");
          } else {
            showSuccess("Subscription deactivated successfully");
          }
        },
        onError: (error) => {
          console.error("Failed to update status", error);
          showError("Failed to update status");
        },
      }
    );
  };

  const handleAssignChef = () => {
    if (!selectedBooking?._id && !selectedBooking?.id) {
      showError("No subscription selected");
      return;
    }

    const subscriptionId = selectedBooking._id || selectedBooking.id;

    const payload = {
      chefId: selectedChefs.filter(Boolean),
    };

    assignChef(
      {
        id: subscriptionId,
        payload,
      },
      {
        onSuccess: () => {
          showSuccess("Chef assigned successfully");

          queryClient.invalidateQueries({
            queryKey: ["subcription-list"],
          });

          setModalOpen(false);
          setSelectedChefs([]);
        },

        onError: (error) => {
          console.error("Assign Chef Error:", error);
          showError("Failed to assign chef");
        },
      }
    );
  };

  // column
  const columns = useMemo(
    () => [
      {
        Header: "Plan Name",
        accessor: "name",
      },
      {
        Header: "Label",
        accessor: "label",
      },
      {
        Header: "Plan Type",
        accessor: "planType",
      },
      {
        Header: "Frequency",
        accessor: "frequency",
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => `₹${value}`,
      },
      {
        Header: "Old Price",
        accessor: "oldPrice",
        Cell: ({ value }) => `₹${value}`,
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ value }) => (
          <div className="max-w-40 truncate" title={value}>
            {value}
          </div>
        ),
      },
      {
        Header: "Status",
        accessor: "isActive",
        Cell: ({ row }) => {
          const { id, isActive } = row.original;

          return (
            <div className='flex gap-2'>
              <IOSSwitch
                checked={isActive}
                onChange={() => handleStatusToggle(id, isActive)}
              />
              <span>{isActive ? 'Active' : 'Inactive'}</span>
            </div>
          );
        },
      },
      {
        Header: "Action",
        accessor: "assign_chef",
        Cell: ({ row }) => {
          const booking = row.original;

          return (
            <button
              disabled={!booking.isActive}
              className={`px-3 py-2 rounded text-sm font-medium text-white whitespace-nowrap transition
                ${booking.isActive
                  ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                  : "bg-red-500 cursor-not-allowed opacity-80"
                }
              `}
              onClick={() => {
                if (!booking.isActive) return;

                setSelectedBooking(booking);

                setSelectedChefs(
                  Array.isArray(booking.chef)
                    ? booking.chef
                      .filter(Boolean)
                      .map((c) =>
                        typeof c === "object"
                          ? c.id || c._id
                          : c
                      )
                    : []
                );

                setModalOpen(true);
              }}
            >
              {booking.isActive ? "Assign Chef" : "Disabled"}
            </button>
          );
        },
      }
    ],
    []
  )

  if (isLoading) return <LoadingPage />
  return (

    <div className='flex flex-col gap-3'>

      {/* navigate back */}
      <div className='flex mb-5 gap-5 items-center p-2 bg-gray-100 font-semibold'>

        <span className='text-xl'
          onClick={() => navigate(-1)}>
          <MdKeyboardBackspace />
        </span>

        <span>Create Subscription Plan</span>
      </div>

      {/* form */}
      <div className="bg-white rounded shadow p-6">

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Select Chef */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Chef
              </label>

              <Controller
                name="chef"
                control={control}
                render={({ field }) => (
                  <Select
                    isMulti
                    placeholder="Select Chef"
                    options={chefList.map((c) => ({
                      value: c._id || c.id,
                      label: c.name,
                    }))}
                    value={chefList
                      .filter((c) =>
                        field.value?.includes(c._id || c.id)
                      )
                      .map((c) => ({
                        value: c._id || c.id,
                        label: c.name,
                      }))}
                    onChange={(selectedOptions) =>
                      field.onChange(
                        selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : []
                      )
                    }
                    className="w-full"
                    classNamePrefix="react-select"
                  />
                )}
              />

              {errors.chef && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.chef.message}
                </p>
              )}
            </div>

            {/* Plan Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan Name
              </label>
              <input
                {...register("name")}
                placeholder="Enter the Name"
                onFocus={() => clearErrors("name")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Label */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <input
                {...register("label")}
                placeholder="Enter the Label"
                onFocus={() => clearErrors("label")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.label && (
                <p className="mt-1 text-sm text-red-500">{errors.label.message}</p>
              )}
            </div>

            {/* Plan Type */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan Type
              </label>

              <Controller
                name="planType"
                control={control}
                render={({ field }) => (
                  <Select
                    placeholder="Select Plan Type"
                    options={[
                      { value: "weekly", label: "Weekly" },
                      { value: "monthly", label: "Monthly" },
                    ]}
                    value={[
                      { value: "weekly", label: "Weekly" },
                      { value: "monthly", label: "Monthly" },
                    ].find((option) => option.value === field.value) || null}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption ? selectedOption.value : "")
                    }
                    className="w-full"
                    classNamePrefix="react-select"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        minHeight: "42px",
                        borderRadius: "0.5rem",
                        borderColor: state.isFocused ? "#10B981" : "#D1D5DB",
                        boxShadow: state.isFocused ? "0 0 0 1px #10B981" : "none",
                        "&:hover": {
                          borderColor: "#10B981",
                        },
                      }),
                      valueContainer: (base) => ({
                        ...base,
                        padding: "2px 10px",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: "#9CA3AF",
                      }),
                    }}
                  />
                )}
              />

              {errors.planType && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.planType.message}
                </p>
              )}
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <input
                type="number"
                min="1"
                {...register("frequency")}
                onFocus={() => clearErrors("frequency")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.frequency && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.frequency.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                min="0"
                {...register("price")}
                onFocus={() => clearErrors("price")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            {/* Old Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Old Price
              </label>
              <input
                type="number"
                min="0"
                {...register("oldPrice")}
                onFocus={() => clearErrors("oldPrice")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.oldPrice && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.oldPrice.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={3}
                placeholder="Enter message"
                onFocus={() => clearErrors("description")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>

              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Select
                    placeholder="Select Status"
                    options={[
                      { value: true, label: "Active" },
                      { value: false, label: "Inactive" },
                    ]}
                    value={[
                      { value: true, label: "Active" },
                      { value: false, label: "Inactive" },
                    ].find((option) => option.value === field.value) || null}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption ? selectedOption.value : null)
                    }
                    className="w-full"
                    classNamePrefix="react-select"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        minHeight: "42px",
                        borderRadius: "0.5rem",
                        borderColor: state.isFocused ? "#10B981" : "#D1D5DB",
                        boxShadow: state.isFocused ? "0 0 0 1px #10B981" : "none",
                        "&:hover": {
                          borderColor: "#10B981",
                        },
                      }),
                      valueContainer: (base) => ({
                        ...base,
                        padding: "2px 10px",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: "#9CA3AF",
                      }),
                    }}
                  />
                )}
              />

              {errors.isActive && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.isActive.message}
                </p>
              )}
            </div>

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 rounded bg-green-600 px-6 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating..." : "Create Subscription"}
          </button>
        </form>
      </div>

      {/* table */}
      <div>
        <DataTable
          columns={columns}
          data={mappedData || []}
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
          }} />
      </div>


      {/* model */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded bg-white shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4">
              <h5 className="text-lg font-semibold text-gray-800">
                Assign Chefs
              </h5>

              <button
                onClick={() => setModalOpen(false)}
                className="text-xl text-gray-500 hover:text-gray-800 font-bold"
              >
                <MdClose />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Select Chef
              </label>

              <Select
                options={chefList.map((c) => ({
                  value: c.id || c._id,
                  label: c.name,
                }))}
                value={chefList
                  .filter((c) =>
                    selectedChefs?.includes(c.id || c._id)
                  )
                  .map((c) => ({
                    value: c.id || c._id,
                    label: c.name,
                  }))}
                onChange={(options) =>
                  setSelectedChefs(
                    options ? options.map((o) => o.value) : []
                  )
                }
                placeholder="Select Chef"
                isMulti
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    minHeight: "42px",
                    borderRadius: "4px",
                    borderColor: state.isFocused ? "#10B981" : "#D1D5DB",
                    boxShadow: state.isFocused
                      ? "0 0 0 1px #10B981"
                      : "none",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                  }),
                }}
              />


              {/* Buttons */}
              <div className="mt-5 flex justify-end gap-3">

                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded bg-gray-200 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAssignChef}
                  className="rounded bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Assign
                </button>

              </div>

              {/* Assigned Chefs */}
              <h6 className="mb-3 text-sm font-bold text-gray-700">
                Assigned Chefs
              </h6>

              <ol className="list-decimal space-y-1 pl-5 text-sm text-gray-600">
                {(selectedBooking?.chef || [])
                  .filter(Boolean)
                  .map((chef) => {
                    const chefId =
                      typeof chef === "object"
                        ? chef.id || chef._id
                        : chef;

                    const chefObj = chefList.find(
                      (c) => (c.id || c._id) === chefId
                    );

                    return (
                      <li key={chefId}>
                        {chefObj?.name || "N/A"}
                      </li>
                    );
                  })}
              </ol>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Subscription