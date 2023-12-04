import React from "react";
import { Link } from "react-router-dom";
import { useInvoiceListData } from "../redux/hooks";
import { selectInvoiceList, updateInvoices } from "../redux/invoicesSlice";
import { Button, Card, Table } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const InvoicesUpdateSheet = () => {
  const dispatch = useDispatch();
  const selectedInvoices = useSelector(selectInvoiceList);
  const { invoiceList } = useInvoiceListData();
  // const editableInvoiceList = [...invoiceList];
  const editableInvoiceList = [...selectedInvoices];

  // Function to handle the input whenvene a value is changed for each property of invoices.
  const handleInput = (event, invoiceNumber) => {
    const property = event.target.getAttribute("data-property");

    const index = editableInvoiceList.findIndex(
      (element) => element.invoiceNumber === invoiceNumber
    );

    if (index !== -1) {
      editableInvoiceList[index] = {
        ...editableInvoiceList[index],
        [property]: event.target.innerText,
      };
    }
  };

  const handleUpdate = () => {
    dispatch(updateInvoices(editableInvoiceList));
    console.log(invoiceList);
    alert("Invoices updated successfuly 🥳");
  };

  return (
    <React.Fragment>
      <div className="d-flex align-items-center">
        <BiArrowBack size={18} />
        <div className="fw-bold mt-1 mx-2 cursor-pointer">
          <Link to="/">
            <h5>Go Back</h5>
          </Link>
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
                <td
                  className="text-center"
                  contentEditable="true"
                  data-property="dateOfIssue"
                  onInput={(e, invoiceNumber) =>
                    handleInput(e, invoice.invoiceNumber)
                  }
                >
                  {invoice.dateOfIssue}
                </td>
                <td
                  className="text-center"
                  contentEditable="true"
                  data-property="billTo"
                  onInput={(e, invoiceNumber) =>
                    handleInput(e, invoice.invoiceNumber)
                  }
                >
                  {invoice.billTo}
                </td>
                <td
                  className="text-center"
                  contentEditable="true"
                  data-property="billToEmail"
                  onInput={(e, invoiceNumber) =>
                    handleInput(e, invoice.invoiceNumber)
                  }
                >
                  {invoice.billToEmail}
                </td>
                <td
                  className="text-center"
                  contentEditable="true"
                  data-property="billToAddress"
                  onInput={(e, invoiceNumber) =>
                    handleInput(e, invoice.invoiceNumber)
                  }
                >
                  {invoice.billToAddress}
                </td>
                <td
                  className="text-center"
                  contentEditable="true"
                  data-property="billFrom"
                  onInput={(e, invoiceNumber) =>
                    handleInput(e, invoice.invoiceNumber)
                  }
                >
                  {invoice.billFrom}
                </td>
                <td
                  className="text-center"
                  contentEditable="true"
                  data-property="billFromEmail"
                  onInput={(e, invoiceNumber) =>
                    handleInput(e, invoice.invoiceNumber)
                  }
                >
                  {invoice.billFromEmail}
                </td>
                <td
                  className="text-center"
                  contentEditable="true"
                  data-property="billFromAddress"
                  onInput={(e, invoiceNumber) =>
                    handleInput(e, invoice.invoiceNumber)
                  }
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
