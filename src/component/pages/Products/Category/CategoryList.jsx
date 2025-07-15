import React, { useCallback, useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../Basic/Pagination";
import { FaEye } from "react-icons/fa";
import {
  startLoading,
  stopLoading,
} from "../../../../redux/slices/loadingSlice";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import axiosInstance from "../../../../config/AxiosConfig";
import { showErrorMessage } from "../../../../helpers/notificationService";
import { useDispatch } from "react-redux";
import TableHeaderPart from "../../../Basic/TableHeaderPart";
import { useTheme } from "@mui/material/styles";
import DropDrown from "../../../Basic/DropDrown";
import { nameFilter } from "../../../../constant/Options";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs"; // You'll need to install this package

function CategoryList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [categories, setCategories] = useState([]);

  const [categoriesPerPage, setCategoriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);

  const [filter, setFilter] = useState({
    sortField: "category_name",
    sortBy: "asc",
  });

  const fetchCategoryList = async (search) => {
    try {
      let queryFields = { ...filter };
      delete queryFields.sortBy;
      delete queryFields.sortField;

      let query = {
        limit: categoriesPerPage,
        page: currentPage,
        sortBy: filter.sortField,
        sortOrder: filter.sortBy,
        ...queryFields,
      };
      if (search) {
        query.search = search;
      }

      const queryString = new URLSearchParams(query).toString();

      dispatch(startLoading());
      const response = await axiosInstance.get(
        `${AxiosInstancePaths.Categories.GET_LIST}?${queryString}`
      );
      if (response.data?.payload) {
        setCurrentPage(response.data?.payload?.result?.meta?.currentPage);
        setCategoriesPerPage(response.data?.payload?.result?.meta?.limit);
        setTotalDocs(response.data?.payload?.result?.meta?.docsFound);
        setCategories(response.data?.payload?.result?.data);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);

      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null);

    const debounceCallback = useCallback(
      (...args) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          callback(...args);
        }, delay);
      },
      [callback, delay]
    );

    return debounceCallback;
  };

  const debouncedFetchUserList = useDebounce(fetchCategoryList, 500);

  const handleSearchChange = (value) => {
    const newSearchTerm = value;
    debouncedFetchUserList(newSearchTerm);
  };

  const handleFilter = (name, value) => {
    if (name === "category_name") {
      setFilter({
        sortBy: value,
        sortField: name,
      });
    } else {
      setFilter({
        [name]: value,
      });
    }
  };

  const editCategory = (id) => {
    navigate(`/category/edit/${id}`);
  };
  const viewCategory = (id) => {
    navigate(`/category/view/${id}`);
  };

  useEffect(() => {
    fetchCategoryList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchCategoryList();
    // eslint-disable-next-line
  }, [filter, categoriesPerPage, currentPage]);

  return (
    <div>
      <TableHeaderPart
        addText={"Add Category"}
        title="Categories"
        searchText="Search by name or description"
        handleAdd={() => navigate("/category/add")}
        handleSearch={handleSearchChange}
        isClear={true}
        onClear={() => {
          setFilter({
            sortField: "category_name",
            sortBy: "asc",
          });
        }}
      />
      <div style={{ width: "100%", marginTop: "1rem" }}>
        <div
          style={{
            fontWeight: "bold",
            color: theme.palette.text.primary,
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
            marginTop: "1rem",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            boxShadow: theme.shadows[1],
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Sr. No.
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Category Name
            <DropDrown
              name="category_name"
              icon={
                filter?.sortField &&
                filter.sortField === "category_name" &&
                filter.sortBy !== "asc" ? (
                  <BsSortAlphaDownAlt
                    color={theme.palette.common.black}
                    size={15}
                  />
                ) : (
                  <BsSortAlphaDown
                    color={theme.palette.common.black}
                    size={15}
                  />
                )
              }
              onSelect={handleFilter}
              options={nameFilter}
              value={
                filter?.sortField && filter.sortField === "category_name"
                  ? filter.sortBy
                  : ""
              }
            />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Action
          </div>
        </div>
      </div>
      {categories.length > 0 ? (
        categories.map((category, categoryIndex) => (
          <div
            key={category._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
              marginTop: "1rem",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "10px",
              boxShadow: theme.shadows[1],
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                gap: "0.2rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {categoriesPerPage * (currentPage - 1) + categoryIndex + 1}
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                gap: "0.2rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {category.category_name}
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                gap: "0.2rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                size="small"
                onClick={() => viewCategory(category._id)}
                style={{ color: theme.palette.info.main }}
              >
                <FaEye />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => editCategory(category._id)}
                style={{ color: theme.palette.warning.main }}
              >
                <AiFillEdit />
              </IconButton>

              {/* <IconButton
              size="small"
              onClick={() => deleteCategory(category._id)}
              style={{ color: theme.palette.error.main }}
            >
              <MdDelete />
            </IconButton> */}
            </div>
          </div>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "15px",
            marginTop: "1rem",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            boxShadow: theme.shadows[1],
          }}
        >
          No Category Found
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalItems={totalDocs}
        itemsPerPage={categoriesPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setCategoriesPerPage}
      />
    </div>
  );
}

export default CategoryList;
