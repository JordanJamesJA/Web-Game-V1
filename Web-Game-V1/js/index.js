function playFunction() {
    var play = document.getElementById("playButton");

    alert("Register and click start!");
}

var userans;

//Task 1
//Function used to calculate age in form
function calculateAge() {
    //Getting the Date based on input by user
    var dobInput = document.getElementById("dob");
    var dobValue = dobInput.value;

    //Calculating Age
    var dobDate = new Date(dobValue);
    var today = new Date();
    var age = today.getFullYear() - dobDate.getFullYear();

    //Determining if birthday occured in current year to assist in calculation
    if (
        today.getMonth() < dobDate.getMonth() ||
        (today.getMonth() === dobDate.getMonth() &&
            today.getDate() < dobDate.getDate())
    ) {
        age--;
    }

    //Displaying Age
    var ageInput = document.getElementById("age");

    //Checking if age is between 8 and 12 inclusive
    var ageIsValid = age >= 8 && age <= 12;

    //Displaying error and take action age is not valid
    if (!ageIsValid) {
        ageInput.value = "Invalid Date of Birth";
        ageInput.style.color = "red";
    } else {
        ageInput.value = age;
        ageInput.style.color = "black";
    }
}

//Task 2
var PlayerRegistrationData = [];

function Register() {

    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const dob = document.getElementById("dob").value;
    const age = document.getElementById("age").value;

    const gender = document.getElementById("gender").value;

    if (!fname || !lname || !dob || !age || !gender) {
        alert("Complete all fields.");
        return false;
    }

    if (isNaN(age) || age < 8 || age > 12) {
        alert("Please enter valid date of birth.");
        return false;
    }

    const playerData = {
        FirstName: fname,
        LastName: lname,
        DateOfBirth: dob,
        Age: age,
        Gender: gender,
    };

    PlayerRegistrationData.push(playerData);

    localStorage.setItem("PlayerRegistrationData", JSON.stringify(PlayerRegistrationData));

    alert("Registration successful!");

    document.getElementById("startEndButtons").style.display = "block";
    document.getElementById("registrationContainer").style.display = "none";
    document.getElementById("welcomeMessage").style.display = "block";
    document.getElementById("welcomeMessage").innerText = "Welcome " + fname + " " + lname + "!";


    const inputFields = ["fname", "lname", "dob", "age", "gender"];
    inputFields.forEach((field) => {
        document.getElementById(field).value = "";
    });

    return true;
}

//Task 3
function registerAndDisableFields(event) {
    event.preventDefault();
    var registrationResult = Register();

    if (!registrationResult) {
        return false;
    }

    document.getElementById("fname").disabled = true;
    document.getElementById("lname").disabled = true;
    document.getElementById("dob").disabled = true;
    document.getElementById("age").disabled = true;
    document.getElementById("gender").disabled = true;
    document.querySelector("#registrationForm button").disabled = true;

    document.getElementById("startButton").disabled = false;
    document.getElementById("endButton").disabled = false;

    return registrationResult;
}
// Add event listener to the form element
const form = document.getElementById("registrationForm");
form.addEventListener("submit", registerAndDisableFields);


//Task 4
//should rename this to PlayGame()
function PlayGame(event) {
    event.preventDefault();
    // alert("Start button clicked! :)");

    // Clear fields
    document.getElementById("ans").value = "";
    document.getElementById("result").value = "";


    //enables the buttons in the play area
    document.getElementById("check").disabled = false;
    document.getElementById("next").disabled = false;
    document.getElementById("accept").disabled = false;
    document.getElementById("ans").disabled = false;

    //the 2 random numbers (1-9) & (1-5)
    let num1 = Math.floor(Math.random() * 9) + 1;
    let num2 = Math.floor(Math.random() * 5) + 1;

    //displays the two numbers in disabled fields
    document.getElementById("randnum1").value = num1;
    document.getElementById("randnum2").value = num2;
}

const start = document.getElementById("startButton");
start.addEventListener("click", PlayGame);

const next = document.getElementById("next");
next.addEventListener("click", PlayGame);

function checkAns(event) {
    event.preventDefault();
    userans = document.getElementById("ans").value;
    if (!userans) {
        alert("No answer was entered");
        return false;
    }

    let num1 = document.getElementById("randnum1").value;
    let num2 = document.getElementById("randnum2").value;

    correctans = num1 * num2;


    //check to see if the answer is correct
    if (userans == correctans) {
        return document.getElementById("result").value = "Correct!";
        //push the response to PlayerRegistrationData
    }
    else {
        return document.getElementById("result").value = "Incorrect!";
        //push the response to PlayerRegistrationData
    }

}
const check = document.getElementById("check");
check.addEventListener("click", checkAns);


// rename to findPercentageScore()
function endFunction() {
    alert("End button clicked! :)");
}
const end = document.getElementById("endButton");
end.addEventListener("click", endFunction);
