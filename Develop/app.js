const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const managerNum = 0;
const engineerNum = 0;
const internNum = 0;

let employees = [];

const questions = [
  {
    type: "input",
    name: "name",
    message: "What's your team member's name? ",
  },
  {
    type: "input",
    name: "id",
    message: "What's your team member's ID number? ",
  },
  {
    type: "input",
    name: "email",
    message: "What's your team member's Email? ",
  },
  {
    type: "list",
    name: "role",
    message: "Which team member do you want to add? ",
    choices: ["Manager", "Engineer", "Intern"],
  },
];

const teamQuestion = {
  type: "list",
  name: "role",
  message: "Which team member do you want to add? ",
  choices: ["Engineer", "Intern"],
};

const finalQuestion = {
  type: "list",
  name: "role",
  message: "Which team member do you want to add? ",
  choices: ["Engineer", "Intern", "Finish"],
};

function getEmployee(answers) {
  switch (answers.role) {

    case "Manager":
      {
        inquirer
          .prompt({
            type: "input",
            name: "officeNumber",
            message: "What's your Manager's Office number? ",
          })
          .then((data) => {
            managerNum++;
            const newManager = new Manager(
              answers.name,
              answers.id,
              answers.email,
              answers.role,
              data.officeNumber
            );
            return newManager;
          });
      }
      break;

    case "Engineer":
      {
        inquirer
          .prompt({
            type: "input",
            name: "github",
            message: "What's your Engineer's GitHub username? ",
          })
          .then((data) => {
            engineerNum++;
            const newEngineer = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              answers.role,
              data.github
            );
            return newEngineer;
          });
      }
      break;

    case "Intern":
      {
        inquirer
          .prompt({
            type: "input",
            name: "school",
            message: "What's your Intern's school? ",
          })
          .then((data) => {
            internNum++;
            const newIntern = new Intern(
              answers.name,
              answers.id,
              answers.email,
              answers.role,
              data.school
            );
            return newIntern;
          });
      }
      break;

    case "Finish":
      {
        inquirer.prompt({
          type: "confirm",
          name: "finish",
          message: "Do you want to finish now? ",
        }).then(() => {
          //call end function
        })
      }
      break;

    default: {
      console.log("something wrong here...");
    }
  }
}

function promptUser(questions) {
  return inquirer.prompt(questions);
}


async function init() {
  console.log("Welcome to Employee Summary Generator! ");
  try {
    const answers = await promptUser();


    if (managerNum ==1) {
      questions[3] = teamQuestion;
    }

    if (managerNum == 1 && engineerNum >= 2 && internNum != 0) {
      questions[3] = finalQuestion;
        
    }
    else{

    const employee = await getEmployee(answers);

    employees.push(employee);
    }


    const team = render(employees);




    console.log("Successful");
  } catch (err) {
    console.log(err);
  }
}


init();
// After the user has input all employees desired,
// call the `render` function (required
// above) and pass in an array containing
// all employee objects; the `render` function will
// generate and return a block of HTML including
// templated divs for each employee!
//
// After you have your html, you're now ready to
// create an HTML file using the HTML
// returned from the `render` function.
// Now write it to a file named `team.html` in the
// `output` folder. You can use the variable
// `outputPath` above target this location.
//
// Hint: you may need to check if the `output`
// folder exists and create it if it
// does not.
//
// HINT: each employee type (manager, engineer,
// or intern) has slightly different
// information; write your code to ask
// different questions via inquirer depending on
// employee type.
//
// HINT: make sure to build out your classes first!
// Remember that your Manager, Engineer,
// and Intern classes should all extend
// from a class named Employee; see the directions
// for further information. Be sure to test out
// each class and verify it generates an
// object with the correct structure and methods.
// This structure will be crucial in order
// for the provided `render` function to work!```
