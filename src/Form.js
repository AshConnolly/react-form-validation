import React, { Component } from "react";

/*
 TODO
 - validate all fields on submit (loop through)
 - check if isRequired is on element before checking validity
 - change checks to regex
 - ability to add more data attributes to input - max / min length etc
    - maybe with a regex pattern on the attribute to minimize effort
    so validation checks could fall into various categories listed, else use the regex
 - other field types 
    - first check if its a text field
*/


/*
 function is passed an input
 checks the inputs validation type (data-attr)
 if invalid it will returns an error variable 
 this variable is added to the state from handleInput and onBlur
*/
function validateInput(input) {
    let errors = {};
    let validationType = input.getAttribute("data-validation-type");
    if (validationType === null) validationType = input.type;
    
    let errorName = input.name + "Error";
    // console.log("input.value.length", input.value.length);
    // console.log("validationType", validationType);
    console.log("input validation attr:", input.getAttribute("data-validation-type"), "input.value:", input.value);

    
    // return error as empty before checking
    errors[errorName] = "";    


    if (validationType === "name") {
        if (input.value === "" || input.value.length === 0) {
            // will change to regex
            console.log("fill");
            errors[errorName] = "please fill this in";
        } 
    }

    if (validationType === "email") {
        if (input.value === "" || input.value.length === 0) {
            console.log("fill");
            errors[errorName] = "please fill this in";
        }
    }
    return errors;
}


class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            nameError: "",
            email: "",
            emailError: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    handleInputChange = e => {
        let input = e.target;
        let errors = validateInput(input);
        // console.log("errors", errors);

        this.setState({
            ...this.state, [input.name]: input.value,  ...errors
        });
    };

    onBlur = e => {
        let input = e.target;

        setTimeout(() => { // setTimeout for blur
            if (!input.contains(document.activeElement)) {
                let errors = validateInput(input);// run validation against this input, and return error object
                this.setState({ ...this.state, ...errors }); // update state with returned errors 
                // console.log("errors", errors);
            }
        }, 0);

    };

    render() {
        return (
            <div>
                <h1>Form</h1>
                 <form action="" onSubmit={this.handleSubmit}>
            <div>
               <label htmlFor="name">Name</label>
               <input
                  type="text"
                  value={this.state.name}
                  name="name"
                  onChange={this.handleInputChange}
                  onBlur={this.onBlur}
                  placeholder="bob"
                  data-validation-type="name"                  
                  required
               />
               <p>{this.state.nameError}</p>
            </div>
            <div>
               <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={this.state.email}
                  name="email"
                  onChange={this.handleInputChange}
                  onBlur={this.onBlur}
                  placeholder="bob@bobsplace.com"
                  data-validation-type="email"
                  required
               />
               <p>{this.state.emailError}</p>
            </div>
            <button type="submit">Sumbit</button>

           
            <table>
               <tbody>
                  <tr>
                     <td colSpan="2"><b>current state</b></td>
                  </tr>
                  <tr>
                     <td>name</td>
                     <td> {this.state.name}</td>
                  </tr>
                  <tr>
                     <td>nameError</td>
                     <td> {this.state.nameError}</td>
                  </tr>
                  <tr>
                     <td>email</td>
                     <td> {this.state.email}</td>
                  </tr>
                  <tr>
                     <td>emailError</td>
                     <td> {this.state.emailError}</td>
                  </tr>
               </tbody>
            </table>
         </form>
            </div>
        );
    }
}

export default Form;