import React, { useEffect, useState } from "react";
import { Card, CardFlex, CardHeader } from "../../components/Card/Card.style";
import { Fab, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Form from "./Form/Form";
import {
  getWishListCategories,
  deleteWishListCategory,
  getFriendWishListCategories,
  shipWishListCategory,
} from "../../redux/actions/wishListCategory";
import { useDispatch, useSelector } from "react-redux";
import { confirmation } from "../../utils/notification";
import { AddContainer } from "../WishLists/WishLists.style";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import CircularProgress from "@mui/material/CircularProgress";

const production  = 'https://giftio.herokuapp.com';
const development = 'http://localhost:5001';
const url = production;

const WishListCategories = () => {
  const loader = useSelector((state) => state.loaderReducer);
  let { wishListId, friendId } = useParams();
  const wishListCategories = useSelector((state) =>
    state.wishListCategoryReducer.filter(
      (wishListCategory) => wishListCategory.wishListId === wishListId
    )
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [id, setID] = useState(null);
  const [data, setData] = useState([]);
  const [keyBool, setKeyBool] = useState("");

  const handleClickOpen = (id = null, data = []) => {
    setID(id);
    setKeyBool(0);
    setData(data);
    setOpen(true);
  };

  const handlePaymentMethodClickOpen = (key, data) => {
    setKeyBool(key);
    setData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    confirmation().then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteWishListCategory(id));
      }
    });
  };

  const directDelete = (id) => {
    dispatch(shipWishListCategory(id));
  };

  useEffect(() => {
    friendId === undefined
      ? dispatch(getWishListCategories())
      : dispatch(getFriendWishListCategories(friendId));
  }, [dispatch, friendId]);

  return (
    <>
      <Typography align="center" variant="h4" gutterBottom>
        {friendId ? "Friend's Wishlist Items" : "Your Wishlist Items"}
      </Typography>
      <CardFlex gap="2rem" wrap="wrap" justify="center">
        {keyBool === 1 ? (
          <PaymentMethod data={data} handleClose={handleClose} open={open} />
        ) : (
          <Form
            wishListCategories={wishListCategories}
            id={id}
            data={data}
            handleClose={handleClose}
            open={open}
          />
        )}
        {friendId === undefined && (
          <AddContainer>
            {loader ? (
              <CircularProgress color="inherit" />
            ) : (
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => handleClickOpen()}
              >
                <AddIcon />
              </Fab>
            )}
          </AddContainer>
        )}
        {!loader &&
          wishListCategories.map(
            ({ _id, name, image, price, paidAmount, userId }) => (
              <Card
                display="flex"
                key={_id}
                direction="column"
                width="15rem"
                height="18rem"
                radius="25px"
              >
                <CardHeader
                  radius="25px"
                  p="1rem"
                  height="13rem"
                  bgImage={`https://giftio.herokuapp.com/static/wishListCategories/${userId}/${image}`}
                >
                  {friendId === undefined && (
                    <>
                      <Fab
                        color="primary"
                        aria-label="delete"
                        size="small"
                        onClick={() => handleDelete(_id)}
                      >
                        <DeleteIcon />
                      </Fab>
                      <Fab
                        size="small"
                        color="primary"
                        aria-label="edit"
                        onClick={() => handleClickOpen(_id, { name, price })}
                      >
                        <EditIcon />
                      </Fab>
                    </>
                  )}
                </CardHeader>

                <CardFlex
                  flex="1"
                  direction="column"
                  style={{ padding: "1rem" }}
                >
                  <CardFlex justify="space-between" align="center">
                    <Typography
                      fontWeight="bold"
                      variant="body1"
                      color="primary"
                    >
                      {name}
                    </Typography>
                    <Typography
                      fontWeight="bold"
                      fontStyle="italic"
                      variant="body2"
                    >
                      {`${paidAmount}$ / ${price}$`}
                    </Typography>
                  </CardFlex>
                  {friendId === undefined ? (
                    <Button
                      sx={{ color: "white" }}
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCartIcon />}
                      disabled={paidAmount < price ? true : false}
                      onClick={() =>
                        handlePaymentMethodClickOpen(1, {
                          price,
                          paidAmount,
                          _id,
                          directDelete,
                        })
                      }
                    >
                      Get Your Gift
                    </Button>
                  ) : (
                    <Button
                      sx={{ color: "white" }}
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCartIcon />}
                      disabled={paidAmount === price ? true : false}
                      onClick={() =>
                        handlePaymentMethodClickOpen(1, {
                          price,
                          paidAmount,
                          _id,
                        })
                      }
                    >
                      Buy Now
                    </Button>
                  )}
                </CardFlex>
              </Card>
            )
          )}
      </CardFlex>
    </>
  );
};

export default WishListCategories;
