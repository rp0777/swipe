import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoicesSlice"; // Import your other reducers
import selectedInvoicesReducer from "./selectedInvoicesSlice"; // Imported the selectedInvoicesReducer

const rootReducer = combineReducers({
  invoices: invoicesReducer,
  selectedInvoices: selectedInvoicesReducer,
});

export default rootReducer;
