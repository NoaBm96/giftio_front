import React, { useEffect, useState } from "react";
import { Card, CardFlex, CardHeader } from "../../components/Card/Card.style";
import { Fab, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Form from "./Form/Form";
import { getFriends, deleteFriend } from "../../redux/actions/friend";
import { useDispatch, useSelector } from "react-redux";
import { confirmation } from "../../utils/notification";
import { AddContainer } from "../WishLists/WishLists.style";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import user from "../../assets/images/user.jpg";
import CircularProgress from "@mui/material/CircularProgress";

const Friends = () => {
  const loader = useSelector((state) => state.loaderReducer);
  const friends = useSelector((state) => state.friendReducer);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    confirmation().then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFriend(id));
      }
    });
  };

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  return (
    <>
      <Typography align="center" variant="h4" gutterBottom>
        Friends
      </Typography>
      <CardFlex gap="2rem" wrap="wrap" justify="center">
        <Form handleClose={handleClose} open={open} />
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
        {!loader &&
          friends.map(({ _id, username, friendId }) => (
            <Card
              display="flex"
              key={_id}
              direction="column"
              p="1rem"
              width="15rem"
              height="18rem"
              radius="25px"
              bgImage={user}
            >
              <CardHeader>
                <Fab
                  color="primary"
                  aria-label="delete"
                  size="small"
                  onClick={() => handleDelete(_id)}
                >
                  <DeleteIcon />
                </Fab>
              </CardHeader>
              <CardFlex flex="1" align="center" justify="center">
                <Button
                  sx={{ color: "#fff", fontWeight: "600" }}
                  component={Link}
                  to={`/friends/wishLists/${friendId}`}
                  size="large"
                  startIcon={<VisibilityIcon />}
                >
                  {username}
                </Button>
              </CardFlex>
            </Card>
          ))}
      </CardFlex>
    </>
  );
};

export default Friends;
