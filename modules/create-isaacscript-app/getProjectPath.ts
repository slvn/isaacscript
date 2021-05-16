import chalk from "chalk";
import path from "path";
import prompts from "prompts";
import { CURRENT_DIRECTORY_NAME, CWD } from "../common/constants";
import { ILLEGAL_CHARACTERS_FOR_WINDOWS_FILENAMES } from "./constants";

export default async function getProjectPath(
  argv: Record<string, unknown>,
): Promise<[string, boolean]> {
  let projectName = getProjectNameFromCommandLineArgument(argv);

  let projectPath: string;
  let createNewDir: boolean;
  if (argv.useCurrentDir) {
    // The "--use-current-dir" command-line flag was specified,
    // so there is no need to prompt the user
    [projectName, projectPath, createNewDir] = [
      CURRENT_DIRECTORY_NAME,
      CWD,
      false,
    ];
  } else if (projectName !== null) {
    // The project name was specified on the command-line
    projectPath = path.join(CWD, projectName);
    createNewDir = true;
  } else {
    // The project name was not specified on the command-line, so prompt the user for it
    [projectName, projectPath, createNewDir] = await getNewProjectName();
  }

  if (!validateProjectName(projectName)) {
    process.exit(1);
  }

  console.log(`Using a project name of: ${chalk.green(projectName)}`);
  return [projectPath, createNewDir];
}

function getProjectNameFromCommandLineArgument(
  argv: Record<string, unknown>,
): string | null {
  const args = argv._ as string[];
  // Assume that the first command-line argument is the project name
  // Ignore all other command-line arguments
  return args.length === 0 ? null : args[0];
}

async function getNewProjectName(): Promise<[string, string, boolean]> {
  console.log("You did not specify a project name as a command-line argument.");
  const response1 = await prompts({
    type: "confirm",
    name: "useCurrentDir",
    message: `Would you like to create a new project using the current directory "${chalk.green(
      CURRENT_DIRECTORY_NAME,
    )}" as the root?`,
    initial: true,
  });

  if (response1.useCurrentDir === true) {
    return [CURRENT_DIRECTORY_NAME, CWD, false];
  }

  const response2 = await prompts({
    type: "text",
    name: "projectName",
    message: "Enter the name of the project:",
  });

  if (typeof response2.projectName !== "string") {
    console.error("Error: The response was not a string.");
    process.exit(1);
  }
  const projectName = response2.projectName;
  const projectPath = path.join(CWD, projectName);

  return [projectPath, projectName, true];
}

function validateProjectName(projectName: string) {
  if (projectName === "") {
    console.error("Error: You cannot have a blank project name.");
    return false;
  }

  for (const character of ILLEGAL_CHARACTERS_FOR_WINDOWS_FILENAMES) {
    if (projectName.includes(character)) {
      console.error(
        `Error: The "${character}" character is not allowed in a Windows file name.`,
      );
      return false;
    }
  }

  return true;
}
