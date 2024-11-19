"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var userDetailsSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    interests: { type: Array, default: [] },
    visitingList: { type: Array, default: [] },
    gender: { type: String, default: null },
    socialMediaLinks: { platform: String, link: String, default: {} },
    languagesSpoken: { type: Array, default: [] },
    avatarUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});
var UserDetails = mongoose_1.default.model('UserDetails', userDetailsSchema);
exports.default = UserDetails;
