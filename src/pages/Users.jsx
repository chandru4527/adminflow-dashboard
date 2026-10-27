import React, { useState } from "react";
import { MdGroup } from "react-icons/md";

// components
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import Switch from '../components/forms/Switch';
import PageHeader from "../components/PageHeader";
import TableToolbar from "../components/table/TableToolbar";
import TableActionButtons from "../components/table/TableActionButtons";
import Table from "../components/table/Table";

// hooks
import { useUsers } from "../hooks/useUsers";

// utils
import { toastify } from '../utils/toastify';
// import {for} from '../utils/'

const Users = () => {


  const { data, isLoading, isFetching, refetch } = useUsers();


  const columns = [
    {
      key: 'avatar',
      header: 'Profile',
      accessor: "profilePicture",
      render: (row) => (
        <Avatar src={row?.profilePicture} alt={row?.name} size="sm" />
      )
    },
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <p className="font-semibold text-slate-800">
          {row.name}
        </p>
      ),
      minWidth: "100px",
    },
    {
      key: "email",
      header: "Email",
      accessor: "email",
      minWidth: "200px",
    },
    {
      key: "Mobile",
      header: "Mobile",
      accessor: "mobile",
      minWidth: "150px"
    },
    {
      key: "username",
      header: "Username",
      accessor: "username",
      render: (row) => (
        <p className="font-medium" > @{row?.username}</p>
      )
    },
    {
      key: "gender",
      header: "Gender",
      accessor: "gender",
      render: (row) => (
        <Badge text={row.gender} variant={row.gender === "male" ? "primary" : "pink"} />
      )
    },
    {
      key: "address",
      header: "Address",
      accessor: "adsress",
      render: (row) => (
        <div>
          <p>{row?.address?.city}, {row?.address?.country} </p>

        </div>
      )
    },
    {
      key: "staus",
      header: 'Status',
      accessor: 'isActive',
      render: (row) => (
        <Switch
          checked={row.isActive}
          label={row.isActive ? "Active" : "Inactive"}
          labelPosition="right"
          onCheckedChange={(checked) => {
            console.log("Banner status:", row.id, checked);
            toastify.success("User status changed successfully!");
          }}
          activeColor="bg-green-600"
          size="sm"
          ariaLabel={`Toggle ${row.title} status`}
        />
      )
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <TableActionButtons
          row={row}
          onView={() => console.log('view')}
          onEdit={() => console.log('view')}
          onDelete={() => console.log('view')}
        />
      ),
      nowrap: true,
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="User Management"
        titleIcon={MdGroup}
        description="View, search, and manage all registered users in your application."
        onRefresh={refetch}
        refreshLoading={isFetching}
      />

      <TableToolbar
        searchFields={[
          {
            key: "",
            type: "search",
            label: "Name",
            placeholder: "Search by name",
          },
          {
            key: "",
            type: "search",
            label: "Email",
            placeholder: "Search by name",
          }
        ]}
        // searchValues={{ q: search }}
        // onSearchChange={(_, value) => {
        //   setSearch(value);
        //   setPage(0);
        // }}
        filters={[
          {
            key: "status",
            label: "Status",
            placeholder: "All Statuses",
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
          },
        ]}
      // filterValues={{ status }}
      // onFilterChange={(_, value) => setStatus(value)}
      // onReset={handleReset}
      // isResetDisabled={!search && !status}
      />

      <Table
        columns={columns}
        data={data}
        loading={isLoading}
        rowKey="id"
        // total={data?.total ?? 0}
        // page={page + 1}
        pageSize={10}
        onPageChange={(nextPage) => setPage(nextPage - 1)}
      />
    </div>
  );
};

export default Users;