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
    choices: ["Manager", "Engineer", "Intern"],
  },
];

async function getEmployee(answers) {
   switch (answers.role) {
    case "Manager":
      {
        inquirer
          .prompt([{
            type: "input",
            name: "officeNumber",
            message: "What's your Manager's Office number? ",
          }])
          .then((data) => {
            console.log(data);
            const newManager = new Manager(
              answers.name,
              answers.id,
              answers.email,
              data.officeNumber
            );
            console.log(newManager);
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
            const newEngineer = new Engineer(
              answers.name,
              answers.id,
              answers.email,
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
            const newIntern = new Intern(
              answers.name,
              answers.id,
              answers.email,
              data.school
            );
            return newIntern;
          });
      }
      break;

    default: {
      console.log("something wrong here...");
    }
  }
}

function promptUser() {
  return inquirer.prompt(questions);
}

async function init() {
  console.log("Welcome to Employee Summary Generator! ");
  try {
    const answers = await promptUser();

    const employee = getEmployee(answers);
    console.log(employee);

    employees.push(employee);
    console.log(employees);

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(employees), "utf-8");

    console.log("Successful");
  } catch (err) {
    console.log(err);
  }
}

init();
