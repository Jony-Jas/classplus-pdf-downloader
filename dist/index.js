"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const downloadhelper_1 = __importDefault(require("./utils/downloadhelper"));
const fetchData_1 = __importDefault(require("./utils/fetchData"));
const chalk_1 = __importDefault(require("chalk"));
const url = "https://api.classplusapp.com/v2/course/content/get?courseId=262732&folderId=12772636&storeContentEvent=false";
const token = "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMwMTU2NzcsIm9yZ0lkIjo0NDAzNDUsInR5cGUiOjEsIm1vYmlsZSI6IjkxODY2NzQ0ODM4MCIsIm5hbWUiOiJKb255IEphcyBKIiwiZW1haWwiOiJqb255amFzam9ueWphc0BnbWFpbC5jb20iLCJpc0ludGVybmF0aW9uYWwiOjAsImRlZmF1bHRMYW5ndWFnZSI6ImVuIiwiY291bnRyeUNvZGUiOiJJTiIsImNvdW50cnlJU08iOiI5MSIsInRpbWV6b25lIjoiR01UKzU6MzAiLCJpc0RpeSI6ZmFsc2UsImZpbmdlcnByaW50SWQiOiJhNzljNWU3OTM5MDU1YTI3NDEzMmU5MTU5MmM5ODA1ZSIsImlhdCI6MTY4NjY3ODI5NywiZXhwIjoxNjg3MjgzMDk3fQ.kFbcgCWnK4L0SDP0B4CDddmhfX9e3fs2KVqIeT32RUvJZF-bPK9lD2vxEi5Xzrk1";
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    try {
        data = yield (0, fetchData_1.default)(url, token);
    }
    catch (error) {
        console.log(chalk_1.default.red("\nSome Problem with the link Provided :("));
        return;
    }
    console.log("Total file to download: " + data.length);
    const processItems = (data) => __awaiter(void 0, void 0, void 0, function* () {
        for (const item of data) {
            console.log("\n" + item.name);
            const downloadPath = path_1.default.join(__dirname, "../downloads");
            yield (0, downloadhelper_1.default)(item.name, item.url, downloadPath);
        }
    });
    processItems(data);
});
main();
