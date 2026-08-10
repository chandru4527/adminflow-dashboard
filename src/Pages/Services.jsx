import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useServices, useUpdateBasePrice } from '../hooks/apiHooks'
import usePagination from '../hooks/pagination'
import {
  MdKeyboardBackspace, MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdEdit
} from 'react-icons/md'
import LoadingPage from '../components/LoadingPage'
import DataTable from '../components/table/dataTable'

// toast 
import { showSuccess, showError } from '../utils/toast'




const Services = () => {

  const [successRow, setSuccessRow] = useState(null);
  const [pageInput, setPageInput] = useState("");

  const { page, setPage, prevPage, nextPage, firstPage, lastPage } = usePagination()

  const { data: service, isLoading, } = useServices(page)

  const totalPages = service?.totalPages || 1;
  console.log(service);

  const navigate = useNavigate()

  // update
  const { mutate, isPending, error } = useUpdateBasePrice();

  const [editValues, setEditValues] = useState({});
  const handleEditChange = (id, value) => {
    setEditValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUpdate = (row, editValue) => {
    console.log(row, editValue);

    mutate(
      {
        id: row.original._id,
        basePrice: Number(editValue),
      },
      {
        onSuccess: () => {
          setSuccessRow(row.original._id);
          showSuccess("Base price updated successfully");

          setTimeout(() => {
            setSuccessRow(null);
          }, 2000);
        },
        onError: (error) => {
          showError(
            error?.response?.data?.message || "Failed to update base price"
          );
        },
      }
    );
  };
  const columns = useMemo(
    () => [
      {
        Header: "Profile",
        accessor: "profileImg",
        Cell: ({ row }) => (
          <img
            src={row.original.profileImg || 'https://tse4.mm.bing.net/th/id/OIP.dDKYQqVBsG1tIt2uJzEJHwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'}
            alt={row.original.chef?.name || "Chef"}
            className='w-20 h-20 object-contain'
          />
        ),
      },
      {
        Header: "Name",
        accessor: "chef.name",
        Cell: ({ row }) => row.original.chef?.name || "N/A",
      },
      {
        Header: "Email",
        accessor: "chef.email",
        Cell: ({ row }) => row.original.chef?.email || "N/A",
      },
      {
        Header: "Bio",
        accessor: "bio",
        Cell: ({ value }) => (
          <div
            className="max-w-50 truncate"
            title={value}
          >
            {value || "N/A"}
          </div>
        ),
      },
      {
        Header: "Payment Status",
        accessor: "paymentDetails.isPaid",
        Cell: ({ row }) => (
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${row.original.paymentDetails?.isPaid
              ? " text-green-700"
              : " text-red-700"
              }`}
          >
            {row.original.paymentDetails?.isPaid ? "Paid" : "Unpaid"}
          </span>
        ),
      },
      {
        Header: "Base Price",
        accessor: "basePrice",
        Cell: ({ row }) => {
          const id = row.original._id;
          const value = editValues[id] ?? row.original.basePrice;

          return (
            <div className="grid grid-cols-1 gap-2">
              <input
                type="number"
                className="w-20 px-1 border border-gray-400 focus:outline-none"
                min={0}
                value={value}
                onChange={(e) => handleEditChange(id, e.target.value)}
              />

              <button
                onClick={() => handleUpdate(row, value)}
                disabled={isPending}
                className="bg-green-600 text-white text-xs py-2 rounded flex justify-center items-center"
              >
                <MdEdit />
                Update
              </button>
              {successRow === id && (
                <span className="text-green-600 text-xs font-medium">
                  Price updated!
                </span>
              )}
            </div>
          );
        },
      }
    ],
    [editValues, handleUpdate]);

  if (isLoading) return <LoadingPage />

  return (
    <div className='flex flex-col gap-3'>

      {/* navigat back */}
      <div className='flex mb-5 gap-5 items-center p-2 bg-gray-100 font-semibold'>

        <span className='text-xl'
          onClick={() => navigate(-1)}>
          <MdKeyboardBackspace />
        </span>

        <span>Chef Services</span>
      </div>


      <div>

        <DataTable
          columns={columns}
          data={[...(service?.results || [])].sort((a, b) =>
            a.chef.name.localeCompare(b.chef.name)
          )}
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

export default Services