"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    userDetails: { type: Schema.Types.ObjectId, ref: 'UserDetails' },
});
var User = mongoose_1.default.model('User', userSchema);
exports.default = User;
