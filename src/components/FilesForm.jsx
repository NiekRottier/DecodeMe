import { useEffect, useState } from 'react';
import '../styles/FilesForm.scss';
import { Link } from 'react-router-dom';

function FilesForm() {
  const [browserHistoryJson, setBrowserHistoryJson] = useState({})
  const [autofillJson, setAutofillJson] = useState({})

  const [isFileUploaded, setIsFileUploaded] = useState(false)

  // Check if an object is empty
  function isEmptyObject(obj) {
    if (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
        return true
    } else {
        return false
    }
  }

  function handleChange(event) {
    let files = Array.from(event.target.files)
    
    if (files) {
      files.forEach(file => {
        // console.log(file.name);
        readJsonFile(file)
      });
    }else {
      console.warn('File upload has failed.')
    }
  }

function sortJson(json) {
  let jsonName = Object.keys(json)[0]
  setIsFileUploaded(true);

  switch (jsonName) {
    case 'Browser History':
      setBrowserHistoryJson(json)
      console.log('Browser History uploaded')
      break;

    case 'Autofill Profile':
      setAutofillJson(json)
      console.log('Autofill uploaded')
      break;
  
    default:
      setIsFileUploaded(false);
      console.log('Unknown file')
      break;
  }
}

  // Get the content from the file and put it in the FileJson state
  function readJsonFile(file) {
    const blob = new Blob([file], {type:"application/json"});
    
    let reader = new FileReader()
    reader.addEventListener("load", () => sortJson(JSON.parse(reader.result)))

    reader.readAsText(blob)
  }

  return (
    <div className="FilesForm">
      <div className='uploadButtons'>
        <div className='fileInput'>
          <label className='btn--white' htmlFor="fileInput">Upload JSON files</label>
          <input type="file" id="fileInput" accept='.json' onChange={(e) => handleChange(e)} multiple />
        </div>
        <Link 
          to={isFileUploaded ? '/decoder' : ''} 
          state={{
            'Browser History' : browserHistoryJson,
            'Autofill' : autofillJson
          }} 
          className={isFileUploaded ? 'btn--primary-dark' : 'btn--primary-dark disabled'}
          >{isFileUploaded ? 'DecodeMe!' : 'Upload files...'}</Link>
      </div>
      <div className="uploadList">
        <p><i>Supported files:</i></p>
        <p className={!isEmptyObject(browserHistoryJson) ? 'uploaded' : ''}>BrowserHistory.json</p>
        <p className={!isEmptyObject(autofillJson) ? 'uploaded' : ''}>Autofill.json</p>
      </div>
    </div>
  );
}

export default FilesForm;
