import React, { useState, useMemo } from 'react'
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

import { useChefDetails, useUpdateChefStatus } from '../../hooks/apiHooks'

const ChefManage = () => {

  const navigate = useNavigate()

  const [pageInput, setPageInput] = useState("");
  const { page, setPage, prevPage, nextPage, firstPage, lastPage } = usePagination();
  
  const { data: chef, isLoading, isError } = useChefDetails(page)
  console.log(chef);
  const totalPages = chef?.totalPages || 1;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useUpdateChefStatus()

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
            queryKey: ["chefManage"],
          });
          if (newStatus === "true") {
            showSuccess("Chef activated successfully");
          } else {
            showError("Chef inactivated successfully");
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
        Header: "Profile",
        accessor: "profileImage",
        Cell: ({ value }) =>
          value ? (
            <img
              src={value}
              alt="profile"
              className="w-15 h-11 rounded object-cover"
            />
          ) : (
            "N/A"
          ),
      },
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
        Header: "City",
        accessor: "location.city",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Area",
        accessor: "location.area",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Experience",
        accessor: "chefRegistration.yearOfExperience",
        Cell: ({ value }) => (value !== undefined ? `${value} Years` : "N/A"),
      },
      {
        Header: "Favorites",
        accessor: "favorites",
        Cell: ({ value }) => (value?.length ? value.length : "N/A"),
      },
      {
        Header: "Verification",
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

  if (isLoading) return <LoadingPage />


  return (
    <div className='flex flex-col gap-3'>

      {/* navigat back */}
      <div className='flex mb-5 gap-5 items-center p-2 bg-gray-100 font-semibold'>

        <span className='text-xl'
          onClick={() => navigate(-1)}>
          <MdKeyboardBackspace />
        </span>

        <span>Chef Management</span>
      </div>

      <div>

        <DataTable
          columns={columns}
          data={chef?.results || []}
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
    </div>
  )

}

export default ChefManage