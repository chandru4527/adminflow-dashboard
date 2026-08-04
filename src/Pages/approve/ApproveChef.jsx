import React, { useState, useMemo } from 'react'
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
import { useChefApprove } from '../../hooks/apiHooks'
import LoadingPage from '../../components/LoadingPage'


const ApproveChef = () => {

   const [rowLoading, setRowLoading] = useState(null);
  const [rowRejectLoading, setRowRejectLoading] = useState(null);

  const [pageInput, setPageInput] = useState("");
  const { page, setPage, prevPage, nextPage, firstPage, lastPage } = usePagination()
  const { data: approve, isLoading, isError } = useChefApprove(page);
  console.log(approve);
const totalPages = approve?.totalPages || 1;

  const columns = useMemo(
    () => [
      {
        Header: "Profile",
        accessor: "profileImage",
        Cell: ({ value }) => (
          <img
            src={value || sampleImage}
            alt="profile"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "20%",
              objectFit: "cover",
            }}
          />
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
        Header: "Year of Experience",
        accessor: "chefRegistration.yearOfExperience",
        Cell: ({ value }) =>
          value !== undefined && value !== null ? value : "N/A",
      },
      {
        Header: "Verification Status",
        accessor: "verificationStatus",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div
            className="d-flex justify-content-center"
            style={{ cursor: "pointer" }}
            onClick={() => handleViewDetails(row.original)}
            title="View Details"
          >
            <FaEye size={18} />
          </div>
        ),
      },
      {
        Header: "Approve",
        Cell: ({ row }) => {
          const isLoadingRow = rowLoading === row.original.id;
          const isRejectLoadingRow = rowRejectLoading === row.original.id;
          return (
            <div className="d-flex justify-content-center gap-2">
              <Button
                type="button"
                disabled={isLoadingRow}
                onClick={() => handleStatusChange(row.original.id, "Approved")}
                style={{
                  backgroundColor: "#14AE5C",
                  border: "none",
                }}
              >
                {isLoadingRow ? <Spinner size="sm" /> : "Approve"}
              </Button>
              <Button
                type="button"
                disabled={isRejectLoadingRow}
                onClick={() => handleReject(row.original.id)}
                style={{
                  backgroundColor: "#dc3545",
                  border: "none",
                }}
              >
                {isRejectLoadingRow ? <Spinner size="sm" /> : "Reject"}
              </Button>
            </div>
          );
        },
      },
    ],
    [rowLoading, rowRejectLoading],
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
  
          <span>Pending Chef</span>
        </div>

        <div>

        <DataTable
          columns={columns}
          data={approve?.results || []}
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

export default ApproveChef