import { useState } from "react";

const FileTree = ({ tree, onSelectFile, activeFile }) => {
    const renderTree = (nodes) =>
        nodes.map((node) => (
            <div key={node.name} className="ml-2">
                {node.type === 'folder' ? (
                    <FolderNode node={node} />
                ) : (
                    <FileNode node={node} />
                )}
            </div>
        ))

    const FolderNode = ({ node }) => {
        const [isOpen, setIsOpen] = useState(true);
        return (
            <div>
                <div className="font-bold cursor-pointer flex items-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "📂" : "📁"} {node.name}
                </div>
                {
                    isOpen && node.children && (
                        <div className="ml-4">
                            {renderTree(node.children)}
                        </div>
                    )
                }
            </div>
        )
    }

    const FileNode = ({ node }) => (
        <div className={`cursor-pointer rounded p-1 ${activeFile?.name === node.name ? "bg-blue-300" : "hover:bg-gray-200"
            }`}
            onClick={() => onSelectFile(node)}
        >
            📄 {node.name}
        </div>
    )

    return (
        <div>
            {renderTree(tree)}
        </div>
    )
};

export default FileTree