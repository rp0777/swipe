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
    deselectAllInvoices: (state, action) => {
      return [];
    },
  },
});

export const { selectInvoice, removeInvoice, deselectAllInvoices } =
  selectedInvoicesSlice.actions;

export const selectInvoiceList = (state) => state.selectedInvoices;

export default selectedInvoicesSlice.reducer;
