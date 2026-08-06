import React, { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  MdKeyboardBackspace, MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdEdit
} from 'react-icons/md'

import { showSuccess, showError } from '../../utils/toast'

// pages or components
import IOSSwitch from '../../components/buttons/isonBtn'
import LoadingPage from '../../components/LoadingPage'
import DataTable from '../../components/table/dataTable'

// hooks
import usePagination from '../../hooks/pagination';
import { useOneTimeReg } from '../../hooks/apiHooks'

const OneTimeRegister = () => {

  const [pageInput, setPageInput] = useState("");

  const { page, setPage, prevPage, nextPage, firstPage, lastPage } = usePagination()

  const { data: oneTimeReg, isLoading, error } = useOneTimeReg()

  // console.log(data?.data);

  const navigate = useNavigate()

  const columns = useMemo(
    () => [
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Order Id",
        accessor: "order_id",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Contact",
        accessor: "contact",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Bank",
        accessor: "bank",
        Cell: ({ value }) => value || "N/A",
      },

      {
        Header: "Payment Method",
        accessor: "method",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Amount Refund Status",
        accessor: "refund_status",
        Cell: ({ value }) => value || "N/A",
      },

      {
        Header: "Description",
        accessor: "description",
        Cell: ({ value }) => value || "N/A",
      },


    ],
    []
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

        <span>Refund Management</span>
      </div>

      {/* tables */}
      <div>
        <DataTable
          columns={columns}
          data={oneTimeReg?.data || []}
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


    </div>
  )
}

export default OneTimeRegister