module.exports = function(ObjectID) {
    'use strict';

    return [
        {
            __v: 3,
            _id: ObjectID("530133be230f86700600000e"),
            description: "Content type that describes a bumblebee client worker bee.",
            fields: [
                {
                    useAsLabel: true,
                    _id: "title",
                    validation: false,
                    type: "textbox",
                    options: false,
                    min: 1,
                    max: 1,
                    label: "Title",
                    required: true
                },
                {
                    useAsLabel: false,
                    _id: "repositoryurl",
                    validation: false,
                    type: "textbox",
                    options: false,
                    min: 1,
                    max: 1,
                    label: "Repository Url",
                    required: true
                },
                {
                    useAsLabel: false,
                    _id: "repositorybranch",
                    validation: false,
                    type: "textbox",
                    options: false,
                    min: 1,
                    max: 1,
                    label: "Repository Branch",
                    required: true
                },
                {
                    useAsLabel: false,
                    _id: "workerurl",
                    validation: false,
                    type: "textbox",
                    options: false,
                    min: 1,
                    max: 1,
                    label: "Worker Url",
                    required: true
                }
            ],
            label: "Worker Bee"
        }
    ];
};