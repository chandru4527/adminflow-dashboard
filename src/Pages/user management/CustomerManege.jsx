import React, { useState, useMemo } from 'react'
import { useUpdateCustomerStatus, useUserDetails } from '../../hooks/apiHooks'
import usePagination from '../../hooks/pagination'
import { useNavigate } from 'react-router-dom'
import {
  MdKeyboardBackspace, MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'
import { useQueryClient } from '@tanstack/react-query'

import DataTable from '../../components/table/dataTable'
import IOSSwitch from '../../components/buttons/isonBtn'
import LoadingPage from '../../components/LoadingPage'

import { showSuccess, showError } from '../../utils/toast'

const CustomerManege = () => {
  
  const [pageInput, setPageInput] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isPending } = useUpdateCustomerStatus()

  const handleStatusToggle = (id, currentStatus) => {
    if (!id) return;

    const newStatus = (!currentStatus).toString();

    mutate(
      {
        id,
        activeStatus: newStatus,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["userManage"],
          });
          if (newStatus === "true") {
            showSuccess("Customer activated successfully");
          } else {
            showError("Customer inactivated successfully");
          }
        },

        onError: (error) => {
          console.error(error);
          showError("Failed to update status");
        },
      }
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Gender",
        accessor: "gender",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Phone",
        accessor: "phone",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Location",
        accessor: "location",
        Cell: ({ value }) => {
          if (!value || typeof value !== "object") return "N/A";

          const { area, city } = value;

          return area && city
            ? `${area}, ${city}`
            : city || area || "N/A";
        }
      },
      {
        Header: "Favorites",
        accessor: "favorites",
        Cell: ({ value }) => (value?.length ? value.length : "N/A"),
      },
      {
        Header: "Verification Status",
        accessor: "verificationStatus",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Active Status",
        accessor: "activeStatus",
        Cell: ({ row }) => {
          const { id, activeStatus } = row.original;
          const isActive = Boolean(activeStatus);

          return (
            <div className='flex gap-2 justify-center'>
              <IOSSwitch
                checked={isActive}
                onChange={() => handleStatusToggle(id, isActive)}
              />
              <span>{isActive ? 'Active' : 'Inactive'}</span>
            </div>
          );
        },
      },
    ],
    [handleStatusToggle]
  );

  const navigate = useNavigate()

  const { page, setPage, prevPage, nextPage, firstPage, lastPage } = usePagination()
  const { data: user, isLoading, isError } = useUserDetails(page);
  console.log(user);
  const totalPages = user?.totalPages || 1;

  if (isLoading) return <LoadingPage />

  return (
    <div className='flex flex-col gap-3'>

      {/* navigat back */}
      <div className='flex mb-5 gap-5 items-center p-2 bg-gray-100 font-semibold'>

        <span className='text-xl'
          onClick={() => navigate(-1)}>
          <MdKeyboardBackspace />
        </span>

        <span>Customer Management</span>
      </div>

      <DataTable
        columns={columns}
        data={user?.results || []}
        page={page}
        totalPages={totalPages}
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
  )
}

export default CustomerManege