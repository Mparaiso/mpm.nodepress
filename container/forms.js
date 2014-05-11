"use strict";
var forms = exports;
var form = require('mpm.form').form;
var validation = require('mpm.form').validation;

forms.PostForm = function (postModel) {
    return form.createBuilder("post_form")
        .add('text', 'postTitle', {
            validators: [validation.Required(), validation.Length(3, 200)]})
        .add('textarea', 'postExcerpt', {attributes: {rows: 3},
            validators: validation.Required()})
        .add('textarea', 'postContent', {attributes: {rows: 10},
            validators: validation.Required()})
        .add('reset', 'reset', {attributes: {value: 'reset'}})
        .add('submit', 'create', {attributes: {value: 'create'}, validators: validation.Required()})
        .setModel(postModel);
};
