const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
// Write code to use inquirer to gather information about
// the development team members
// and to create objects for each team member
// using the correct classes as blueprints
inquirer
  .prompt([
    {
      type: "input",
      name: "ID",
      message: "What's your team member's ID number? ",
    },
    {
      type: "input",
      name: "Email",
      message: "What's your team member's Email? ",
    },
    {
      type: "list",
      name: "Role",
      message: "Which team member do you want to add? ",
      choices: ["Manager", "Engineer", "Intern"],
    },
  ])
  .then((answers) => {
    switch (answers.Role) {
      case "Manager": {
        inquirer
          .prompt({
            type: "input",
            name: "Office number",
            message: "What's your Manager's Office number? ",
          })
          .then((officeNum) => {
            return officeNum;
          });
        const newManager = new Manager(
          answers.ID,
          answers.Email,
          answers.Role,
          officeNum
        );
        console.log(newManager);
        return newManager;
      }
      case "Engineer": {
        inquirer
          .prompt({
            type: "input",
            name: "Github",
            message: "What's your Engineer's GitHub username? ",
          })
          .then((userNam) => {
            return userNam;
          });
        const newEngineer = new Engineer(
          answers.ID,
          answers.Email,
          answers.Role,
          userNam
        );
        console.log(newEngineer);
        return newEngineer;
      }
      case "Intern": {
        inquirer
          .prompt({
            type: "input",
            name: "School",
            message: "What's your Intern's school? ",
          })
          .then((school) => {
            return school;
          });
        const newIntern = new Intern(
          answers.ID,
          answers.Email,
          answers.Role,
          school
        );
        console.log(newIntern);
        return newIntern;
      }
      //default switch case?
    }
    const employees = [newManager, newEngineer, newIntern];
    render(employees);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });

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
