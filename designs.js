//PROJECT INSTRUCTIONS:
// Select color input
// Select size input
// When size is submitted by the user, call makeGrid()


//Accessing <form> and selection the submit button
const inputs = document.getElementsByTagName('input');
let submit;
for (let i=0; i<inputs.length; i++){
  if (inputs[i].type.toLowerCase() === 'submit') {
    submit = inputs[i];
    break;
  };
}



// makeGrid() takes as arguments the height and width from the <form> to build
// the Canvas. I decided to return a <tbody> element so that I can assing the
// table to a variable I can manipulate. e.g: To delete the grid if there is a
// new submition with new dimentions (see submit event listener below).

function makeGrid(height, width) {
  const table = document.getElementById('pixelCanvas');
  const cell = '<td></td>';
  const newRow = function() {
    table.insertRow(-1);
  };

  for (let row = 0; row <= (height.value - 1); row++) {
    newRow();
    for (let i = 0; i <= (width.value - 1); i++) {
      table.rows[row].insertAdjacentHTML('afterbegin', cell);
    }
  }
  let tableBody = table.firstElementChild;
  return tableBody;
}


// The numberOfClicks will allow us to reset the canvas as shown in the
// condition used in the  "submit.addEventListener" below

let numberOfClicks = 0;
let tableBody;

submit.addEventListener('click', function(event) {
  numberOfClicks += 1;
  event.preventDefault();
  const gridHeight = document.getElementById('inputHeight');
  const gridWidth = document.getElementById('inputWidth');

  //This condition resets the table if there is more than one submition
  if (numberOfClicks === 1) {
    tableBody = makeGrid(gridHeight, gridWidth);
  } else {
    tableBody.remove()
    tableBody = makeGrid(gridHeight, gridWidth);
  }
});


const table = document.getElementById('pixelCanvas');

// Dalegating the 'coloring event' to the parent <table>, as opposed to
// assigning the eventListener to each individual grid square (<td>).

table.addEventListener('click', function(event) {
  // This ensures that we select a <td> from the desired table. Usefull if
  // this code is updated to have nested tables
  const td = event.target.closest('td');

  if (!td) return;
  if (!table.contains(td)) return;

  // if we in deed select a <td> from our desired table, then
  // we set the background color of each square (square = td)
  const color = document.getElementById('colorPicker');
  td.style.background = color.value;
});
