document.addEventListener("DOMContentLoaded", () => {
  const dogName = document.getElementById("dogName");
  const dogBreed = document.getElementById("dogBreed");
  const dogSex = document.getElementById("dogSex");
  const dogForm = document.getElementById("dog-form");
  const dogTable = document.getElementById("table-body");
  const URI = "http://localhost:3000/dogs";
  document.addEventListener("click", handleEvents);
  //fetch dog API
  function fetchDogs() {
    fetch(URI)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:");
        initializeData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  //initialize data
  function initializeData(dogs) {
    dogs.map((dog) => {
      renderTable(dog);
    });
  }
  //render table
  function renderTable(dogObj) {
    //creates table row for each dog Object
    let newRow = document.createElement("tr");
    let dogInfo = `
    <td data-id= ${dogObj.id} >${dogObj.name}</td>
    <td>${dogObj.breed}</td>
    <td>${dogObj.sex}</td>
    <td><button data-id = ${dogObj.id}>Edit</button></td>
    `;

    newRow.innerHTML = dogInfo;
    dogTable.appendChild(newRow);
  }

  function handleEvents(event) {
    event.preventDefault();
    console.log(event.target.dataset.id);
    if (event.target.id === "edit-btn") {
      editButtonFunctionality(event.target.dataset.id);
    } else if (event.target.id === "dog-form") {
      submitButtonFunctionality(event);
    }
  }
  //patch request onto
  function editButtonFunctionality(id) {
    fetch(`${BASE_URL}/${id}`)
      .then((res) => res.json())
      .then((dog) => {
        (dogForm.name.value = dog.name),
          (dogForm.sex.value = dog.sex),
          (dogForm.breed.value = dog.breed),
          (dogForm.dataset.id = dog.id);
      });
  }
  function submitButtonFunctionality(event) {
    let dog = {
      name: event.target.parentElement.name.value,
      sex: event.target.parentElement.sex.value,
      breed: event.target.parentElement.breed.value,
    };

    fetch(`${BASE_URL}/${event.target.parentElement.dataset.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify(dog),
    })
      .then((res) => res.json())
      .then((dog) => {
        let foundDog = document.querySelector(`tr[data-id="${dog.id}"]`);
        foundDog.children[0].innerText = dog.name;
        foundDog.children[1].innerText = dog.breed;
        foundDog.children[2].innerText = dog.sex;
      });
  }
  // editButton

  fetchDogs();
});
