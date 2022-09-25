"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const chalk_1 = __importDefault(require("chalk"));
class Logger extends console_1.Console {
    constructor(opts) {
        super(process.stdout, process.stderr);
        this.shardId = opts === null || opts === void 0 ? void 0 : opts.shardId;
    }
    info(input, type = "INFO") {
        if (type === "BLANK") {
            return this.log(chalk_1.default.hidden("-"));
        }
        const mess = chalk_1.default.cyan(`[#${this.shardId || 0}]` + "[INFO]" + (type ? "[" + type + "]" : "")) + ": " + input;
        super.log(mess);
    }
    error(input, type) {
        const mess = chalk_1.default.bold.redBright("[ERRO]" + (type ? "[" + type + "]" : "")) + ": " + input;
        super.error(mess);
    }
    warn(input, type) {
        const mess = chalk_1.default.bold.yellow("[WARN]" + (type ? "[" + type + "]" : "")) + ": " + input;
        super.warn(mess);
    }
    debug(message) {
        const mess = chalk_1.default.magenta("[DEBG]") + ": " + message;
        super.log(mess);
    }
    date(msTimeStamp = new Date().getTime()) {
        const date = new Date(msTimeStamp);
        let minutes = `${date.getMinutes()}`;
        if (minutes.length === 1)
            minutes = `0${minutes}`;
        let seconds = `${date.getSeconds()}`;
        if (seconds.length === 1)
            seconds = `0${seconds}`;
        return `[ ${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} - ${date.getHours()}:${minutes}:${seconds} ]`;
    }
}
exports.default = Logger;
