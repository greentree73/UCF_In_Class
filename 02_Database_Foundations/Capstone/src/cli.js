import dotenv from "dotenv";
dotenv.config();
import inquirer from "inquirer";
import db from "./db.js";
import q from "./queries.js";

async function start() {
  const realms = (await db.query(q.listRealms)).rows;
  const realmChoice = await inquirer.prompt([
    {
      name: "realm",
      type: "rawlist",
      message: "Choose a realm for your quest:",
      choices: realms.map((r) => ({ name: r.name, value: r.id })),
    },
  ]);

  const selectedRealm = realms.find((r) => r.id === Number(realmChoice.realm));

  const characters = (await db.query(q.charactersByRealm, [realmChoice.realm]))
    .rows;
  const charChoice = await inquirer.prompt([
    {
      name: "char",
      type: "checkbox",
      message: "Select 1-3 characters for your quest:",
      choices: characters.map((c) => ({
        name: `${c.name} (${c.role})`,
        value: { id: c.id, name: c.name },
      })),
      validate: (a) => a.length > 0 || "Select at least one character",
    },
  ]);

  const items = (await db.query(q.listItems)).rows;

  const itemChoice = await inquirer.prompt([
    {
      name: "item",
      type: "rawlist",
      message: `Assign an item to ${charChoice.char
        .map((c) => c.name)
        .join(", ")}:`,
      choices: items.map((i) => ({
        name: `${i.name} (${i.type}, Power:${i.power})`,
        value: i.id,
      })),
    },
  ]);

  const selectedItem = items.find((i) => i.id === Number(itemChoice.item));

  const title = await inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "Enter a title for your quest: ",
    },
  ]);

  console.log("\n\nQuest Summary:");
  console.log(`Title: ${title.title}`);
  console.log(`Realm: ${selectedRealm.name}`);
  console.log(
    `Characters & Items: ${charChoice.char
      .map((c) => c.name)
      .join(", ")} with ${selectedItem.name}`
  );

  const questSummary = await inquirer.prompt([
    {
      name: "summary",
      type: "confirm",
      message: "Create this Quest?",
    },
  ]);
  if (questSummary.summary) {
    const newQuest = await db.query(q.addQuest, [
      title.title,
      realmChoice.realm,
    ]);
    for (const c of charChoice.char) {
      await db.query(q.addQuestAssignment, [
        newQuest.rows[0].id,
        c.id,
        itemChoice.item,
      ]);
    }
    console.log(`Quest created with ID: ${newQuest.rows[0].id}`);
  }
}

start();
