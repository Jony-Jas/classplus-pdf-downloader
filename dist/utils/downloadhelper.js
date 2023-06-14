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
const node_downloader_helper_1 = require("node-downloader-helper");
const ProgressBar_1 = __importDefault(require("./ProgressBar"));
const chalk_1 = __importDefault(require("chalk"));
const download = (name, url, downloadPath) => __awaiter(void 0, void 0, void 0, function* () {
    name = /\.pdf$/i.test(name) ? name : name + ".pdf";
    const Bar = new ProgressBar_1.default();
    const dl = new node_downloader_helper_1.DownloaderHelper(url, downloadPath, {
        fileName: name,
    });
    try {
        const { total } = yield dl.getTotalSize();
        Bar.init(total);
    }
    catch (error) {
        console.log(chalk_1.default.red("\nDownload Failed :("));
        return;
    }
    dl.on("end", () => console.log(chalk_1.default.green("\nDownload Completed")));
    dl.on("skip", () => console.log(chalk_1.default.yellow("\nDownload Skipped")));
    dl.on("progress", (stats) => {
        Bar.update(stats.downloaded);
    });
    yield dl.start().catch(() => {
        console.log(chalk_1.default.red("\nDownload Failed :("));
        return;
    });
});
exports.default = download;
