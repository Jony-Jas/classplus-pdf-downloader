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
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    const arg = process.argv;
    if (arg.length !== 6) {
        console.log(chalk_1.default.red("\nPlease provide the link and token :("));
        process.exit(1);
    }
    const url = arg[2];
    const token = arg[3];
    const start = +arg[4];
    const end = +arg[5];
    try {
        data = yield (0, fetchData_1.default)(url, token);
    }
    catch (error) {
        console.log(chalk_1.default.red("\nSome Problem with the link Provided :("));
        return;
    }
    console.log(chalk_1.default.bgWhite.black(` Total files to download: ${data.length} `));
    const processItems = (data) => __awaiter(void 0, void 0, void 0, function* () {
        for (let i = start - 1; i <= Math.min(end - 1, data.length - 1); i++) {
            const item = data[i];
            console.log(`\n (${i + 1}/${data.length}) - ${item.name}`);
            const downloadPath = path_1.default.join(__dirname, "../downloads");
            yield (0, downloadhelper_1.default)(item.name, item.url, downloadPath);
        }
    });
    processItems(data);
});
main();
