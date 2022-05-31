import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CardFlex } from "../../../components/Card/Card.style";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Typography } from "@mui/material";
import { getUsers } from "../../../redux/actions/user";
import { createFriend } from "../../../redux/actions/friend";
import { useDispatch, useSelector } from "react-redux";

const profile = JSON.parse(sessionStorage.getItem("profile"));

const Form = ({ handleClose, open }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) =>
    state.userReducer.filter((user) => user._id !== profile?.result?._id)
  );

  const handleSubmit = async (friendId, username) => {
    dispatch(createFriend({ friendId, username }));
    handleClose();
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle color="primary">Users List</DialogTitle>
      <DialogContent>
        <CardFlex direction="column">
          {users.map(({ givenName, lastName, _id }, index) => (
            <CardFlex
              align="center"
              justify="space-between"
              p="0.5rem"
              key={_id}
              bgColor={true}
              style={{ borderRadius: "10px" }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ color: "#fff" }}
              >
                {`${index + 1}. ${givenName} ${lastName}`}
              </Typography>
              <IconButton
                onClick={() => handleSubmit(_id, `${givenName} ${lastName}`)}
                aria-label="add"
                size="small"
                sx={{ color: "#fff" }}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </CardFlex>
          ))}
        </CardFlex>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
