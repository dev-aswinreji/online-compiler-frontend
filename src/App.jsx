import { useState } from 'react';
import MonacoVimEditor from './components/Editor/monacoVimEditor.jsx';
function App() {
  const [code, setCode] = useState("console.log('Hello Vim + Monaco!');");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/execute", {
        code,
        language,
      });
      setOutput(res.data.output);
    } catch (error) {
      setOutput("Error connecting to server");
    }
  };

  return (
    <div className="p-4 space-y-4 h-screen flex flex-col">
      <div className="flex justify-between items-center">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded p-1"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
        <button
          onClick={runCode}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Run
        </button>
      </div>

      <div className="flex flex-1 gap-4">
        <div className="w-1/4 bg-gray-100 p-2 overflow-auto">
          {/* your FileTree component */}
        </div>

        <div className="flex-1 border rounded">
          <MonacoVimEditor code={code} setCode={setCode} language={language} />
        </div>

        <div className="w-1/3 space-y-4">
          {/* Terminal and Preview */}
        </div>
      </div>
    </div>
  );
}

export default App;
