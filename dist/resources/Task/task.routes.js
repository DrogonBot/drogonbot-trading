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
const express = require("express");
const router = new express.Router();
const Task = require("./task.model");
const RouterHelper = require("../../utils/RouterHelper");
const LanguageHelper = require("../../utils/LanguageHelper");
const { userAuthMiddleware } = require("../../middlewares/auth.middleware");
/*#############################################################|
|  >>> PROTECTED ROUTES
*##############################################################*/
router.post("/tasks", userAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    try {
        const task = new Task(Object.assign(Object.assign({}, req.body), { owner: user._id //associate task with owner
         }));
        yield task.save();
        return res.status(201).send(task);
    }
    catch (error) {
        return res.status(400).send({
            status: "error",
            message: LanguageHelper.getLanguageString("task", "taskCreationError"),
            details: error.message
        });
    }
}));
router.patch("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = Object.keys(req.body);
    try {
        //validate for forbidden keys
        if (!RouterHelper.isAllowedKey(req.body, ["completed", "description"])) {
            return res.status(404).send({
                status: "error",
                message: LanguageHelper.getLanguageString("task", "taskPatchForbiddenKeys")
            });
        }
        const task = yield Task.findById(id);
        //update every key on the user object
        updates.forEach(update => {
            task[update] = req.body[update];
        });
        yield task.save();
        // const task = await Task.findByIdAndUpdate(id, req.body, {
        //   new: true, //return updated user
        //   runValidators: true //run our standard validators on update
        // });
        if (!task) {
            return res.status(404).send({
                status: "error",
                message: LanguageHelper.getLanguageString("task", "taskNotFound")
            });
        }
        return res.status(200).send(task);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
router.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task.find({});
    try {
        if (!tasks) {
            return res.status(404).send({
                status: "error",
                message: LanguageHelper.getLanguageString("task", "tasksNotFound")
            });
        }
        return res.status(200).send(tasks);
    }
    catch (error) {
        return res.status(500).send(error);
    }
    // Task.find({})
    //   .then(results => {
    //     if (!results) {
    //       return res.status(404).send({
    //         status: "error",
    //         message: "Tasks not found!"
    //       });
    //     }
    //     return res.status(200).send(results);
    //   })
    //   .catch(err => res.status(500).send());
}));
// number of complete tasks (promise chaining sample)
router.get("/tasks/completed", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task.find({ completed: true });
        if (!tasks) {
            return res.status(404).send({
                status: "error",
                message: LanguageHelper.getLanguageString("task", "taskNoCompletedTasksFound")
            });
        }
        const count = yield Task.countDocuments({ completed: true });
        return res.status(200).send({
            numberOfTasks: count,
            tasks: tasks
        });
    }
    catch (error) {
        return res.status(400).send(error);
    }
    // Task.find({ completed: true })
    //   .then(tasks => {
    //     if (!tasks) {
    //       return res.status(404).send({
    //         status: "error",
    //         message: "No tasks found"
    //       });
    //     }
    //     return Task.countDocuments({ completed: true });
    //   })
    //   .then(count => {
    //     return res.status(200).send({
    //       numberOfTasks: count
    //     });
    //   })
    //   .catch(err => {
    //     return res.status(400).send(err);
    //   });
}));
router.get("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield Task.findById(id);
        if (!task) {
            return res.status(404).send({
                status: "error",
                message: LanguageHelper.getLanguageString("task", "tasksNotFound")
            });
        }
        return res.status(200).send(task);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}));
router.delete("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(400).send({
                status: "error",
                message: LanguageHelper.getLanguageString("task", "taskDeleteNotFound")
            });
        }
        const count = yield Task.countDocuments({ completed: false });
        return res.status(200).send({
            status: "success",
            message: LanguageHelper.getLanguageString("task", "taskDeletedSuccessfully"),
            tasksLeft: count
        });
    }
    catch (error) {
        return res.status(400).send(error);
    }
}));
module.exports = router;
