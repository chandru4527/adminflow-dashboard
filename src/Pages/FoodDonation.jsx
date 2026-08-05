import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  MdKeyboardBackspace, MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdEdit
} from 'react-icons/md'

// custom hooks
import { useFoodDonation } from '../hooks/apiHooks'
import usePagination from '../hooks/pagination'

// pages or components
import LoadingPage from '../components/LoadingPage'
import DataTable from '../components/table/dataTable'
import FoodDonationModal from '../components/modals/FoodDonationModal'

// toast 
import { showSuccess, showError } from '../utils/toast'

const FoodDonation = () => {

  const { data, isLoading } = useFoodDonation()
  console.log(data?.data);
  const [pageInput, setPageInput] = useState("");
  const { page, setPage, prevPage, nextPage, firstPage, lastPage } = usePagination()

  const navigate = useNavigate()

  // model
  const [ModalOpen, setModalOpen] = useState(false);
  const [selectedFoodItems, setSelectedFoodItems] = useState([]);

  const handleOpenFoodDetails = (foodItems) => {
    console.log(foodItems);
    setSelectedFoodItems(foodItems)
    setModalOpen(true);
  }

  const columns = useMemo(
    () => [
      {
        Header: "Donor Name",
        accessor: "donorName",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Phone",
        accessor: "phone",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Pickup Location",
        accessor: "pickupLocation",
        Cell: ({ value }) => {
          if (!value) return "N/A";

          if (typeof value === "object") {
            const { address, city } = value;
            return [address, city].filter(Boolean).join(", ") || "N/A";
          }

          return value;
        },
      },
      {
        Header: "Customer",
        accessor: "customer.name",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Email",
        accessor: "customer.email",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-2 py-1 rounded text-xs fw-semibold ${value === "expired"
              ? "text-red-600 "
              : value === "collected"
                ? "text-green-600"
                : value === "pending"
                  ? "text-blue-600"
                  : ""
              }`}
          >
            {value || "N/A"}
          </span>
        ),
      },
      {
        Header: "Food Details",
        accessor: "foodItems",
        Cell: ({ value }) => (
          <button
            className='bg-green-600 px-2 py-1 text-white text-[10px] cursor-pointer rounded'
            onClick={() => handleOpenFoodDetails(value)}
          >
            View Food Items
          </button>
        ),
      },
      {
        Header: "Collected By",
        accessor: "collectedBy",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) =>
          value ? new Date(value).toLocaleString("en-IN") : "N/A",
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

        <span>Food Donation Management</span>
      </div>

      {/* table */}
      <div>
        <DataTable
          columns={columns}
          data={data?.data || []}
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

      {/* modal */}
      <FoodDonationModal
        isOpen={ModalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedFoodItems}
      />

    </div>
  )
}

export default FoodDonation