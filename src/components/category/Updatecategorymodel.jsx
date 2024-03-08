import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Input from "../Elements/Input";
import { CategoryIcon } from "../../utils/reactIcons";
import { RequestTypeEnum } from "../../constants";
import Select from "../Elements/Select";
import { useDispatch } from "react-redux";
import useApiRequest from "@/hooks/useApiRequest";

const Updatecategorymodel = ({closeCategoryModel, opencreatecategorymodel, opendeletecategorymodel}) => {
    const dispatch = useDispatch();
    const [requesttype, setRequesttype] = useState({
        url: "/categories",
        type: RequestTypeEnum.GET
    })
    
    const [category, setCategory] = useState({
        name: "",
        id: "",
    });
    const { apiResponse, handlSubmitRequest, apiData } = useApiRequest(requesttype.url, requesttype.type, category);

    const [validationErrors, setValidationErrors] = useState({
      name: "",
      id: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCategory((prevData) => ({
            ...prevData, [name]: value,
        })); // Update category directly with value
        setValidationErrors(false);
    }
    

  const handleUpdateCategory = () => {
        if(!category.name || category.name.length < 3) {
            setValidationErrors({
              name: "Category name is must be minimum 3 characters"
            });
        } else {
            setRequesttype({
                type: RequestTypeEnum.PATCH,
                url: `/categories/${category.id}`
            });
        }
  };


  const handleDeleteCategory = () => {
       if(!category.id) {
        setValidationErrors({
          id: "Please select a category to delete"
        });
       } else {
        setRequesttype({
            type: RequestTypeEnum.DELETE,
            url: `/categories/${category.id}`
        });
       }     
  };


  useEffect(() => {
   handlSubmitRequest();
  }, [requesttype, setRequesttype])
  

  useEffect(() => {
    if(requesttype.type !== RequestTypeEnum.GET)
        if(apiResponse?.success) {
            dispatch({
                type: "productreducer/MESSAGE",
                payload: apiResponse?.message,
            })
            dispatch({
                type: "productreducer/IsCategoryCreated",
                payload: true,
            })
            closeCategoryModel();
        }
    
  }, [apiResponse]);


  return (
    <div
    className='"w-full fixed z-50 pt-[10px] left-0 top-0 right-0 h-full overflow-auto bg-black bg-opacity-40'
    onClick={closeCategoryModel}
  >
    <div className="flex items-center justify-center h-full">
      <div
        className="bg-white w-[90vw] max-w-xl mx-auto my-5 p-2 md:p-5 border-1 border-gray-800 rounded-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="absolute right-3 top-5 cursor-pointer"
          onClick={closeCategoryModel}
        >
          <AiOutlineClose className="text-2xl text-red-800" />
        </span>
        <section className="space-y-4">
          {/* <div><RiDeleteBin6Line className='mx-auto text-2xl font-bold'/></div> */}
          <p className="text-center text-xl font-semibold">Update Category Items</p>
          <h4 className="text-md font-semibold">Select value to Update/Delete</h4>
          <div className="line-mb:flex space-y-2 line-mb:space-y-0 items-end justify-between gap-3">
            <div className="w-full space-y-2">
            <Select
           options={apiData?.categories.map((category) => category.name)}
           idoptions={apiData?.categories.map((category) => category._id)}
          label="Select Category"
          className=""
          defaultText={"Select Category"}
          name="id"
          value={category.id}
          handleChange={handleChange}
          ReactIcon={CategoryIcon}
          validationErrorsName={validationErrors.id}
      />
          <Input
            label={"Enter New Category Name"}
            placeholder="Category new name"
            ReactIcon={CategoryIcon}
            handleChange={handleChange}
            name={"name"}
            value={category.name}
            validationErrorsName={validationErrors.name}
          />
            </div>
          <div className="line-mb:flex space-y-2 line-mb:space-y-0 justify-center gap-6 flex-wrap">
            <button
              type="button"
              className="border-2 border-none w-full rounded-xl p-1 px-4 btn-color btnHover text-white font-semibold  cursor-pointer"
              onClick={handleUpdateCategory}
            >
              Update category
            </button>
            <button
              type="button"
              className="border-2 border-none w-full  rounded-xl p-1 px-4 bg-red-600 hover:bg-red-400 text-white font-semibold  cursor-pointer"
              onClick={handleDeleteCategory}
            >
              Delete category
            </button>
          </div>
          </div>
          <div className="space-y-2">
        <p>Create New Category Items</p>
          <button
              type="button"
              className="border-2 border-none  rounded-xl p-1 px-4 btn-color btnHover text-white font-semibold  cursor-pointer"
              onClick={opencreatecategorymodel}
            >
              Create New category
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
  )
}

export default Updatecategorymodel