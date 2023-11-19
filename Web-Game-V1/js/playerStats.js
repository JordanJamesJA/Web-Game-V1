function findPercentageScore() {
  const tableBody = document.querySelector("#showpercentage tbody");
  tableBody.innerHTML = ""; // Clear the table body

  const storedPlayerData = localStorage.getItem("PlayerRegistrationData");
  const playerData = JSON.parse(storedPlayerData) || [];

  // Iterate through the last player and calculate/display statistics
  playerData.slice(-1).forEach((player) => {
      const totalQuestions = player.correctAnswers + player.incorrectAnswers;
      const percentageScore = calculatePercentageScore(player);

      // Create table row
      const row = document.createElement("tr");

      // Create table cells for player statistics
      const playerCell = document.createElement("td");
      playerCell.textContent = `${player.FirstName} ${player.LastName}`;
      row.appendChild(playerCell);

      const dateCell = document.createElement("td");
      dateCell.textContent = player.date;
      row.appendChild(dateCell);

      const totalQuestionsCell = document.createElement("td");
      totalQuestionsCell.textContent = totalQuestions;
      row.appendChild(totalQuestionsCell);

      const correctAnswersCell = document.createElement("td");
      correctAnswersCell.textContent = player.correctAnswers;
      row.appendChild(correctAnswersCell);

      const percentageScoreCell = document.createElement("td");
      percentageScoreCell.textContent = `${percentageScore}%`;
      row.appendChild(percentageScoreCell);

      // Append table row to table body
      tableBody.appendChild(row);
  });
}

const end = document.getElementById("endButton");
end.addEventListener("click", function (event) {
  event.preventDefault();

  // Clear registration form inputs
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("age").value = "";
  document.getElementById("gender").value = "";

  // Enable form fields
  document.getElementById("fname").disabled = false;
  document.getElementById("lname").disabled = false;
  document.getElementById("dob").disabled = false;
  document.getElementById("age").disabled = false;
  document.getElementById("gender").disabled = false;

  // Show registrationContainer
  document.getElementById("registrationContainer").style.display = "block";

  //Enable registrationForm button
  document.querySelector("#registrationForm button").disabled = false;

  // Disable startButton and endButton
  document.getElementById("startButton").disabled = true;
  document.getElementById("endButton").disabled = true;

  // Hide startEndButtons
  document.getElementById("startEndButtons").style.display = "none";

  // Hide welcomeMessage
  document.getElementById("welcomeMessage").style.display = "none";

  // Disable and hide playAreaContainer
  document.getElementById("playAreaContainer").style.display = "none";
  document.getElementById("playArea").reset();
  document.getElementById("result").disabled = true;
  document.getElementById("randnum1").disabled = true;
  document.getElementById("randnum2").disabled = true;
  document.getElementById("check").disabled = true;
  document.getElementById("next").disabled = true;
  document.getElementById("accept").disabled = true;
  document.getElementById("ans").disabled = true;

  // Show resultsContainer
  document.getElementById("resultsContainer").style.display = "block";

  // Call findPercentageScore function
  findPercentageScore();
});

function updatePlayerStats() {
  const statsDisplay = document.getElementById("showpercentage");
  if (!statsDisplay) {
      console.error("Element with ID 'showpercentage' not found.");
      return;
  }

  // Check if statsDisplay has the 'value' property before setting it
  if ("value" in statsDisplay) {
      statsDisplay.value = ""; // Clear the textarea
  } else {
      console.error(
          "The 'value' property is not supported on the statsDisplay element."
      );
      return;
  }

  const storedPlayerData = localStorage.getItem("PlayerRegistrationData");
  const PlayerRegistrationData = JSON.parse(storedPlayerData) || [];

  PlayerRegistrationData.forEach((player) => {
      const percentageScore = calculatePercentageScore(player);
      statsDisplay.value += `${player.FirstName} ${player.LastName}: Correct Answers - ${player.correctAnswers}, Incorrect Answers - ${player.incorrectAnswers}, Percentage Score - ${percentageScore}%\n`;
  });
}
updatePlayerStats();

// Function to calculate the percentage score
function calculatePercentageScore(player) {
  const totalAnswers = player.correctAnswers + player.incorrectAnswers;
  if (totalAnswers === 0) {
      return 0; // Avoid division by zero
  }
  const percentageScore = (player.correctAnswers / totalAnswers) * 100;
  return percentageScore.toFixed(2); // Display percentage with two decimal places
}

document.addEventListener("DOMContentLoaded", findPercentageScore);
