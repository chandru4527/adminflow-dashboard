import React, { useState, useMemo } from 'react'
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
import LoadingPage from '../../components/LoadingPage'
import DataTable from '../../components/table/dataTable'

// hooks
import { useWithdrawals } from '../../hooks/apiHooks';
import usePagination from '../../hooks/pagination';


const Withdrawals = () => {

  const [pageInput, setPageInput] = useState("");

  const { page, setPage, prevPage, nextPage, firstPage, lastPage } = usePagination()
  const { data, isLoading, error } = useWithdrawals()

  const mappedData = data?.data?.map((item) => ({
    id: item?._id || "N/A",
    name: item?.user?.name || "N/A",
    phone: item?.user?.phone || "N/A",
    gender: item?.user?.gender || "N/A",
    city: item?.user?.location.city || "N/A",
    address: item?.user?.address || "N/A",
    withdrawAmount: item?.withdrawAmount || "N/A",
    withdrawStatus: item?.withdrawStatus || "N/A",
    accountNumber: item?.accountNumber || "N/A",
    accountHolderName: item?.accountHolderName || "N/A",
    ifscCode: item?.ifscCode || "N/A",
    bankName: item?.bankName || "N/A",
    branchName: item?.branchName || "N/A",
  }));
  console.log(mappedData);

  const navigate = useNavigate()

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Address", accessor: "address" },
      { Header: "Account Holder Name", accessor: "accountHolderName" },
      { Header: "Account Number", accessor: "accountNumber" },
      { Header: "IFSC Code", accessor: "ifscCode" },
      { Header: "Bank Name", accessor: "bankName" },
      { Header: "Branch Name", accessor: "branchName" },
      {
        Header: "Withdraw Amount",
        accessor: "withdrawAmount",
        Cell: ({ value }) => (
          <span style={{ color: "#28a745", fontWeight: "bold" }}>
            {value !== "N/A" ? `₹ ${value}` : "N/A"}
          </span>
        ),
      },
      {
        Header: "Withdraw Status",
        accessor: "withdrawStatus",
        Cell: ({ value }) => {
          let color = "#000";
          if (value?.toLowerCase() === "pending") color = "#ff9800"; // orange
          if (value?.toLowerCase() === "paid") color = "#28a745"; // green
          if (value?.toLowerCase() === "failed") color = "#dc3545"; // red

          return (
            <span style={{ color, fontWeight: "bold" }}>{value || "N/A"}</span>
          );
        },
      },
      {
        Header: "Withdrawal Action",
        accessor: "id",
        Cell: ({ row }) => {
          const status = row.original.withdrawStatus?.toLowerCase();
          const isDisabled = status === "paid" || status === "failed";

          return (
            <div>
              <select
                value={row.original.withdrawStatus || "pending"}
                disabled={isDisabled}
                onChange={(e) =>
                  requestStatusChange(row.original.id, e.target.value)
                }
                title={
                  isDisabled
                    ? "Status cannot be changed once paid or failed"
                    : ""
                }
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          );
        },
      }
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

        <span>Withdrawals Management</span>
      </div>

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
    </div>
  )
}

export default Withdrawals