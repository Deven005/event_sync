// Function to generate random light colors
const getRandomLightColor = () => {
  const colors = [
    "lightblue", // Light Blue
    "lightpink", // Light Pink
    "lightgreen", // Light Green
    "lightyellow", // Light Yellow
    "lightcyan", // Light Cyan
    "lavender", // Lavender
    "lightsalmon", // Light Salmon
    "lightseagreen", // Light Sea Green
    "lightgray", // Light Gray
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export { getRandomLightColor };
