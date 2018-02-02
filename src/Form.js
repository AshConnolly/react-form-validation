import React, { Component } from "react";

/*
 TODO
    - validate all fields on submit (loop through / check state)
    - set validate function to take an array of inputs
    - check if isRequired is on element before checking validity
    - debounce for type validation
    - ability to add more data attributes to input - max / min length etc
        - maybe with a regex pattern on the attribute to minimize effort
          so validation checks could fall into various categories listed, else use the regex
    - other field types 
    - First check if its a text field
    - 
     
    */

/*
 function is passed an input
 checks the inputs validation type (data-attr)
 if invalid it will returns an error variable 
 this variable is added to the state from handleInput and onBlur
*/

var emailRegex = /^\S+@\S+\.\S+$/;
var nameRegex = /^[a-zA-Z]/;
var mobileRegex = /^07[0-9]{9,10}$/;

// accept array / multiple
function validateInput() {
    let errors = {};
    for (var i = 0 ; i < arguments.length ; i += 1) {       
        let input = arguments[i];
        let validationType = input.getAttribute("data-validation-type");
        if (validationType === null) validationType = input.type;
        let errorName = input.name + "Error";
        console.log("input validation attr:", input.getAttribute("data-validation-type"), "input.value:", input.value);

        errors[errorName] = "";

        if (input.value === "" || input.value.length === 0) {
            errors[errorName] = "please fill this in";
        } else if (validationType === "name") {
            if (input.value.match(nameRegex) === null || input.value.length < 3) {
                errors[errorName] = "Name must be at elast 3 characters";
            }
        } else if (validationType === "email") {
            if (input.value.match(emailRegex) === null) {
                errors[errorName] = "Email must be a valid email";
            }
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    handleInputChange = e => {
        let input = e.target;
        // this.setState({ ...this.state, [input.name]: input.value });
        let errors = validateInput(input);
        this.setState({ ...this.state, [input.name]: input.value, ...errors });
    };

    onBlur = e => {
        let input = e.target;
        this.setState({ ...this.state, [input.name]: input.value });

        setTimeout(() => { // setTimeout for blur
            if (!input.contains(document.activeElement)) {
                let errors = validateInput(input); // run validation against this input, and return error object
                this.setState({ ...this.state, ...errors }); // update state with returned errors
                // console.log("errors", errors);
            }
        }, 0);
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit');

        console.log(e.target.name.value);
        let errors = validateInput(e.target.name, e.target.email); 
        console.log('errors', errors)
        this.setState({ ...this.state, ...errors }); 

        let nameError = this.state.nameError;
        let emailError = this.state.emailError;

        console.log('nameError', nameError)
        console.log('emailError', emailError)
        
        // TODO still submitting empyt form
        if (nameError !== "" || typeof nameError !== 'undefined'  || emailError !== "" || typeof emailError !== 'undefined') {
            console.log("submitted");
        }
        
    }

    render() {
        return (
            <div>
                <form action="" onSubmit={this.handleSubmit} noValidate>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} onBlur={this.onBlur} placeholder="bob" data-validation-type="name" required />
                        <p>{this.state.nameError}</p>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                         <input type="email" value={this.state.email} name="email" onChange={this.handleInputChange} onBlur={this.onBlur} placeholder="bob@bobsplace.com" data-validation-type="email" required />
                        <p>{this.state.emailError}</p>
                    </div>

                    <p>Recieve notifications by</p>

                    <label>
                        <input onChange={this.handleInputChange} name="notificationRadio" type="radio" value="email" />
                        Email
                    </label>

                    <label>
                        <input onChange={this.handleInputChange} name="notificationRadio" type="radio" value="text" />
                        Text
                    </label>

                    <button type="submit">Sumbit</button>

                    <table>
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <b>current state</b>
                                </td>
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