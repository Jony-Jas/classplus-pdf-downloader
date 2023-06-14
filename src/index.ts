import path from "path";
import download from "./utils/downloadhelper";
import fetchData from "./utils/fetchData";
import chalk from "chalk";

const main = async () => {
  let data: { name: string; url: string }[];

  const arg = process.argv;
  if (arg.length !== 6) {
    console.log(chalk.red("\nPlease provide the link and token :("));
    process.exit(1);
  }

  const url = arg[2];
  const token = arg[3];
  const start = +arg[4];
  const end = +arg[5];

  try {
    data = await fetchData(url, token);
  } catch (error) {
    console.log(chalk.red("\nSome Problem with the link Provided :("));
    return;
  }

  console.log(chalk.bgWhite.black(` Total files to download: ${data.length} `));

  const processItems = async (data: { name: string; url: string }[]) => {
    for (let i = start-1; i <= Math.min(end-1,data.length-1); i++) {
      const item = data[i];
      console.log(`\n (${i + 1}/${data.length}) - ${item.name}`);
      const downloadPath = path.join(__dirname, "../downloads");
      await download(item.name, item.url, downloadPath);
    }
  };

  processItems(data);
};

main();
