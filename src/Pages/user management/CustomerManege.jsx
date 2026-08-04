import React, { useState,useMemo } from 'react'
import { useUserDetails } from '../../hooks/apiHooks'
import usePagination from '../../hooks/pagination'
import { useNavigate } from 'react-router-dom'
import {
  MdKeyboardBackspace, MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'

import DataTable from '../../components/table/dataTable'
import IOSSwitch from '../../components/buttons/isonBtn'

const CustomerManege = () => {
  const [pageInput, setPageInput] = useState("");
  const handleStatusToggle = (id, isActive) => {
    console.log(id, !isActive);
    // API call here
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
      Cell: ({ value }) => value || "N/A",
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
          <IOSSwitch
            checked={isActive}
            onChange={() => handleStatusToggle(id, isActive)}
          />
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