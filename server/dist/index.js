"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MovieRoutes_1 = __importDefault(require("./routes/MovieRoutes"));
const UploadRoute_1 = __importDefault(require("./routes/UploadRoute"));
const app = express_1.default();
app.use("/upload", express_1.default.static("public/upload"));
app.use(express_1.default.json());
app.use("/api/movie", MovieRoutes_1.default);
app.use("/upload", UploadRoute_1.default);
app.listen(3000);
