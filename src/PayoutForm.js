import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

const PayoutForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    customerName: "",
    customerPhoneNumber: "",
    customerEmail: "",
    transactionType: "NEFT",
    destinationBank: "",
    accountNumber: "",
    beneficiaryLocation: "",
    ifsc: "",
    reference: "",
  });

  const [errors, setErrors] = useState({});
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Static values for merchantID and affiliateID
  const merchantID = "021aaba9-ab1b-11ef-b842-0a58a9feac02";
  const affiliateID = "PEER7b28f4";

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate input fields
  const validate = () => {
    const newErrors = {};
    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number.";
    }
    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required.";
    }
    if (!/^\d{10}$/.test(formData.customerPhoneNumber)) {
      newErrors.customerPhoneNumber = "Phone number must be 10 digits.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Valid email is required.";
    }
    if (!formData.destinationBank.trim()) {
      newErrors.destinationBank = "Destination bank is required.";
    }
    if (!/^\d+$/.test(formData.accountNumber)) {
      newErrors.accountNumber = "Account number must be numeric.";
    }
    if (!formData.beneficiaryLocation.trim()) {
      newErrors.beneficiaryLocation = "Beneficiary location is required.";
    }
    if (!formData.ifsc.trim()) {
      newErrors.ifsc = "IFSC code is required.";
    }
    if (!formData.reference.trim()) {
      newErrors.reference = "Reference ID is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/v1/payouts/initiate", {
        ...formData,
        merchantID,
        affiliateID,
      }, {
        headers: {
          "X-Secret-Key":"C36B088FE538946C", // Replace with your secret key
        },
      });
      setApiResponse({ success: true, data: response.data });
      setErrors({});
    } catch (error) {
      setApiResponse({ success: false, data: error.response?.data || "An error occurred." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        Payout Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.amount}
          helperText={errors.amount}
        />
        <TextField
          label="Customer Name"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.customerName}
          helperText={errors.customerName}
        />
        <TextField
          label="Customer Phone Number"
          name="customerPhoneNumber"
          value={formData.customerPhoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.customerPhoneNumber}
          helperText={errors.customerPhoneNumber}
        />
        <TextField
          label="Customer Email"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.customerEmail}
          helperText={errors.customerEmail}
        />
        <TextField
          label="Transaction Type"
          name="transactionType"
          value={formData.transactionType}
          onChange={handleChange}
          fullWidth
          margin="normal"
          select
        >
          <MenuItem value="NEFT">NEFT</MenuItem>
          <MenuItem value="IMPS">IMPS</MenuItem>
          <MenuItem value="RTGS">RTGS</MenuItem>
          <MenuItem value="RTGS">UPI</MenuItem>
        </TextField>
        <TextField
          label="Destination Bank"
          name="destinationBank"
          value={formData.destinationBank}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.destinationBank}
          helperText={errors.destinationBank}
        />
        <TextField
          label="Account Number"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.accountNumber}
          helperText={errors.accountNumber}
        />
        <TextField
          label="Beneficiary Location"
          name="beneficiaryLocation"
          value={formData.beneficiaryLocation}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.beneficiaryLocation}
          helperText={errors.beneficiaryLocation}
        />
        <TextField
          label="IFSC"
          name="ifsc"
          value={formData.ifsc}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.ifsc}
          helperText={errors.ifsc}
        />
        <TextField
          label="Reference"
          name="reference"
          value={formData.reference}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.reference}
          helperText={errors.reference}
        />
        <Box mt={2} textAlign="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      </form>

      {apiResponse && (
        <Box mt={2}>
          {apiResponse.success ? (
            <Alert severity="success">Payout initiated successfully!</Alert>
          ) : (
            <Alert severity="error">Error: {JSON.stringify(apiResponse.data)}</Alert>
          )}
        </Box>
      )}
    </Container>
  );
};

export default PayoutForm;
