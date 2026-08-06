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
import { useRefunds } from '../../hooks/apiHooks';
import usePagination from '../../hooks/pagination';


const Refunds = () => {

  const [pageInput, setPageInput] = useState("");

  const { page, setPage, prevPage, nextPage, firstPage, lastPage } = usePagination()

  const { data: refund, isLoading, error } = useRefunds()

  const refundList = useMemo(() => {
    const cancelled =
      refund?.data?.filter(
        (item) => item.status?.toLowerCase() === "cancelled"
      ) || [];

    return cancelled.map((item) => ({
      id: item?._id,
      paymentId: item?.payments?.paymentInfo?.paymentId || "",
      paymentMethod: item?.paymentMethod || "N/A",
      receipt: item?.payments?.paymentInfo?.receipt || "",
      BookingId: item?.cookdinId || "N/A",
      name: item?.customer?.name || "N/A",
      bookingDate: item?.bookingDate
        ? new Date(item.bookingDate).toISOString().split("T")[0]
        : "N/A",
      phone: item?.customer?.phone || "N/A",
      timeSlot: item?.timeSlot || "N/A",
      amount: item?.service?.paymentDetails?.amount || 0,
      status: item?.status || "N/A",
      reason: item?.cancellation?.reason || "N/A",
      refundInitiate: item?.refundPayments?.isRefunded || false,
    }));
  }, [refund]);

  const navigate = useNavigate()

  // console.log(refundList);

  const handleRefundToggle = useCallback(async (refund) => {
    // refund API logic here
  }, []);

  const columns = useMemo(
    () => [
      { Header: "Booking ID", accessor: "BookingId" },
      { Header: "Customer Name", accessor: "name" },
      { Header: "Booking Date", accessor: "bookingDate" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Time Slot", accessor: "timeSlot" },
      { Header: "Total Amount (₹)", accessor: "amount" },
      { Header: "Payment Method", accessor: "paymentMethod" },
      { Header: "Status", accessor: "status" },
      {
        Header: "Cancellation Reason",
        accessor: "reason",
        Cell: ({ value }) => (
          <div
            className="max-w-40 truncate"
            title={value || "N/A"}
          >
            {value || "N/A"}
          </div>
        ),
      },
      {
        Header: "Refund",
        accessor: "refundInitiate",
        disableSortBy: true,
        Cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <IOSSwitch
              checked={row.original?.refundInitiate}
              disabled={row.original?.refundInitiate}
              onChange={() => handleRefundToggle(row.original)}
            />
          </div>
        ),
      }
    ],
    [handleRefundToggle]
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
          data={refundList || []}
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

export default Refunds