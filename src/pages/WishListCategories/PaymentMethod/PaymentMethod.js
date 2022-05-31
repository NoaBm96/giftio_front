import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CardFlex } from "../../../components/Card/Card.style";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  getWishListCategories,
  getFriendWishListCategories,
} from "../../../redux/actions/wishListCategory";
import AutoComplete from "react-google-autocomplete";
import { createPaymentMethod } from "../../../redux/actions/paymentMethod";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const initialData = {
  paymentFrom: "",
  creditCardNumber: "",
  cvv: "",
  yearMonth: "",
  idNumber: "",
  paymentAmount: "",
};

const PaymentMethod = ({ handleClose, open, data }) => {
  const dispatch = useDispatch();
  let { friendId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState(initialData);

  const handleChange = (e) => {
    setPaymentMethod((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      createPaymentMethod({ ...paymentMethod, wishLishCategoryId: data._id })
    );
    dispatch(getFriendWishListCategories(friendId));
    clearData();
  };

  const clearData = () => {
    setPaymentMethod(initialData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle color="primary">
        {friendId === undefined ? "Shipment Detail" : "Payment Method"}
      </DialogTitle>
      {friendId === undefined ? (
        <form autoComplete="off">
          <DialogContent>
            <CardFlex direction="column">
              <AutoComplete
                apiKey={"AIzaSyBmZSgfvac6TjC2ac05l9ccYsLTkkOL07k"}
                onPlaceSelected={(place) => console.log(place)}
                placeholder="Shipment Address"
                className="shipment-field"
              />
            </CardFlex>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={clearData}>
              cancel
            </Button>
            <Button
              variant="contained"
              type="button"
              onClick={() => {
                clearData();
                data.directDelete(data._id);
              }}
            >
              Send
            </Button>
          </DialogActions>
        </form>
      ) : (
        <form autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent>
            <CardFlex direction="column">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Payment From
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="paymentFrom"
                  value={paymentMethod.paymentFrom}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label="PayPal"
                  />
                  <FormControlLabel
                    value="visa"
                    control={<Radio />}
                    label="Visa"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                value={paymentMethod.paymentAmount}
                name="paymentAmount"
                onChange={handleChange}
                size="small"
                label={`Payment Amount  (1$ - ${data.price - data.paidAmount})`}
                InputProps={{
                  inputProps: { min: 1, max: data.price - data.paidAmount },
                }}
                type="number"
                required
              />
              <TextField
                value={paymentMethod.creditCardNumber}
                name="creditCardNumber"
                onChange={handleChange}
                size="small"
                label="Credit Card Number"
                type="number"
                required
              />
              <CardFlex>
                <TextField
                  value={paymentMethod.cvv}
                  name="cvv"
                  onChange={handleChange}
                  size="small"
                  label="CVV"
                  type="number"
                  required
                  fullWidth
                />
                <TextField
                  value={paymentMethod.yearMonth}
                  name="yearMonth"
                  onChange={handleChange}
                  size="small"
                  label="Year Month"
                  type="month"
                  required
                  fullWidth
                />
              </CardFlex>
              <TextField
                value={paymentMethod.idNumber}
                name="idNumber"
                onChange={handleChange}
                size="small"
                label="ID Number"
                type="number"
                required
              />
            </CardFlex>
          </DialogContent>
          <DialogActions>
            <Button onClick={clearData} variant="contained" autoFocus>
              cancel
            </Button>
            <Button variant="contained" type="submit">
              Payment
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

export default PaymentMethod;
