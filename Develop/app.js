const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

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
    choices: ["Manager", "Engineer", "Intern", "Complete"],
  },
];

function getEmployee(answers) {
  switch (answers.role) {
    case "Manager":
      {
        inquirer
          .prompt([
            {
              type: "input",
              name: "officeNumber",
              message: "What's your Manager's Office number? ",
            },
          ])
          .then((data) => {
            const newManager = new Manager(
              answers.name,
              answers.id,
              answers.email,
              data.officeNumber
            );
            employees.push(newManager);
            promptUser();
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
            const newEngineer = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              data.github
            );
            employees.push(newEngineer);
            promptUser();
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
            const newIntern = new Intern(
              answers.name,
              answers.id,
              answers.email,
              data.school
            );
            employees.push(newIntern);
            promptUser();
          });
      }
      break;

    case "Complete":
      {
        console.log(employees);
        renderHtml(employees);
      }
      break;
  }
}

function renderHtml(employees) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(employees), "utf-8");
}

function promptUser() {
  console.log("Welcome to Employee Summary Generator! ");

  inquirer
    .prompt(questions)
    .then((answers) => {
      getEmployee(answers);
    })

    .catch((error) => {
      console.log(error);
    });
}

promptUser();
