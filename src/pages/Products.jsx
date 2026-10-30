import React, { useState } from "react";
import { useDebounce } from "use-debounce";

// Icons
import { MdAdd, MdInventory2, MdStar } from "react-icons/md";

// Components
import Avatar from "../components/Avatar";
import Badge from "../components/Badge";
import Switch from "../components/forms/Switch";
import PageHeader from "../components/PageHeader";
import TableToolbar from "../components/table/TableToolbar";
import TableActionButtons from "../components/table/TableActionButtons";
import Table from "../components/table/Table";
import EmptyState from "../components/EmptyState";

// modal screens
import PrroductView from "../modalScreens/products/PrroductView";
import ProductForm from "../modalScreens/products/ProductForm";
import Confirmation from '../modalScreens/Confirmation';

// Hooks
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";

// Utils
import { toastify } from "../utils/toastify";
import { formatCurrency } from "../utils/formatters";

// store
import useModalStore from "../store/modalStore";

const Products = () => {

    const { openModal, closeModal, setActionLoading } = useModalStore();

    const { data: products = [], isLoading, isError, refetch, isFetching, } = useProducts();
    const { data: categories = [] } = useCategories();

    const PAGE_SIZE = 10;

    const [searchValues, setSearchValues] = useState({
        name: "",
        brand: "",
    });

    const [filterValues, setFilterValues] = useState({
        category: "",
        status: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);

    const [debouncedName] = useDebounce(searchValues.name, 500);
    const [debouncedBrand] = useDebounce(searchValues.brand, 500);

    const handleSearchChange = (key, value) => {
        setSearchValues((prev) => ({
            ...prev,
            [key]: value,
        }));
        setCurrentPage(1);
    };

    const handleFilterChange = (key, value) => {
        setFilterValues((prev) => ({
            ...prev,
            [key]: value,
        }));
        setCurrentPage(1);
    };

    const handleReset = () => {
        setSearchValues({
            name: "",
            brand: "",
        });
        setFilterValues({
            category: "",
            status: "",
        });
        setCurrentPage(1);
        setPageSize(PAGE_SIZE);
    };

    const handlePageSizeChange = (value) => {
        setPageSize(Number(value));
        setCurrentPage(1);
    };

    // add product
    const handleAdd = () => {
        const formId = "product-form";
        openModal({
            title: "Edit Product",
            size: "xl",
            icon: MdInventory2,
            formId,
            content: <ProductForm formId={formId} categories={categories} mode="add" />,
            action: {
                label: "Add Product",
                variant: "theme",
                loadingText: "adding...",
            },
        })
    }

    // View product
    const handleView = (product) => {
        openModal({
            icon: MdInventory2,
            title: "Product Dtails",
            size: 'xl',
            content: (
                <PrroductView product={product} />
            ),
        })
    };

    // Edit product
    const handleEdit = (product) => {
        const formId = "product-form";
        openModal({
            title: "Edit Product",
            size: "xl",
            icon: MdInventory2,
            formId,
            content: <ProductForm product={product} formId={formId} categories={categories} mode="edit" />,
            action: {
                label: "Update",
                variant: "theme",
                loadingText: "Updating...",
            },
        });
    };

    // Delete product
    const handleDelete = (product) => {
        openModal({
            icon: MdInventory2,
            title: "Delete Product",
            content: (
                <Confirmation
                    message="Are you sure you want to delete this product?"
                    data={product?.name}
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
                        toastify.success("product deleted successfully!");
                    }, 1000);
                },
            },
        });
    };

    // Table columns
    const columns = [
        {
            key: "image",
            header: "Product",
            render: (row) => (
                <Avatar
                    src={row?.images?.[0]}
                    alt={row?.name}
                    shape="square"
                    className="object-center object-cover"
                />
            ),
        },
        {
            key: "name",
            header: "Name",
            minWidth: "150px",
            render: (row) => (
                <p className="font-semibold text-slate-800">
                    {row?.name || "-"}
                </p>
            ),
        },
        {
            key: "brand",
            header: "Brand",
            minWidth: "100px",
            render: (row) => (
                <p className="font-medium text-slate-800">
                    {row?.brand || "-"}
                </p>
            ),
        },
        {
            key: "category",
            header: "Category",
            accessor: "category",
            minWidth: "120px",
            render: (row) => (
                <p className="text-sm" >  {row?.category}</p>
            ),
        },
        {
            key: "price",
            header: "Price",
            render: (row) => (
                <div>
                    <p className="font-semibold text-slate-800">
                        {formatCurrency(row?.price || 0)}
                    </p>
                    {row?.originalPrice > row?.price && (
                        <p className="text-xs text-slate-400 line-through">
                            {formatCurrency(row.originalPrice)}
                        </p>
                    )}
                </div>
            ),
        },
        {
            key: "stock",
            header: "Stock",
            accessor: "stock",
            minWidth: "150px",
            render: (row) => (
                <Badge
                    text={
                        row?.stock === 0
                            ? "Out of Stock"
                            : row?.stock <= 10
                                ? `Low (${row.stock})`
                                : `In Stock (${row.stock})`
                    }
                    variant={
                        row?.stock === 0
                            ? "danger"
                            : row?.stock <= 10
                                ? "warning"
                                : "success"
                    }
                />
            ),
        },
        {
            key: "rating",
            header: "Rating",
            minWidth: "120px",
            render: (row) => (
                <div>
                    <p className="font-medium text-slate-800">
                        <MdStar
                            className="inline-flex items-center text-yellow-400"
                            size={16}
                        />{" "}
                        {Number(row?.rating || 0).toFixed(1)}
                    </p>
                    <p className="text-xs text-slate-500">
                        {row?.reviewsCount || 0} reviews
                    </p>
                </div>
            ),
        },
        {
            key: "isFeatured",
            header: "Featured",
            accessor: "isFeatured",
            render: (row) => (
                <Badge
                    text={row?.isFeatured ? "Featured" : "Regular"}
                    variant={row?.isFeatured ? "warning" : "secondary"}
                />
            ),
        },
        {
            key: "status",
            header: "Status",
            accessor: "isActive",
            render: (row) => (
                <Switch
                    checked={row?.isActive}
                    label={row?.isActive ? "Active" : "Inactive"}
                    labelPosition="right"
                    onCheckedChange={(checked) => {
                        console.log("Product status:", row.id, checked);
                        toastify.success(
                            "Product status changed successfully!"
                        );
                    }}
                    activeColor="bg-green-600"
                    size="sm"
                    ariaLabel={`Toggle ${row?.name} status`}
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

    // Search and filter products
    const filteredProducts = products.filter((product) => {
        const matchesName = (product?.name || "")
            .toLowerCase()
            .includes(debouncedName.trim().toLowerCase());

        const matchesBrand = (product?.brand || "")
            .toLowerCase()
            .includes(debouncedBrand.trim().toLowerCase());

        const matchesCategory =
            !filterValues.category ||
            product?.category === filterValues.category;

        const matchesStatus =
            !filterValues.status ||
            (filterValues.status === "active" && product?.isActive) ||
            (filterValues.status === "inactive" && !product?.isActive);

        return (
            matchesName &&
            matchesBrand &&
            matchesCategory &&
            matchesStatus
        );
    });

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

    const safePage = Math.min(currentPage, totalPages);

    const isResetDisabled =
        !searchValues.name &&
        !searchValues.brand &&
        !filterValues.category &&
        !filterValues.status;

    if (isError) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                Failed to load products. Please try again.
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <PageHeader
                title="Products Management"
                titleIcon={MdInventory2}
                description="Manage your products, pricing, stock, and availability."
                onRefresh={refetch}
                refreshLoading={isLoading || isFetching}

                actionLabel="Add Product"
                actionVariant="theme"
                actionIcon={MdAdd}
                onClick={handleAdd}
            />

            <TableToolbar
                searchFields={[
                    {
                        key: "name",
                        type: "search",
                        label: "Name",
                        placeholder: "Search by product name...",
                    },
                    {
                        key: "brand",
                        type: "search",
                        label: "Brand",
                        placeholder: "Search by brand...",
                    },
                ]}
                searchValues={searchValues}
                onSearchChange={handleSearchChange}
                filters={[
                    {
                        key: "category",
                        label: "Category",
                        placeholder: "All Categories",
                        options: categories.map((item) => ({
                            label: item.name,
                            value: item.name,
                        })),
                    },
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
                filterValues={filterValues}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
                isResetDisabled={isResetDisabled}
            />

            <Table
                columns={columns}
                data={filteredProducts}
                loading={isLoading}
                rowKey="id"
                page={safePage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={handlePageSizeChange}
                emptyMessage={
                    <EmptyState
                        icon={MdInventory2}
                        iconSize={26}
                        variant="minimal"
                        size="sm"
                        title="No products found"
                        description="No products match your search or filter criteria. Try adjusting your filters."
                    />
                }
            />
        </div>
    );
};

export default Products;