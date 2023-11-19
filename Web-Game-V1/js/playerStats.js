function findPercentageScore() {
    const statsDisplay = document.getElementById("showpercentage");
    statsDisplay.value = ""; // Clear the textarea

    // Iterate through players and calculate/display statistics
    PlayerRegistrationData.forEach((player) => {
        const totalQuestions = player.correctAnswers + player.incorrectAnswers;
        const percentageScore = calculatePercentageScore(player);

        // Display player statistics in the 'showpercentage' area
        statsDisplay.value += `Player: ${player.FirstName} ${player.LastName}\n`;
        statsDisplay.value += `Date: ${getCurrentDate()}\n`;
        statsDisplay.value += `Total Questions: ${totalQuestions}\n`;
        statsDisplay.value += `Correct Answers: ${player.correctAnswers}\n`;
        statsDisplay.value += `Percentage Score: ${percentageScore}%\n\n`;
    });
}

document.addEventListener("DOMContentLoaded", function () {
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
});

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

