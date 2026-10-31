import React, { useState } from "react";
import { useDebounce } from "use-debounce";

// Icons
import { MdGroup, MdPerson } from "react-icons/md";

// Components
import Avatar from "../components/Avatar";
import Badge from "../components/Badge";
import Switch from "../components/forms/Switch";
import PageHeader from "../components/PageHeader";
import TableToolbar from "../components/table/TableToolbar";
import TableActionButtons from "../components/table/TableActionButtons";
import Table from "../components/table/Table";
import EmptyState from "../components/EmptyState";

// Modal screens
import UserView from "../modalScreens/users/UserView";
import UserForm from "../modalScreens/users/UserForm";
import Confirmation from "../modalScreens/Confirmation";

// Hooks
import { useUsers } from "../hooks/useUsers";

// Utils
import { toastify } from "../utils/toastify";
import { formatPhoneNumber } from '../utils/formatters';

// Store
import useModalStore from "../store/modalStore";

const Users = () => {

  const { openModal, closeModal, setActionLoading } = useModalStore();
  const { data: users = [], isLoading, isError, refetch, isFetching } = useUsers();

  const PAGE_SIZE = 10;

  const [searchValues, setSearchValues] = useState({
    name: "",
    email: "",
  });

  const [filterValues, setFilterValues] = useState({
    status: "",
    gender: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const [debouncedName] = useDebounce(searchValues.name, 500);
  const [debouncedEmail] = useDebounce(searchValues.email, 500);

  const handleSearchChange = (key, value) => {
    setSearchValues((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchValues({ name: "", email: "" });
    setFilterValues({ status: "", gender: "" });
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  // View user
  const handleView = (user) => {
    openModal({
      icon: MdPerson,
      title: "User Details",
      size: "lg",
      content: <UserView user={user} />,
    });
  };

  // Edit user
  const handleEdit = (user) => {
    const formId = "user-edit-form";

    openModal({
      icon: MdPerson,
      title: "Edit User",
      size: "lg",
      formId,
      content: <UserForm formId={formId} user={user} />,
      action: {
        label: "Update",
        variant: "themeDark",
        loadingText: "Updating...",
      },
    });
  };

  // Delete user
  const handleDelete = (user) => {
    openModal({
      icon: MdPerson,
      title: "Delete User",
      content: (
        <Confirmation
          message="Are you sure you want to delete this user?"
          data={user?.name}
        />
      ),
      action: {
        label: "Delete",
        variant: "danger",
        loadingText: "Deleting...",
        onClick: () => {
          setActionLoading(true);

          setTimeout(() => {
            closeModal();
            setActionLoading(false);
            toastify.success("User deleted successfully!");
          }, 1000);
        },
      },
    });
  };

  // Table columns
  const columns = [
    {
      key: "avatar",
      header: "Profile",
      accessor: "profilePicture",
      render: (row) => (
        <Avatar src={row?.profilePicture} alt={row?.name} size="sm" />
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <p className="font-semibold text-slate-800">{row.name}</p>
      ),
      minWidth: "120px",
    },
    {
      key: "email",
      header: "Email",
      accessor: "email",
      minWidth: "180px",
    },
    {
      key: "mobile",
      header: "Mobile",
      accessor: "mobile",
      minWidth: "120px",
      render: (row) => formatPhoneNumber(row.mobile)
    },
    // {
    //   key: "username",
    //   header: "Username",
    //   accessor: "username",
    //   render: (row) => (
    //     <p className="font-medium">@{row?.username || "-"}</p>
    //   ),
    // },
    {
      key: "gender",
      header: "Gender",
      accessor: "gender",
      render: (row) => (
        <Badge
          text={row?.gender || "-"}
          variant={
            row?.gender?.toLowerCase() === "male"
              ? "primary"
              : row?.gender?.toLowerCase() === "female"
                ? "pink"
                : "secondary"
          }
        />
      ),
    },
    {
      key: "address",
      header: "Address",
      render: (row) => (
        <p className="min-w-32">
          {[row?.address?.city, row?.address?.country]
            .filter(Boolean)
            .join(", ") || "-"}
        </p>
      ),
    },
    {
      key: "status",
      header: "Status",
      accessor: "isActive",
      render: (row) => (
        <Switch
          checked={row.isActive}
          label={row.isActive ? "Active" : "Inactive"}
          labelPosition="right"
          onCheckedChange={(checked) => {
            console.log("User status:", row.id, checked);
            toastify.success("User status changed successfully!");
          }}
          activeColor="bg-green-600"
          size="sm"
          ariaLabel={`Toggle ${row.name} status`}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <TableActionButtons
          row={row}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  // Search and filter users
  const filteredUsers = users.filter((user) => {
    const matchesName = (user?.name || "")
      .toLowerCase()
      .includes(debouncedName.toLowerCase());

    const matchesEmail = (user?.email || "")
      .toLowerCase()
      .includes(debouncedEmail.toLowerCase());

    const matchesStatus =
      !filterValues.status ||
      (filterValues.status === "active" && user.isActive) ||
      (filterValues.status === "inactive" && !user.isActive);

    const matchesGender =
      !filterValues.gender ||
      user?.gender?.toLowerCase() === filterValues.gender;

    return matchesName && matchesEmail && matchesStatus && matchesGender;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const isResetDisabled =
    !searchValues.name &&
    !searchValues.email &&
    !filterValues.status &&
    !filterValues.gender;

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Failed to load users. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-5">

      <PageHeader
        title="Users"
        titleIcon={MdGroup}
        description="View, search, and manage all registered users in your application."
        onRefresh={refetch}
        refreshLoading={isFetching}
      />

      <TableToolbar
        searchFields={[
          {
            key: "name",
            type: "search",
            label: "Name",
            placeholder: "Search by name...",
          },
          {
            key: "email",
            type: "search",
            label: "Email",
            placeholder: "Search by email...",
          },
        ]}
        searchValues={searchValues}
        onSearchChange={handleSearchChange}
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
          {
            key: "gender",
            label: "Gender",
            placeholder: "All Genders",
            options: [
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ],
          },
        ]}
        filterValues={filterValues}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        isResetDisabled={isResetDisabled}
      />

      <Table
        columns={columns}
        data={filteredUsers}
        loading={isLoading}
        rowKey="id"
        page={safePage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
        emptyMessage={
          <EmptyState
            icon={MdPerson}
            iconSize={26}
            variant="minimal"
            size="sm"
            title="No users found"
            description="No users match your search or filter criteria. Try adjusting your filters."
          />
        }
      />

    </div>
  );
};

export default Users;