
const FileTree = ({ tree, onSelectFile }) => {
    const renderTree = (nodes) =>
        nodes.map((node) => (
            <div key={node.name} className="ml-2">
                {node.type === 'folder' ? (
                    <div>
                        <span className="font-bold"> {node.name} </span>
                        <div className="ml-4"> {node.children && renderTree(node.children)} </div>
                    </div>
                ) : (
                    <div className="cursor-pointer hover:bg-gray-200 rounded p-1"
                        onClick={() => onSelectFile(node)}
                    >
                        {node.name}
                    </div>
                )}
            </div>
        ))
    return (
        <div>
            {renderTree(tree)}
        </div>
    )
};

export default FileTree