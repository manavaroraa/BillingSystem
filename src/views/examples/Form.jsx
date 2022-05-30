import React, { Component } from "react";
import Header from "../../Components/Header/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "react-datetime/css/react-datetime.css";
import TextField from "@material-ui/core/TextField";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const InvoiceLinkRegex = RegExp(
  /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
);

const date_regex = RegExp(
  /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InvoiceLink: null,
      Amount: null,
      email: null,
      ClientType: "",
      date: "",
      status: "",
      formErrors: {
        InvoiceLink: "",
        Amount: "",
        email: "",
        ClientType: "",
        date: "",
        status: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Invoice Link: ${this.state.InvoiceLink}
        Amount: ${this.state.Amount}
        Email: ${this.state.email}
        Client Type: ${this.state.ClientType}
        Date: ${this.state.date}
        status:${this.state.status}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
    const user = {
      InvoiceLink: this.state.InvoiceLink,
      Amount: this.state.Amount,
      email: this.state.email,
      ClientType: this.state.ClientType,
      date: this.state.date,
      status: this.state.status,
    };
    axios.post(`http://localhost:3001/signup`, user).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "InvoiceLink":
        formErrors.InvoiceLink = InvoiceLinkRegex.test(value)
          ? ""
          : "invalid url link  ";
        break;
      case "ClientType":
        break;
      case "status":
        break;
      case "date":
        formErrors.date = date_regex.test(value) ? "" : "Enter Date";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <>
        <Header />
        <Button color="info" href="#pablo" to="/admin/Page" tag={Link}>
          <small>Page</small>
        </Button>
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Add new invoice</h1>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="InvoiceLink">
                <label htmlFor="InvoiceLink">Invoice Link</label>
                <input
                  className={
                    formErrors.InvoiceLink.length > 0 ? "error" : "null"
                  }
                  placeholder="InvoiceLink"
                  type="text"
                  name="InvoiceLink"
                  noValidate
                  onChange={this.handleChange}
                  required
                />
                {formErrors.InvoiceLink.length > 0 && (
                  <span className="errorMessage">{formErrors.InvoiceLink}</span>
                )}
              </div>
              <div className="Amount">
                <label>Amount</label>
                <input
                  className={formErrors.Amount.length > 0 ? "error" : null}
                  placeholder="Amount"
                  type="number"
                  name="Amount"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.Amount.length > 0 && (
                  <span className="errorMessage">{formErrors.Amount}</span>
                )}
              </div>
              <div className="email">
                <label htmlFor="email">Client Email</label>
                <input
                  className={formErrors.email.length > 0 ? "error" : null}
                  placeholder="Email"
                  type="email"
                  name="email"
                  noValidate
                  pattern=".+@globex\.com"
                  size="30"
                  required
                  onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div>
                <label>Date</label> <br />
                &nbsp;
                <TextField
                  id="date"
                  type="date"
                  name="date"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <br />
              <br />
              &nbsp;&nbsp;
        
              <div >
              <label htmlFor="">Status</label>
              <br />
                <select name="status" Value={this.state.status} 
                onChange={this.handleChange}>
                    <option  value="">Select</option>
                  <option id="1"  value="1">No paid</option>
                  <option id="2"  value="2">Paid</option>
                </select>
              </div>
              <div>
                <label htmlFor="ClientType">Client Type</label>
                <br />
                <div >
              <br />
                <select name="ClientType" Value={this.state.ClientType} 
                onChange={this.handleChange}>
                    <option  value="">Select</option>
                  <option  value="Dev">Dev</option>
                  <option  value="SEO">SEO</option>
                  <option  value="Other">Other</option>
                </select>
              </div>
              </div>
              <br />
              <br />
              &nbsp;&nbsp;
              <div className="createAccount">
                <Button
                  type="submit"
                  onClick={() => window.location.reload(false)}
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={
                    !(
                      this.state.email &&
                      this.state.InvoiceLink &&
                      this.state.Amount && this.state.status && this.state.ClientType
                    )
                  }
                >
                  Add new
                </Button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Form;
