import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CardFlex } from "../../../components/Card/Card.style";
import { Button, TextField } from "@mui/material";
import {
  createWishList,
  updateWishList,
} from "../../../redux/actions/wishList";
import { useDispatch } from "react-redux";
import { warning } from "../../../utils/notification";

const initialData = {
  name: "",
  image: "",
};

const Form = ({ id, data, handleClose, open, wishLists }) => {
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState(initialData);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setWishList((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setWishList((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in wishList) {
      if (Object.hasOwnProperty.call(wishList, key)) {
        formData.append(key, wishList[key]);
      }
    }
    if (id) {
      const checkDublication = wishLists.find(
        ({ name, _id }) => name === wishList.name && _id !== id
      );
      !checkDublication
        ? dispatch(updateWishList(id, formData))
        : warning("This name is already exist");
    } else {
      const checkDublication = wishLists.find(
        ({ name, _id }) => name === wishList.name
      );
      !checkDublication
        ? dispatch(createWishList(formData))
        : warning("This name is already exist");
    }

    clearData();
  };

  const clearData = () => {
    setWishList(initialData);
    handleClose();
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setWishList(data);
    }
  }, [data]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle color="primary">
        {id ? "Update" : "Add"} Wish List
      </DialogTitle>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <DialogContent>
          <CardFlex direction="column">
            <TextField
              value={wishList.name}
              name="name"
              onChange={handleChange}
              size="small"
              label="Name"
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
