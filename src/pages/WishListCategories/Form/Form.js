import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CardFlex } from "../../../components/Card/Card.style";
import { Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  createWishListCategory,
  updateWishListCategory,
} from "../../../redux/actions/wishListCategory";
import { useDispatch } from "react-redux";
import { warning } from "../../../utils/notification";

const initialData = {
  name: "",
  price: "",
  image: "",
};

const Form = ({ id, data, handleClose, open, wishListCategories }) => {
  const dispatch = useDispatch();
  const [wishListCategory, setWishListCategory] = useState(initialData);
  let { wishListId } = useParams();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setWishListCategory((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setWishListCategory((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in wishListCategory) {
      if (Object.hasOwnProperty.call(wishListCategory, key)) {
        formData.append(key, wishListCategory[key]);
      }
    }
    formData.append("wishListId", wishListId);
    if (id) {
      const checkDublication = wishListCategories.find(
        ({ name, _id }) => name === wishListCategory.name && _id !== id
      );
      !checkDublication
        ? dispatch(updateWishListCategory(id, formData))
        : warning("This name is already exist");
    } else {
      const checkDublication = wishListCategories.find(
        ({ name, _id }) => name === wishListCategory.name && _id !== id
      );
      !checkDublication
        ? dispatch(createWishListCategory(formData))
        : warning("This name is already exist");
    }
    clearData();
  };

  const clearData = () => {
    setWishListCategory(initialData);
    handleClose();
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setWishListCategory(data);
    }
  }, [data]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle color="primary">
        {id ? "Update" : "Add"} Wish List Item
      </DialogTitle>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <DialogContent>
          <CardFlex direction="column">
            <TextField
              value={wishListCategory.name}
              name="name"
              onChange={handleChange}
              size="small"
              label="Name"
              required
            />
            <TextField
              value={wishListCategory.price}
              name="price"
              onChange={handleChange}
              size="small"
              label="Price"
              type="number"
              required
            />
            <TextField
              name="image"
              onChange={handleChange}
              size="small"
              type="file"
              required={id ? false : true}
            />
          </CardFlex>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearData} variant="contained" autoFocus>
            cancel
          </Button>
          <Button variant="contained" type="submit">
            {id ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Form;
