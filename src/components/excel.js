import React, { useState } from 'react';
import *  as XLSX from 'xlsx';
import { BlobServiceClient } from "@azure/storage-blob";


export default function ExcelReader() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [selectedSheets, setSelectedSheets] = useState({});
  const [selectedHeaders, setSelectedHeaders] = useState({});
  const [uploadState, setUploadState] = useState("");
  const [tableresponse, setTableResponse] = useState('')

  const data = {
    "col1":{
        "min": "abc",
        "max": "bcd",
        "data_type": "object",
        "xyz": ["ax","bc","dc"]
    },
    "col2":{
        "min": "abc",
        "max": "bcd",
        "data_type": "object",
        "xyz": ["ax","bc","dc"]
    },
     "col3":{
        "min": "abc",
        "max": "bcd",
        "data_type": "object",
        "xyz": ["ax","bc","dc"]
    },
     "col4":{
        "min": "abc",
        "max": "bcd",
        "data_type": "object",
        "xyz": ["ax","bc","dc"]
    }
}






const MyTable = ({ data }) => {
  const columns = Object.keys(data);

  return (
    <div className="table-container">
      <table className="my-table">
        <thead>
          <tr>
            <th>Column Name</th>
            <th>Min</th>
            <th>Max</th>
            <th>Data Type</th>
            <th>Categories</th>
            <th>25th Percentile</th>
            <th>50th Percentile</th>
            <th>75th Percentile</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          {columns.map((column) => (
            <tr key={column}>
              <td>{column}</td>
              <td>{data[column]["Minimum Value"]}</td>
              <td>{data[column]["Maximum Value"]}</td>
              <td>{data[column]["Data Type"]}</td>
              <td>
                {Array.isArray(data[column]["Categories"])
                  ? data[column]["Categories"].join(", ")
                  : data[column]["Categories"]}
              </td>
              <td>{data[column]["25th Percentile"]}</td>
              <td>{data[column]["50th Percentile"]}</td>
              <td>{data[column]["75th Percentile"]}</td>
              <td>{data[column]["Mode"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};








  const handleFileChange = (event) => {
    const { files } = event.target;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleSheetSelect = (event, fileName) => {
    const { name, checked } = event.target;
    setSelectedSheets({
      ...selectedSheets,
      [fileName]: {
        ...selectedSheets[fileName],
        [name]: checked,
      },
    });
  };

  const handleHeaderSelect = (event, fileName, sheetName) => {
    const { name, checked } = event.target;
    const fileHeaders = selectedHeaders[fileName] || {};
    const sheetHeaders = fileHeaders[sheetName] || {};
    setSelectedHeaders({
      ...selectedHeaders,
      [fileName]: {
        ...fileHeaders,
        [sheetName]: {
          ...sheetHeaders,
          [name]: checked,
        },
      },
    });
  };

  const handleFileUploadtoBlob = async (file) => {
    
    const storageaccountname = 'dataq1059';
    const sastoken = '?sv=2022-11-02&ss=b&srt=sco&sp=rwdlaciytfx&se=2023-05-30T16:38:18Z&st=2023-05-08T08:38:18Z&spr=https&sig=j%2FCPBJz9QhADw%2F%2FKD9kA6aPID2DOkJGLh%2BLB1Aib3lQ%3D';
    const blobServiceClient = new BlobServiceClient(`https://${storageaccountname}.blob.core.windows.net/?${sastoken}`);
    const containerClient = blobServiceClient.getContainerClient('test');
    const blockBlobClient = containerClient.getBlockBlobClient(file.name);
    console.log("blob",blockBlobClient)
    
    await blockBlobClient.uploadBrowserData(file);
    
    console.log(`File "${file.name}" has been uploaded to blob storage`);
    setUploadState("done")
  }



  const handleFileUpload = () => {
    const data = {};
    console.log("ss",selectedFiles)
    handleFileUploadtoBlob(selectedFiles[0])
    const sheetPromises = selectedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const binaryString = event.target.result;
          const workbook = XLSX.read(binaryString, { type: 'binary' });
          const sheets = {};
          workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const sheetHeaders = Object.keys(worksheet)
              .map((header) => XLSX.utils.decode_cell(header))
              .filter((cell) => cell.r === 0)
              .map((cell) => XLSX.utils.encode_cell({ r: cell.r, c: cell.c }));
            const headers = {};
            sheetHeaders.forEach((headerCell) => {
              const headerCellValue = worksheet[headerCell]?.v;
              if (headerCellValue) {
                const header = headerCellValue;
                headers[header] = selectedHeaders[file.name]?.[sheetName]?.[header] || false;
              }
            });
            sheets[sheetName] = {
              headers,
              selected: selectedSheets[file.name]?.[sheetName] || false,
            };
          });
          data[file.name] = sheets;
          resolve();
        };
        reader.readAsBinaryString(file);
      });
    });
  




    Promise.all(sheetPromises).then(() => {
      const newSheets = {};
      Object.keys(data).forEach((fileName) => {
        newSheets[fileName] = data[fileName];
      });
      setSheets(newSheets);
    });
  };
  
  


// const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("sheets",sheets)
//     // Make the AJAX call to the API endpoint
//     fetch('http://localhost:5000/api/submit', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(sheets)
//       // body: sheets,
//       // mode: 'no-cors'
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
//   };
  const viewProperties = () => {
    console.log(JSON.stringify(sheets))
    fetch("http://localhost:5000/api/getFiles", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(sheets),
  mode: 'cors'
})
  .then((response) => response.json())
  .then((data) => {
    setTableResponse(data[0])
    console.log("Statistics:", tableresponse);
  })
  // .catch((error) => console.error(error));
  };
  const isObjectNonEmpty = (obj) => {
    return Object.keys(obj).length > 0;
  }
  return (
    <div style={{ textAlign:"center", backgroundColor: "white"}}>
    <h1 className="ui header" style={{ textAlign:"center", backgroundColor: "white"}}>UPLOAD FILES HERE</h1>
    <input type="file" multiple onChange={handleFileChange} />
    <button onClick={handleFileUpload}>Upload Files</button>
    <br />
    {selectedFiles.map((file) => {
      return (
        <div key={file.name}>
          <h3>{file.name}</h3>
          {sheets[file.name] ? (
            Object.keys(sheets[file.name]).map((sheetName) => {
              const sheet = sheets[file.name][sheetName];
              return (
                <div key={sheetName} style={{border: "1px solid gray", padding: "10px"}}>
                   <input
                    type="checkbox"
                    name={sheetName}
                    checked={selectedSheets[file.name]?.[sheetName] || false}
                    onChange={(event) => handleSheetSelect(event, file.name)}
                  />
                 {uploadState == "done" ? (
                  <>
                      <label>{sheetName}</label>
                      <button onClick={viewProperties}>
                        View Properties
                      </button>

                    {Object.keys(tableresponse).length > 0 &&  (
                      <MyTable data={tableresponse}/>
                    )
                   } 
                    </>   
                     ) : (
                     <p>Please upload a file.</p>
                         )}
                  
                   
  {sheet.selected && (
    <div style={{display: "flex", justifyContent: "center"}}>
      <table style={{borderCollapse: "collapse", border: "1px solid gray"}}>
        <thead>
          <tr>
            {/* <th style={{border: "1px solid gray", padding: "5px"}}>Header Name</th> */}
            {/* <th style={{border: "1px solid gray", padding: "5px"}}>Select</th> */}
          </tr>
        </thead>
        <tbody>
          {Object.keys(sheet.headers).map((headerName) => {
            const headerSelected =
              selectedHeaders[file.name]?.[sheetName]?.[headerName] || false;
            return (
              <></>
              // <tr key={headerName}>
              //   <td style={{border: "1px solid gray", padding: "5px"}}>{headerName}</td>
              //   <td style={{border: "1px solid gray", padding: "5px"}}>
              //     <input
              //       type="checkbox"
              //       name={headerName}
              //       checked={headerSelected}
              //       onChange={(event) => handleHeaderSelect(event, file.name, sheetName)}
              //     />
              //   </td>
              // </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )}
</div>
              );
            })
          ) : (
            <div>Loading sheets..</div>
          )}
        </div>
      );
    })}
    <div className='ui-footer' style={{paddingTop:"50px"}}>
      {/* <button onClick={handleSubmit}>
        Submit
      </button> */}
    </div>
  </div>
  
  );
}

