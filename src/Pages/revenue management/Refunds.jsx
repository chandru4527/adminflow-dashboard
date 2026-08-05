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
import { useRefunds } from '../../hooks/apiHooks';
import usePagination from '../../hooks/pagination';


const Refunds = () => {

  const [pageInput, setPageInput] = useState("");
  
    const { page, setPage, prevPage, nextPage, firstPage, lastPage } = usePagination()
    const { data, isLoading, error } = useRefunds()
  
  console.log(data);




  return (
    <div>Refunds</div>
  )
}

export default Refunds