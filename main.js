// let previousX = null;
// let previousY = null;

// document.addEventListener("mousemove", (e) => {
//   const currentX = e.pageX;
//   const currentY = e.pageY;

//   if (previousX !== null && previousY !== null) {
//     const diffX = currentX - previousX;
//     const diffY = currentY - previousY;
//     const distance = Math.sqrt(diffX * diffX + diffY * diffY);
//     if (distance > 20) {
//       createImage(e.pageX, e.pageY);
//     }
//   }
//   previousX = currentX;
//   previousY = currentY;
// });

// const imageArray = ["1.jpg", "2.jpg"];

// function createImage(x, y) {
//   setTimeout(() => {
//     const img = document.createElement("img");

//     const randomImage =
//       imageArray[Math.floor(Math.random() * imageArray.length)];
//     img.src = randomImage;

//     img.classList.add("image");

//     img.style.left = `${x + 20}px`;
//     img.style.top = `${y + 20}px`;
//     document.body.appendChild(img);

//     setTimeout(() => {
//       img.classList.add("fade-out");
//     }, 200);

//     setTimeout(() => {
//       img.remove();
//     }, 1100);
//   });
// }
let isImageDisplayed = false;
let imageIndex = 0;
const imageArray = [
  "1.jpg", // Replace with your image URLs
  "2.jpg",
  // Add more image URLs if needed
];

let lastMouseX = null;

// Track mouse movement and trigger the function
document.addEventListener("mousemove", function (e) {
  if (!isImageDisplayed) {
    // Detect the mouse movement direction

    const direction = getMouseDirection(e.pageX);

    // Show a new image, apply movement based on direction
    showNextImage(e.pageX, e.pageY, direction);
  }

  // Update the last mouse position after each move
  lastMouseX = e.pageX;
});

// Function to detect mouse movement direction
function getMouseDirection(currentX) {
  if (lastMouseX === null) return null; // First movement, no direction
  return currentX > lastMouseX ? "right" : "left"; // Compare with the last X position
}

// Function to display images one by one, with delay and fade-out effect
function showNextImage(x, y, direction) {
  isImageDisplayed = true; // Set flag to prevent another image being shown

  const img = document.createElement("img");
  img.src = imageArray[imageIndex]; // Select the next image from the array

  // Loop through images cyclically
  imageIndex = (imageIndex + 1) % imageArray.length;

  // Add the class and set its position
  img.classList.add("image");
  img.style.left = `${x}px`;
  img.style.top = `${y}px`;

  document.body.appendChild(img); // Append the image to the document

  // Apply a movement animation based on the mouse direction
  if (direction === "left") {
    img.style.transform = "translateX(-50px)"; // Move left
  } else if (direction === "right") {
    img.style.transform = "translateX(50px)"; // Move right
  }

  // After a short delay, fade out the image
  setTimeout(() => {
    img.classList.add("fade-out");
  }, 400); // Delay before fading starts (400ms)

  // Remove the image after 10 seconds (keep it on screen for 10s, then remove)
  setTimeout(() => {
    img.remove();
  }, 3000); // Keep the image visible for 10 seconds

  // Reset the flag so a new image can be displayed while the previous one is still visible
  setTimeout(() => {
    isImageDisplayed = false;
  }, 200); // Allow a new image to be shown after the fade-out starts
}
