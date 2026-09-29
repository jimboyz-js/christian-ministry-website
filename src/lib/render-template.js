import fs from "fs";
import path from "path";
import handlebars from "handlebars";

const renderTemplate = async (templateName, data) => {
  const filepath = path.join(
    process.cwd(),
    "email-templates",
    `${templateName}.html`,
  );

  const source = fs.readFileSync(filepath, "utf-8");
  const template = handlebars.compile(source);

  return template(data);
};

export { renderTemplate };
