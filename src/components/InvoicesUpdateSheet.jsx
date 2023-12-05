import React from "react";
import { Link } from "react-router-dom";
import { useInvoiceListData } from "../redux/hooks";
import { updateInvoices } from "../redux/invoicesSlice";
import { Form, Button, Card, Table } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deselectAllInvoices } from "../redux/selectedInvoicesSlice";

const InvoicesUpdateSheet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedInvoices = useSelector((state) => state.selectedInvoices);
  const { invoiceList } = useInvoiceListData();
  const editableInvoiceList = JSON.parse(JSON.stringify(selectedInvoices));

  const handleGoBack = () => {
    dispatch(deselectAllInvoices());
    navigate(`/`);
  };

  const handleInput = (event, invoiceNumber) => {
    const property = event.target.getAttribute("data-property");

    const index = editableInvoiceList.findIndex(
      (element) => element.invoiceNumber === invoiceNumber
    );

    if (index !== -1) {
      editableInvoiceList[index] = {
        ...editableInvoiceList[index],
        [property]:
          property === "dateOfIssue"
            ? event.target.value
            : event.target.innerText,
      };
    }
  };

  const handleUpdate = () => {
    const updatedList = invoiceList.map((originalInvoice) => {
      const editableInvoice = editableInvoiceList.find(
        (editable) => editable.invoiceNumber === originalInvoice.invoiceNumber
      );

      if (editableInvoice) {
        return {
          ...originalInvoice,
          ...editableInvoice,
        };
      }

      return originalInvoice;
    });
    dispatch(updateInvoices(updatedList));
    dispatch(deselectAllInvoices());
    alert("Invoices updated successfuly 🥳");
    navigate(`/`);
  };

  return (
    <React.Fragment>
      <div className="d-flex align-items-center">
        <BiArrowBack size={18} />
        <div className="fw-bold mt-1 mx-2 cursor-pointer">
          <h5 onClick={handleGoBack}>Go Back</h5>
        </div>
      </div>

      <div className="d-flex flex-row align-items-center justify-content-center">
        <Button variant="primary mb-2 mb-md-4" onClick={handleUpdate}>
          Update
        </Button>
      </div>

      <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
        <Table responsive bordered>
          <thead>
            <tr>
              <th className="text-center" rowSpan={2}>
                Invoice No.
              </th>
              <th className="text-center" rowSpan={2}>
                ID
              </th>
              <th className="text-center" rowSpan={2}>
                Due Date
              </th>
              <th className="text-center" colSpan={3}>
                Bill To
              </th>
              <th className="text-center" colSpan={3}>
                Bill From
              </th>
              <th className="text-center" rowSpan={2}>
                Total
              </th>
            </tr>
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Email ID</th>
              <th className="text-center">Address</th>
              <th className="text-center">Name</th>
              <th className="text-center">Email ID</th>
              <th className="text-center">Address</th>
            </tr>
          </thead>
          <tbody>
            {editableInvoiceList.map((invoice) => (
              <tr>
                <td className="text-center">{invoice.invoiceNumber}</td>
                <td className="text-center">{invoice.id}</td>
                <td>
                  <Form.Control
                    type="date"
                    data-property="dateOfIssue"
                    value={invoice.dateOfIssue}
                    name="dateOfIssue"
                    onChange={(e) => handleInput(e, invoice.invoiceNumber)}
                    style={{ maxWidth: "150px", margin: "auto" }}
                    required
                  />
                </td>
                <td
                  className="text-center"
                  contentEditable="true"
                  data-property="billTo"
                  onInput={(e) => handleInput(e, invoice.invoiceNumber)}
                >
                  {invoice.billTo}
                </td>
                <td
                  className="text-center"
                  contentEditable="true"
                  data-property="billToEmail"
                  onInput={(e) => handleInput(e, invoice.invoiceNumber)}
                >
                  {invoice.billToEmail}
                </td>
                <td
                  className="text-center"
                  contentEditable="true"
                  data-property="billToAddress"
                  onInput={(e) => handleInput(e, invoice.invoiceNumber)}
                >
                  {invoice.billToAddress}
                </td>
                <td
                  className="text-center"
                  contentEditable="true"
                  data-property="billFrom"
                  onInput={(e) => handleInput(e, invoice.invoiceNumber)}
                >
                  {invoice.billFrom}
                </td>
                <td
                  className="text-center"
                  contentEditable="true"
                  data-property="billFromEmail"
                  onInput={(e) => handleInput(e, invoice.invoiceNumber)}
                >
                  {invoice.billFromEmail}
                </td>
                <td
                  className="text-center"
                  contentEditable="true"
                  data-property="billFromAddress"
                  onInput={(e) => handleInput(e, invoice.invoiceNumber)}
                >
                  {invoice.billFromAddress}
                </td>
                <td className="text-center">
                  {invoice.currency} {invoice.total}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </React.Fragment>
  );
};

export default InvoicesUpdateSheet;
