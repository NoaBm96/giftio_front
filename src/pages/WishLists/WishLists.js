import React, { useEffect, useState } from "react";
import { Card, CardFlex, CardHeader } from "../../components/Card/Card.style";
import { Fab, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Form from "./Form/Form";
import {
  getWishLists,
  deleteWishList,
  getFriendWishLists,
} from "../../redux/actions/wishList";
import { useDispatch, useSelector } from "react-redux";
import { confirmation } from "../../utils/notification";
import { AddContainer } from "./WishLists.style";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const WishLists = () => {
  const loader = useSelector((state) => state.loaderReducer);
  const wishLists = useSelector((state) => state.wishListReducer);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [id, setID] = useState(null);
  const [data, setData] = useState([]);

  const { friendId } = useParams();

  const handleClickOpen = (id = null, data = []) => {
    setID(id);
    setData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    confirmation().then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteWishList(id));
      }
    });
  };

  useEffect(() => {
    friendId === undefined
      ? dispatch(getWishLists())
      : dispatch(getFriendWishLists(friendId));
  }, [dispatch, friendId]);

  return (
    <>
      <Typography align="center" variant="h4" gutterBottom>
        {friendId ? "Friend's Wishlist" : "Your Wishlist"}
      </Typography>
      <CardFlex gap="2rem" wrap="wrap" justify="center">
        <Form
          wishLists={wishLists}
          id={id}
          data={data}
          handleClose={handleClose}
          open={open}
        />
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
          wishLists.map(({ _id, name, image, userId }) => (
            <Card
              display="flex"
              key={_id}
              direction="column"
              p="1rem"
              width="15rem"
              height="18rem"
              radius="25px"
              bgImage={`https://giftio.herokuapp.com/static/wishLists/${userId}/${image}`}
            >
              {friendId === undefined && (
                <CardHeader>
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
                    onClick={() => handleClickOpen(_id, { name })}
                  >
                    <EditIcon />
                  </Fab>
                </CardHeader>
              )}
              <CardFlex flex="1" align="center" justify="center">
                <Button
                  sx={{ color: "white", fontWeight: "600" }}
                  component={Link}
                  to={
                    friendId === undefined
                      ? `/wishLists/${_id}`
                      : `/friends/wishLists/${friendId}/wishListCategories/${_id}`
                  }
                  size="large"
                  startIcon={<VisibilityIcon />}
                >
                  {name}
                </Button>
              </CardFlex>
            </Card>
          ))}
      </CardFlex>
    </>
  );
};

export default WishLists;
