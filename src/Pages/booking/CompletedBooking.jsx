import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  MdKeyboardBackspace, MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdEdit
} from 'react-icons/md'

// data fetch
import { useBookings } from '../../hooks/apiHooks'
import usePagination from '../../hooks/pagination';

// pages
import LoadingPage from '../../components/LoadingPage';
import DataTable from '../../components/table/dataTable';
import BookingModel from '../../components/modals/BookingModel';

const UpcomingBooking = () => {

  const { data, isLoading, error } = useBookings();
  const C_Bookings = data?.data.filter((item) => item.status === 'completed')
  console.log(C_Bookings);
  // console.log(data);


  const [pageInput, setPageInput] = useState("");
  const { page, setPage, prevPage, nextPage, firstPage, lastPage } = usePagination()

    const navigate = useNavigate()


  // model
  const [ModalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState();

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Booking ID",
        accessor: "cookdinId",
      },
      {
        Header: "Booking OTP",
        accessor: "bookingOTP",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "City",
        accessor: "location.city",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Customer",
        accessor: "customer",
        Cell: ({ row }) =>
          row.original.customer?.name
            ? `${row.original.customer.name} (${row.original.customer.phone})`
            : `(${row.original.customer?.phone || "N/A"})`,
      },
      {
        Header: "Booking Slot",
        accessor: "timeSlot",
      },
      {
        Header: "Total Amount",
        accessor: "total",
        Cell: ({ row }) => {
          const booking = row.original;
          return `₹${(booking.service?.basePrice || 0) + (booking.gstAmount || 0)}`;
        },
      },
      {
        Header: "Booking Status",
        accessor: "status",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <button
            className='bg-green-600 text-white font-semibold px-2 py-1 rounded'
            onClick={() => handleViewDetails(row.original)}
          >
            View Details
          </button>
        ),
      },
    ],
    [],
  );

  // useEffect(() => {
  //   document.body.style.overflow = ModalOpen ? 'hidden' : 'auto'
  //   return () => document.body.style.overflow = 'auto'
  // }, [ModalOpen])

  if (isLoading) return <LoadingPage />
  return (
    <div className='flex flex-col gap-3'>

      {/* navigat back */}
      <div className='flex mb-5 gap-5 items-center p-2 bg-gray-100 font-semibold'>

        <span className='text-xl'
          onClick={() => navigate(-1)}>
          <MdKeyboardBackspace />
        </span>

        <span>Completed Bookings</span>
      </div>

      {/* table */}
      <div>
        <DataTable
          columns={columns}
          data={C_Bookings || []}
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

      <BookingModel
        isOpen={ModalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedBooking}
      />
    </div>
  )
}

export default UpcomingBooking