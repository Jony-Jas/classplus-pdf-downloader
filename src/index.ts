import path from "path";
import download from "./utils/downloadhelper";
import fetchData from "./utils/fetchData";
import chalk from "chalk";

const url =
  "https://api.classplusapp.com/v2/course/content/get?courseId=262732&folderId=12772636&storeContentEvent=false";
const token =
  "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMwMTU2NzcsIm9yZ0lkIjo0NDAzNDUsInR5cGUiOjEsIm1vYmlsZSI6IjkxODY2NzQ0ODM4MCIsIm5hbWUiOiJKb255IEphcyBKIiwiZW1haWwiOiJqb255amFzam9ueWphc0BnbWFpbC5jb20iLCJpc0ludGVybmF0aW9uYWwiOjAsImRlZmF1bHRMYW5ndWFnZSI6ImVuIiwiY291bnRyeUNvZGUiOiJJTiIsImNvdW50cnlJU08iOiI5MSIsInRpbWV6b25lIjoiR01UKzU6MzAiLCJpc0RpeSI6ZmFsc2UsImZpbmdlcnByaW50SWQiOiJhNzljNWU3OTM5MDU1YTI3NDEzMmU5MTU5MmM5ODA1ZSIsImlhdCI6MTY4NjY3ODI5NywiZXhwIjoxNjg3MjgzMDk3fQ.kFbcgCWnK4L0SDP0B4CDddmhfX9e3fs2KVqIeT32RUvJZF-bPK9lD2vxEi5Xzrk1";

const main = async () => {
  let data: { name: string; url: string }[];
  try {
    data = await fetchData(url, token);
  } catch (error) {
    console.log(chalk.red("\nSome Problem with the link Provided :("));
    return;
  }

  console.log("Total file to download: " + data.length);

  const processItems = async (data: { name: string; url: string }[]) => {
    for (const item of data) {
      console.log("\n" + item.name);
      const downloadPath = path.join(__dirname, "../downloads");
      await download(item.name, item.url, downloadPath);
    }
  };

  processItems(data);
};

main();
