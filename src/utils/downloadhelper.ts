import { DownloaderHelper } from "node-downloader-helper";
import ProgressBar from "./ProgressBar";
import chalk from "chalk";

const download = async (name: string, url: string, downloadPath: string) => {

  name = /\.pdf$/i.test(name) ? name : name + ".pdf";

  const Bar = new ProgressBar();
  const dl = new DownloaderHelper(url, downloadPath,{
    fileName: name,
  });

  try {
    const { total } = await dl.getTotalSize();
    Bar.init(total!);
  } catch (error) {
    console.log(chalk.red("\nDownload Failed :("));
    return;
  }

  dl.on("end", () => console.log(chalk.green("\nDownload Completed")));
  dl.on("skip", () => console.log(chalk.yellow("\nDownload Skipped")));
  dl.on("progress", (stats) => {
    Bar.update(stats.downloaded);
  });

  await dl.start().catch(() => {
    console.log(chalk.red("\nDownload Failed :("));
    return;
  });
};

export default download;
