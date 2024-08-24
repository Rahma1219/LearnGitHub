import Confetti from 'react-confetti'
import { useEffect, useState } from 'react';
import './App.css'
import * as yup from "yup"



function App() {

  const [Arrayoferrors, setArrayOfErrors] = useState({})


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    QueryType: "",
    ruleAccepted: false,
  })

  const userSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required(),
    QueryType: yup.string().oneOf(["General Enquiry", "Suport Request"]),
    ruleAccepted: yup.boolean(),
  })

  async function testvalidation() {
    try {
      const response = await userSchema.validate(formData, { abortEarly: false });
      // console.log(response, "is valid object")
    } catch (error) {
      var errors = {};
      error.inner.forEach((error) => {
        console.log(`${error.path} : ${error.message}`);
        errors[error.path] = error.message
      })
      setArrayOfErrors(errors);
      console.log(errors)
    }
  }



  function handleOnFormSubmit(event) {

    testvalidation();
    event.preventDefault();
    // console.log('Form data submitted:', formData);
    // setFormSubmitted(true);
  }

  function handleOnChange(event) {
    let keyValue = event.target.value;
    const keyName = event.target.name;
    const type = event.target.type;

    if (type == "checkbox") {
      keyValue = event.target.checked;
    }

    setFormData({
      ...formData,
      [keyName]: keyValue

    })

  }


  // const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <>

      {/* {formSubmitted ? (
        <div id='sm'>
          <div className="successmessage">
            <div id='sent'>
              {/* <Confetti
                 id='Confetti'
                 /> 
              <span>  <img src={sucesscheck} alt="" /> </span>

              <span >Message Sent!</span>


            </div>

            <p id='text'>Thanks for completing the form. We'll be in touch soon!</p>

          </div>

        </div>


      ) : null} */}


      <div className='contact'>

        <h1 id='heading'>Contact Us</h1>

        <form onSubmit={handleOnFormSubmit}>

          <div id='input1'>
            <div>
              <p><label htmlFor='firstName'> First Name <span id='star'>*</span></label>
              </p>
              <input
                type="text"
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleOnChange}
              />

              {Arrayoferrors.firstName ? <p id='warningmessage'>This field is required </p> : null}
            </div>

            <div>
              <p><label htmlFor='lastName' > Last Name <span id='star'>*</span></label></p>
              <input type="text"
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleOnChange} />
              {Arrayoferrors.lastName ? <p id='warningmessage'>This field is required </p> : null}

            </div>

          </div>

          <div id='input2'>
            <div>
              <p><label htmlFor='email' >Email Adress <span id='star'>*</span> </label></p>
              <input type="email"
                id='email'
                name='email'
                value={formData.email}
                onChange={handleOnChange} />
              {Arrayoferrors.email ? <p id='warningmessage'>please enter avalid email adress</p> : null}

            </div>

          </div>

          <div id='input3'>
            <div id='input32'>
              <p><label > Query Type <span id='star'>*</span> </label></p>
              <div id='checks'>
                <div id='check'>
                  <input
                    type="radio"
                    id="GeneralEnquiry"
                    name='QueryType'
                    value="General Enquiry"
                    onChange={handleOnChange}
                  ></input>
                  <label htmlFor='GeneralEnquiry' >General Enquiry</label>

                </div>

                <div id='check'>
                  <input type="radio"
                    id="SuportRequest"
                    name='QueryType'
                    onChange={handleOnChange}
                    value="Suport Request"
                  ></input>
                  <label htmlFor='SuportRequest'>Suport Request</label>
                </div>
              </div>
              {Arrayoferrors.QueryType ? <p id='warningmessage'>please select a query type</p> : null}

            </div>

          </div>

          <div id='textarea'>
            <div>
              <p><label htmlfor='message'>Message <span id='star'>*</span> </label></p>
              <textarea
              id='message'
                name="message"
                value={formData.message}
                onChange={handleOnChange}
              ></textarea>
            </div>
            {Arrayoferrors.message ? <p id='warningmessage'>This field is required </p> : null}
          </div>



          <div id='check2'>
            <input
              className='check'
              required
              type="checkbox"

              onChange={handleOnChange}
              name='ruleAccepted'
              checked={formData.ruleAccepted}

            ></input>
            <span class="checkmark"></span>
            <label > I consent to being contacted by the team <span id='star'>*</span></label>

            {Arrayoferrors.ruleAccepted ? <p id='warningmessage'>To submit this form,please consent to being contacted </p> : null}

          </div>


          <div id='btn'>
            <button type="submit" disabled={formData.ruleAccepted ? false : true}
            >Submit</button>
          </div>

        </form>




      </div>
    </>
  )
}

export default App
