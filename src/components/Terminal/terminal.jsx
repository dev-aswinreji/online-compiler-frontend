
const Terminal = ({ output }) => {
    return (
        <div className="bg-black text-green-400 font-mono p-4 h-40 overflow-y-auto rounded-md">
            {output.split('\n').map((line, index) => (
                <div key={index}> {line} </div>
            ))}
        </div>
    )
}

export default Terminal