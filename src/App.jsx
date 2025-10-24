import { useState } from 'react'
import './App.css'
import axios from 'axios';
import Terminal from './components/Terminal/terminal';
import Preview from './components/Preview/preview';
import EditorMonaco from './components/Editor/editor';
import initialTree from './components/TreeFileStructure/tree';
import FileTree from './components/TreeFileStructure/fileTree';
import { InitialFileSystem } from './components/TreeFileStructure/initialFileSystem';

function App() {
  const [code, setCode] = useState("console.log('Hello World');");
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript')

  const [tree, setTree] = useState(initialTree)
  const [activeFile, setActiveFile] = useState(null)

  const handleSelectFile = (file) => {
    setCode(file.content || '')
  }

  const runCode = async () => {
    try {

      const res = await axios.post(`http://localhost:3001/api/execute`, {
        code,
        language
      });
      setOutput(res.data.output);

    } catch (error) {
      setOutput(`Error connecting to server`);
    }
  }
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <select name="" id="" className="border rounded p-1">
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
        <button
          onClick={runCode}
          className="bg-blue-500 text-white px-4 py-1 rounded">
          Run
        </button>
      </div>
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-100 p-4 overflow-auto">
          <FileTree tree={InitialFileSystem.children}
            onSelectFile={(file) => setActiveFile(file)}
            activeFile={activeFile}
          />
        </div>
        <div className="flex-1 p-4">
          {activeFile ? (
            <textarea name="" id=""
              className='w-full h-full border p-2'
              value={activeFile.content}
              onChange={(e) => (activeFile.content = e.target.value)}
            ></textarea>
          ) :
            (
              <p>Select a file to view/edit</p>
            )
          }
        </div>
        <div className="w-2/3 h-96">
          <EditorMonaco code={code} setCode={setCode} language={language} />
        </div>
        <div className="w-1/3 space-y-4">
          <Terminal output={output} />
          {language === 'javascript' && <Preview code={code} />}
        </div>
      </div>
    </div>

  )
}

export default App
