import React from 'react';
import { useNavigate } from "react-router-dom";

import {
       MdEdit, MdEmail, MdLocationOn, MdPerson, MdPhone, MdCalendarToday, MdBadge,
       MdVerifiedUser, MdLogout, MdLockReset, MdLock
} from 'react-icons/md';

// components
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Image from '../components/media/Image';
import Container from '../components/Container';
import Badge from "../components/Badge";

// modal screens
import Confirmation from "../modalScreens/Confirmation";
import ChangePassword from '../modalScreens/profile/ChangePassword';
import EditProfile from '../modalScreens/profile/EditProfile';

// store
import useModalStore from '../store/modalStore';
import useAuthStore from '../store/authStore';

// utils
import { toastify } from "../utils/toastify";


const Profile = () => {

  const { openModal, closeModal, setActionLoading } = useModalStore();

  const navigate = useNavigate();

  const { user: admin, logout } = useAuthStore();

  const personalDetails = [
    { label: "Full Name", value: admin?.name || "Not provided", icon: MdPerson, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
    { label: "Username", value: admin?.userName || "Not provided", icon: MdPerson, iconBg: "bg-violet-50", iconColor: "text-violet-600" },
    { label: "Email Address", value: admin?.email || "Not provided", icon: MdEmail, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { label: "Mobile Number", value: admin?.mobile || "Not provided", icon: MdPhone, iconBg: "bg-amber-50", iconColor: "text-amber-600" },
    { label: "Member Since", value: admin?.createdAt ? formatDate(admin.createdAt) : "Not available", icon: MdCalendarToday, iconBg: "bg-purple-50", iconColor: "text-purple-600" },
    { label: "Address", value: admin?.address || "Not provided", icon: MdLocationOn, iconBg: "bg-rose-50", iconColor: "text-rose-600" },
  ];

  // edit profile
  const handleEditProfile = () => {

    const formId = 'edit-profile-form'
    openModal({
      title: "Edit Profile",
      size: "lg",
      icon: MdPerson,
      formId: formId,
      content: (<EditProfile user={admin} formId={formId} />),
      action: {
        label: "Save Changes",
        variant: "themeDark",
        loadingText: "Saving Changes...",
      }
    })
  }

  // password change
  const handleChangePassword = () => {
    const formId = "change-password-form"
    openModal({
      title: "Change Password",
      icon: MdLock,
      content: <ChangePassword formId={formId} />,
      size: "md",
      formId: formId,
      action: {
        label: "Save Changes",
        variant: "themeDark",
        loadingText: "Saving Changes...",
      }

    });
  };

  // logout
  const handleLogout = () => {
    openModal({
      title: "Logout",
      icon: MdLogout,
      content: (
        <Confirmation
          icon={MdLogout}
          variant="danger"
          title="Logout Account"
          message={<>Are you sure you want to logout from <b>AdminFlow</b>?</>}
        />
      ),
      size: "md",
      action: {
        label: "Logout",
        variant: "danger",
        loadingText: "Logging Out...",
        onClick: () => {
          setActionLoading(true);

          setTimeout(() => {
            logout()
            closeModal();
            setActionLoading(false);
            toastify.success("Logged out successfully!");
            navigate("/login", { replace: true });
          }, 1500)

        },
      },
    });
  };


  return (
    <div className='space-y-5'>

      <PageHeader
        title="Admin Profile"
        titleIcon={MdPerson}
        description="View and update your profile information and account details."
        onClick={handleEditProfile}
        actionLabel='Edit profile'
        actionVariant="theme"
        actionIcon={MdEdit}
      />

      <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">

        {/* Admin Profile Overview */}
        <Container className="flex h-full min-w-0 rounded-md border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-1 flex-row items-center gap-4 sm:gap-5 lg:flex-col lg:justify-center lg:gap-2">
            <div className="flex h-30 w-30 shrink-0 items-center justify-center overflow-hidden rounded-xl border-4 border-white bg-gray-100 shadow-md ring-1 ring-gray-200 sm:h-32 sm:w-32 lg:h-40 lg:w-40">
              {admin?.profileImage ? (
                <Image
                  src={admin.profileImage}
                  alt={admin?.name || "Admin"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-500">
                  <MdPerson size={64} />
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col items-start gap-3 lg:mt-5 lg:flex-none lg:items-center lg:text-center">
              <h2 className="max-w-full wrap-break-word text-xl font-bold capitalize text-gray-900 sm:text-2xl">
                {admin?.name}
              </h2>

              <p className="max-w-full break-all text-sm text-gray-500">
                {admin?.email}
              </p>

              <div className="flex flex-wrap items-center gap-2 lg:justify-center">
                <Badge variant="primary" className="capitalize">
                  <span className="inline-flex items-center gap-1">
                    <MdBadge size={15} />
                    {admin?.role}
                  </span>
                </Badge>

                <Badge
                  variant={admin?.isActive ? "success" : "danger"}
                  className="inline-flex items-center gap-1 rounded-full"
                >
                  <MdVerifiedUser size={14} />
                  {admin?.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
        </Container>

        {/* Personal Information */}
        <Container className="flex h-full min-w-0 flex-col rounded-md border border-gray-200 bg-white p-5 shadow-sm sm:p-6 md:col-span-2">
          {/* Section Header */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your personal details and contact information.
            </p>
          </div>

          {/* Information Grid */}
          <div className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            {personalDetails.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
              <div key={label} className="flex min-w-0 items-start gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
                  <Icon className={`text-xl ${iconColor}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-900">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-gray-100 pt-5 sm:mt-auto sm:grid-cols-2 lg:grid-cols-3">
            <Button
              type="button"
              variant="primary"
              icon={MdLockReset}
              text="Change Password"
              className="w-full"
              onClick={handleChangePassword}
            />
            <Button
              type="button"
              variant="danger"
              icon={MdLogout}
              text="Logout"
              onClick={handleLogout}
              // loading={isLoggingOut}
              loadingText="Logging out..."
              // disabled={isLoggingOut}
              className="w-full"
            />
          </div>
        </Container>

      </div>

    </div>
  )
}

export default Profile