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
        this.clusterId = opts === null || opts === void 0 ? void 0 : opts.clusterId;
    }
    info(input, type = "INFO") {
        if (type === "BLANK") {
            return this.log(chalk_1.default.hidden("-"));
        }
        if (type === "CLSTR" || type === "CLUSTER") {
            return this.log(chalk_1.default.blue(this._prefix() + "[INFO]" + (type ? "[" + type + "]" : "")) + ": " + input);
        }
        if (type === "SHARD" || type === "SHARD") {
            return this.log(chalk_1.default.greenBright(this._prefix() + "[INFO]" + (type ? "[" + type + "]" : "")) + ": " + input);
        }
        if (type === "DATA") {
            return this.log(chalk_1.default.redBright(this._prefix() + "[INFO]" + (type ? "[" + type + "]" : "")) + ": " + input);
        }
        if (type === "MDULE" || type === "MDUL" || type === "MODULE") {
            return this.log(chalk_1.default.magenta(this._prefix() + "[INFO]" + (type ? "[" + type + "]" : "")) + ": " + input);
        }
        if (type === "MASTER") {
            return this.log(chalk_1.default.bold.yellow(this._prefix() + (type ? "[" + type + "]" : "")) + ": " + input);
        }
        const mess = chalk_1.default.cyan(this._prefix() + "[INFO]" + (type ? "[" + type + "]" : "")) + ": " + input;
        super.log(mess);
    }
    error(input, type) {
        const mess = chalk_1.default.bold.bgRedBright(this._prefix() + "[ERRO]" + (type ? "[" + type + "]" : "")) + ": " + input;
        super.error(mess);
    }
    warn(input, type) {
        const mess = chalk_1.default.bold.bgYellow(this._prefix() + "[WARN]" + (type ? "[" + type + "]" : "")) + ": " + input;
        super.warn(mess);
    }
    debug(message) {
        const mess = chalk_1.default.bgMagenta(this._prefix() + "[DEBG]") + ": " + message;
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
    _prefix() {
        return chalk_1.default.gray(`[Cluster #${this.clusterId || 0}][Shard #${this.shardId || 0}]`);
    }
    setClusterId(id) {
        this.clusterId = id;
        return this;
    }
    setShardId(id) {
        this.shardId = id;
        return this;
    }
}
exports.default = Logger;
