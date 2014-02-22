module.exports = function(ObjectID) {
    'use strict';

    return [
        {
            __v: 7,
            _id: ObjectID("530133be230f86700600000e"),
            description: "Content type that describes a bumblebee client worker bee.",
            fields: [
                {
                    useAsLabel: true,
                    _id: "identifier",
                    validation: false,
                    type: "textbox",
                    options: false,
                    min: 1,
                    max: 1,
                    label: "Identifier",
                    required: true
                },
                {
                    useAsLabel: false,
                    _id: "description",
                    validation: false,
                    type: "textarea",
                    options: false,
                    min: 1,
                    max: 1,
                    label: "Description",
                    required: true
                },
                {
                    useAsLabel: false,
                    _id: "url",
                    validation: false,
                    type: "textbox",
                    options: false,
                    min: 1,
                    max: 1,
                    label: "Url",
                    required: true
                },
                {
                    useAsLabel: false,
                    _id: "repositories",
                    validation: false,
                    type: "embeddedtype",
                    options: "5307faca230f86700600000f",
                    min: 1,
                    max: 975,
                    label: "Repositories",
                    required: false
                },
                {
                    useAsLabel: false,
                    _id: "logs",
                    validation: false,
                    type: "readonly",
                    options: false,
                    min: 1,
                    max: 1000000000000,
                    label: "Logs",
                    required: false
                }
            ],
            label: "Worker Bee"
        },
        {
            __v: 5,
            _id: ObjectID("5307faca230f86700600000f"),
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
                    _id: "branch",
                    validation: false,
                    type: "textbox",
                    options: false,
                    min: 1,
                    max: 1,
                    label: "Branch",
                    required: true
                },
                {
                    useAsLabel: false,
                    _id: "deploymentdestination",
                    validation: false,
                    type: "textbox",
                    options: false,
                    min: 1,
                    max: 1,
                    label: "Deployment Destination",
                    required: false
                }
            ],
            label: "Repos"
        }
    ];
};