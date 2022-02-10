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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const todo_model_1 = require("../models/todo.model");
const router = express_1.default.Router();
exports.router = router;
// Post API //
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const item = todo_model_1.Todo.set({ title, description });
    yield item.save();
    return res.status(200).json({
        data: item,
    });
}));
// Get API //
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield todo_model_1.Todo.find({});
        return res.status(200).json({
            data: items,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error,
        });
    }
}));
// Get single Item API //
router.get('/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield todo_model_1.Todo.findById(req.params._id);
        return res.status(200).json({
            data: items,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}));
// update items API //
router.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            title: req.body.title,
        };
        const update = {
            description: req.body.description,
        };
        const items = yield todo_model_1.Todo.updateOne(filter, update, {
            new: true
        });
        return res.status(200).json({
            data: items,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}));
// Delete items API // 
router.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            title: req.body.title,
        };
        const item = yield todo_model_1.Todo.deleteOne(filter).then((data) => res.json({
            data: "deleted successfully..!!"
        })).catch((e) => {
            console.log(e);
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}));
