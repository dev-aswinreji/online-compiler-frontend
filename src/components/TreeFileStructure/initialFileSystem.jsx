export const InitialFileSystem = {
    name: 'root',
    type: 'folder',
    children: [
        {
            name: 'src',
            type: 'folder',
            children: [
                { name: 'index.js', type: 'file', content: 'console.log("Hello");' },
                { name: 'app.js', type: 'file', content: 'console.log("Hello")' }
            ]
        },
        {
            name:'Readme.md',
            type:'file',
            content:'#project info'
        }
    ]
}