import { createSlice } from "@reduxjs/toolkit";

const selectedInvoicesSlice = createSlice({
  name: "selectedInvoices",
  initialState: [],
  reducers: {
    selectInvoice: (state, action) => {
      state.push(action.payload);
    },
    removeInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    clearSelectedInvoices: (state, action) => {
      return [];
    },
  },
});

export const { selectInvoice, removeInvoice, clearSelectedInvoices } =
  selectedInvoicesSlice.actions;

export const selectInvoiceList = (state) => state.selectedInvoices;

export default selectedInvoicesSlice.reducer;
