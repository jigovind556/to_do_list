

  function ValidateName(inputText, id) {
    let doc = document.getElementById(id);
    if (inputText.length > 0) {
      doc.style.boxShadow = "none";

      return true;
    } else {
      //   alert("Name can't be blank"); //The pop up alert for an invalid email address
      doc.focus();
      doc.style.boxShadow = "0 0 5px red";
      return false;
    }
  }

  function ValidateEmail(inputText, id) {
    // var mailformat = /^\w+([\.-]?\w+)*@nitkkr.ac.in/;
    var mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   console.log(inputText);
    //   if (inputText.match(mailformat)) {
    let doc = document.getElementById(id);
    if (mailformat.test(inputText)) {
      doc.style.boxShadow = "none";
      return true;
    } else {
      //   alert("Email is incorrect format!"); //The pop up alert for an invalid email address
      doc.focus();
      doc.style.boxShadow = "0 0 5px red";
      return false;
    }
  }

  function validatePassword(inputText, id) {
    let doc = document.getElementById(id);
    if (inputText.length > 6) {
      doc.style.boxShadow = "none";
      return true;
    } else {
      //   alert("password should be more than 6 characters"); //The pop up alert for an invalid email address
      doc.focus();
      doc.style.boxShadow = "0 0 5px red";
      return false;
    }
  }
  async function signup() {
    // Get input values from form fields and store them as variables
    let data = {
      name: document.getElementById("signName").value,
      email: document.getElementById("signEmail").value,
      password: document.getElementById("signPass").value,
    };
    if (
      ValidateName(data.name, "signName") &&
      ValidateEmail(data.email, "signEmail") &&
      validatePassword(data.password, "signPass")
    ) {
      let Server2 = server + "/signup";
      axios
        .post(Server2, data)
        .then((res) => {
          console.log(res.data);
          if (res.data == "sucess") {
            var userInfo = {
              id: data.email,
              name: data.name,
            };
            var date = new Date();
            date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
            document.cookie =
              `user=` +
              JSON.stringify(userInfo) +
              `; expires=` +
              date.toGMTString();
            alert("Account created successfully");
            props.setisLogin();
            navigate("/techspardha");
          } else {
            alert("User already exist ");
          }
        })
        .catch((err) => {
          alert(`Error creating account`);
          console.log(JSON.parse(res).message);
        });
    }

    // ***** this is a method to send data to server without axios *****//
    //     await fetch(server + "/signup", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ ...data }),
    //     }).then((response) => {
    //         console.log(response);
    //     }).then((responseData) => {
    //         console.log(responseData); // Process the response data
    //       })
    //       .catch((error) => {
    //         console.error(error); // Handle any errors that occur during the request
    //       });
  }

  async function login() {
    let data = {
      email: document.getElementById("logEmail").value,
      password: document.getElementById("logPass").value,
    };
    if (
      ValidateEmail(data.email, "logEmail") &&
      validatePassword(data.password, "logPass")
    ) {
      console.log(data);
      //   console.log(server);
      let Server2 = server + "/login";
      axios
        .post(Server2, data)
        .then((res) => {
          console.log(res.data);
          if (res.data.cat == "sucess") {
            if (res.data.role) {
              console.log("admin");
              var userInfo = {
                id: res.data.email,
                name: res.data.name,
                role: res.data.role,
              };
            } else {
              var userInfo = {
                id: res.data.email,
                name: res.data.name,
              };
            }
            var date = new Date();
            date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
            document.cookie =
              `user=` +
              JSON.stringify(userInfo) +
              `; expires=` +
              date.toGMTString();
            props.setLogin();
            navigate("/techspardha",{replace:true});
            // handleState();
            // alert("Login Successfully");
          } else if (res.data.cat == "invalidpass") {
            alert("Wrong Password ");
          } else {
            alert("User does not exist");
          }
        })
        .catch((err) => {
          alert(`Error creating account`);
          console.log(err);
        });
    }
  }