document.addEventListener('DOMContentLoaded', () => {
// Fetch the list of dogs from the API
fetch('http://localhost:3000/dogs')
.then(response => response.json())
.then(data => {
  // Call a function to populate the table with the dog data
  populateTable(data);
});
function populateTable(dogs) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    dogs.forEach(dog => {
      const row = document.createElement('tr');

      const imageCell = document.createElement('td');
      const image = document.createElement('img');
      image.src = dog.image; // Assuming you have an 'image' property in the dog object
      imageCell.appendChild(image);

      const nameCell = document.createElement('td');
      nameCell.textContent = dog.name;

      const breedCell = document.createElement('td');
      breedCell.textContent = dog.breed;

      const sexCell = document.createElement('td');
      sexCell.textContent = dog.sex;

      const editCell = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        populateForm(dog);
      });
      editCell.appendChild(editButton);

      row.appendChild(imageCell);
      row.appendChild(nameCell);
      row.appendChild(breedCell);
      row.appendChild(sexCell);
      row.appendChild(editCell);

      tableBody.appendChild(row);
    });
  }

  function populateForm(dog) {
    const form = document.getElementById('dog-form');
    form.elements.name.value = dog.name;
    form.elements.breed.value = dog.breed;
    form.elements.sex.value = dog.sex;
  }

  const form = document.getElementById('dog-form');
  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const dog = {
      name: formData.get('name'),
      breed: formData.get('breed'),
      sex: formData.get('sex')
    };

    const dogId = 1/* Get the dog ID from somewhere */;

    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dog)
    })
    .then(response => response.json())
    .then(updatedDog => {
      updateTable(updatedDog);
    });

    form.reset();
  });

  function updateTable(updatedDog) {
    const tableRows = document.querySelectorAll('#table-body tr');
    tableRows.forEach(row => {
      if (row.cells[1].textContent === updatedDog.name) {
        row.cells[2].textContent = updatedDog.breed;
        row.cells[3].textContent = updatedDog.sex;
      }
    });
  }
});
