#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const init = () => {
  console.log(
    chalk.red(
      figlet.textSync("Igor Yermak ", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
};

const askQuestions = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message: "What is the name of the file without extension?"
    },
    {
      type: "list",
      name: "EXTENSION",
      message: "What is the file extension?",
      choices: [".rb", ".js", ".php", ".css"],
      filter: function(val) {
        return val.split(".")[1];
      }
    }
  ];
  return inquirer.prompt(questions);
};

const createFile = (filename, extension) => {
  const filePath = `${process.cwd()}/${filename}.${extension}`;
  shell.touch(filePath);
  return filePath;
};

const deleteFile = (filename, extension) => {
  const filePath = `${process.cwd()}/${filename}.${extension}`;
  shell.rm*(filePath);
  return console.log(chalk.white.bgGreen.bold(`Done ${filename}successfully deleted`));
};

const success = filepath => {
  console.log(chalk.white.bgGreen.bold(`Done! File created at ${filepath}`));
};

const run = async () => {
  init();

  const answers = await askQuestions();
  const { FILENAME, EXTENSION } = answers;

  const filePath = createFile(FILENAME, EXTENSION);

  success(filePath);
};

run();
