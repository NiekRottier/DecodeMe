import { useEffect, useState } from 'react';
import '../styles/FilesForm.scss';
import { Link } from 'react-router-dom';

function FilesForm() {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isFileUploaded, setIsFileUploaded] = useState(0)
  const [unparsedJson, setUnparsedJson] = useState([])

  // Check if an object is empty
  function isEmptyObject(obj) {
    if (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
        return true
    } else {
        return false
    }
  }

  function handleChange(event) {
    let files = event.target.files[0]
    console.log(files);
    if (files) {
      setUploadedFiles([
        ...uploadedFiles,
        files
      ]);
      setIsFileUploaded(isFileUploaded+1);
      console.log('File has been uploaded.')
    } else {
      console.log('File upload has failed.')
    }
  }

  useEffect(() => {
    console.log(uploadedFiles);
  }, [uploadedFiles])

  // Get the content from the file and put it in the FileJson state
  function readJsonFile(file) {
    if (isFileUploaded) {
      const blob = new Blob([file], {type:"application/json"});
      
      let reader = new FileReader()
      reader.addEventListener("load", () => {
        setUnparsedJson([
          ...unparsedJson,
          JSON.stringify(reader.result)
        ])
        console.log('Hello')
      })

      reader.readAsText(blob)

      console.log('Put the JSON content into a State')
    } else {
      console.log('No file has been uploaded.')
    }
  }

  useEffect(() => {
    if (isFileUploaded && !isEmptyObject(uploadedFiles)) {
      uploadedFiles.forEach(uploadedFile => {
        readJsonFile(uploadedFile)
        console.log(uploadedFile.name);
      })
    }
  }, [uploadedFiles])

  return (
    <div className="FilesForm">
      <hr />
      <div className='fileInput'>
        <label className='btn--primary-dark' htmlFor="fileInput">Upload BrowserHistory.json</label>
        <input type="file" id="fileInput" accept='.json' onChange={(e) => handleChange(e)} />
        <small>{isFileUploaded === 1 ? 'Uploaded: ' + uploadedFiles[0].name : 'No file uploaded'}</small>
      </div>
      <div className='fileInput'>
        <label className='btn--primary-dark' htmlFor="fileInput">Upload Autofill.json</label>
        <input type="file" id="fileInput" accept='.json' onChange={(e) => handleChange(e)} />
        <small>{isFileUploaded === 2 ? 'Uploaded: ' + uploadedFiles[1].name : 'No file uploaded'}</small>
      </div>
      <Link 
        to='/decoder' 
        state={{'unparsedJson' : unparsedJson}} 
        className={isFileUploaded ? 'btn--white' : 'btn--white hidden'}
        >{isFileUploaded ? 'DecodeMe!' : 'Upload files...'}</Link>
    </div>
  );
}

export default FilesForm;
