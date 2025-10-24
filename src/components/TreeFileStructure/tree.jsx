const initialTree = [
    {
        name: "src",
        type: "folder",
        children: [
            { name: "index.js", type: "file", content: "console.log('Hello');" },
            { name: "app.js", type: "file", content: "console.log('App');" }
        ]
    },
    {
        name: "README.md",
        type: "file",
        content: "# Project"
    }
];

export default initialTree