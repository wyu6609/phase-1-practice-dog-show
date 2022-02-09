document.addEventListener("DOMContentLoaded", () => {
  // global constants for
  const URI = "http://localhost:3000/dogs";
  const dogForm = document.getElementById("dog-form");
  const tableBody = document.getElementById("table-body");
  const dogName = document.getElementById("dog-name");
  const dogBreed = document.getElementById("dog-breed");
  const dogSex = document.getElementById("dog-sex");
  //fetch api data
  function fetchDogs() {
    fetch(URI)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:");
        //pass dog data to initialize function
        init(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  //initialize data

  function init(dogs) {
    //render each dog object to table row
    dogs.forEach((dog) => {
      renderDog(dog);
    });
  }
  //render Dog object
  function renderDog(dogObj) {
    //create table row for dog Object
    let dogRow = document.createElement("tr");
    let dogInfo = `
    <td>${dogObj.name}</td>
    <td>${dogObj.breed}</td>
    <td>${dogObj.sex}</td>
    <td><button id = ${dogObj.id}>Edit</button></td>`;
    dogRow.innerHTML = dogInfo;
    //add button functionality
    //append table row to table-body el
    tableBody.appendChild(dogRow);
    document.getElementById(dogObj.id).addEventListener("click", () => {
      editButton(dogObj);
    });
  }

  //editButton functionality
  function editButton(dogObj) {
    console.log(dogObj.id, dogName, dogObj.name);
    // take dogObj properties insert into input Text content
    dogName.setAttribute("value", dogObj.name);
    dogBreed.setAttribute("value", dogObj.breed);
    dogSex.setAttribute("value", dogObj.sex);
    //pass dog Obj ID to submit function
    let dogID = dogObj.id;
    submitButton(dogID);
  }
  //submit Button functionality
  function submitButton(dogID) {
    console.log(dogID);
    dogForm.addEventListener("submit", (event) => {
      event.preventDefault();
      //create new object, then POST
      let editedDogObj = {
        name: dogName.value,
        breed: dogBreed.value,
        sex: dogSex.value,
      };
      console.log(editedDogObj);
      patchEditedOBJ(editedDogObj, dogID);
    });
    //create newObj
  }

  //patch request
  function patchEditedOBJ(editedDogObj, dogID) {
    fetch(`${URI}/${dogID}`, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedDogObj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  // submit addEvent listener

  //fetch the api to start the web app
  fetchDogs();
});
