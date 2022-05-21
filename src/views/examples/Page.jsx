import React from "react";
import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { useHistory, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Page = () => {
        const [password, setPassword] = useState("");
        const history = useHistory();
        useEffect(() => {
        

        }, []);
        async function login() {
          let signin = {
            password: password,
          };
          console.log(password);
          let item = {password };
          let result = await fetch("http://localhost:3001/Search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(signin),
          });
          result = await result.json();
          console.warn(result);
          const token = result[0].password;
          console.log(token);
          localStorage.setItem("password", token);
          window.location.href="/admin/Search"
        }
        const onFormSubmit = (e) => {
          e.preventDefault();
          const {password } = this.state;
        };

  return (
    <>
      <Header />
      <div class="container">
        <h2>Welcome</h2>
       
        <button
          type="button"
          class="btn btn-info btn-lg"
          data-toggle="modal"
          data-target="#myModal"
        >
          ListingForm
        </button>
        <Button color="info" href="#pablo" to="/admin/Form" tag={Link}>
          <small>Add New Invoice</small>
        </Button>
       
        <div class="modal fade" id="myModal" role="dialog">
        <Form role="form" onSubmit={onFormSubmit}>
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">Modal Header</h4>
              </div>
              <div class="modal-body">
                <input type="text" onChange={(e) => setPassword(e.target.value)} name="listing"/>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                 onClick={login} >
                  Submit
                </button>
              </div>
            </div>
          </div>
            </Form>
        </div>
      
      </div>
    </>
  );
};
export default Page;
