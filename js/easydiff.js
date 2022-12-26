// Global variables
var rows = 3;
var columns = 3;

var currTile;
var otherTile;

var turns = 0;

const resetButton = document.querySelector('#resetbutton');

// Load the image onto the board
function loadBoard() {
    // Iterate through the board which creates rows for images to be placed on
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
            let tile = document.createElement('img');
            tile.src = "./images/blank.jpg"

            // Drag functionality for board, allows dragging of the images
            tile.addEventListener("dragstart", dragStart); // Click on a image to drag
            tile.addEventListener("dragover", dragOver);   // When the image is dragged over
            tile.addEventListener("dragenter", dragEnter); // Drag the image into another image
            tile.addEventListener("dragleave", dragLeave); // Drag an image away from the other one
            tile.addEventListener("drop", dragDrop);       // Dropping an image into another one
            tile.addEventListener("dragend", dragEnd);     // After dragdrop is completed

            // Update board
            document.getElementById('board').append(tile);
        }
    }

    // Pieces
    let pieces = [];
    for(let i = 1; i <= rows*columns; i++) {
        pieces.push(i.toString()); // Iterates from 1 to total number of tiles calculated from rows * columns
    }

    // Shuffle the pieces array by using the Durstenfeld shuffle.
    for(let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        // Swap picked image with the current one
        let temp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = temp;
    }

    // Create pieces with the array numbers being the file name
    for(let i = 0; i < pieces.length; i++) {
        let tile = document.createElement('img');
        tile.src = "./images/" + pieces[i] + ".jpg"

        // Drag functionality for puzzle pieces, allows the pieces to be dragged onto the board.
        tile.addEventListener("dragstart", dragStart); // Click on a image to drag
        tile.addEventListener("dragover", dragOver);   // When the image is dragged over
        tile.addEventListener("dragenter", dragEnter); // Drag the image into another image
        tile.addEventListener("dragleave", dragLeave); // Drag an image away from the other one
        tile.addEventListener("drop", dragDrop);       // Dropping an image into another one
        tile.addEventListener("dragend", dragEnd);     // After dragdrop is completed

        // Update pieces board
        document.getElementById('pieces').append(tile)
    }
}

//DRAG TILES
function dragStart() {
    currTile = this; // this refers to image that was clicked on for dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; // this refers to image that is being dropped on
}
  
function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
  
    turns += 1;
    document.getElementById("turns").innerText = turns;
  
    checkIfWon();
    // Check if the user has won after each move
    if (checkIfWon()) {
        alert(`Congratulations! You have won the game! You completed the game in ${turns} turns!`);
    }
}

function checkIfWon() {
    // Get all the images on the board
    let boardImages = document.getElementById("board").getElementsByTagName("img");
  
    // Check if all the images on the board have the correct src
    for (let i = 0; i < boardImages.length; i++) {
        if (!boardImages[i].src.includes((i + 1).toString() + ".jpg")) {
            // If any image does not have the correct src, the user has not won yet
            return false;
        }
    }
  
    // If the loop finishes and all images have the correct src, the user has won
    return true;
}

// Function for the reset button
resetButton.addEventListener('click', function () {
    // Clear the board and pieces elements
    let board = document.getElementById("board");
    let pieces = document.getElementById("pieces");
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    while (pieces.firstChild) {
        pieces.removeChild(pieces.firstChild);
    }

    // Shuffle and re-load the puzzle pieces
    loadBoard();

    // Reset the turns counter
    turns = 0;
    document.getElementById("turns").innerText = turns;
});

loadBoard();