

import React, { useState } from 'react';

export default function Measure(props) {
  const [completenessChecked, setCompletenessChecked] = useState(false);
  const [uniquenessChecked, setUniquenessChecked] = useState(false);
  const [validityChecked, setValidityChecked] = useState(false);
  const { dataforCalculatingMeasure } = props;
  const [data, setData] = useState(dataforCalculatingMeasure)

//   const [data, setData] = useState({
//     "Composite Questions 9feb2023.xlsx": {
//         "Sheet1": {
//             "headers": {
//                 "Asset Type": false,
//                 "Composite Questions": false,
//                 "Composite Details": false,
//                 "Asset Type Unique Identifier": false,
//                 "Oracle Projects (OP) Number": false,
//                 "Upload Index": false,
//                 "Composite ID": false,
//                 "Composite": false,
//                 "Composite Unique Identifier": false,
//                 "Supplier": false,
//                 "Source": false
//             },
//             "selected": true,
//             "completeness": {},
//             "uniqueness": {},
//             "validity": {}
//         }
//     }
// });
console.log("imp",data)
  const handleHeaderToggleCompleteness = (fileName, sheetName, header) => {
    setData(prevData => {
      const newData = { ...prevData };
      newData[fileName][sheetName].headers[header] = !newData[fileName][sheetName].headers[header];
        
      if (completenessChecked && newData[fileName][sheetName].selected ) {
        newData[fileName][sheetName].completeness = {
          ...newData[fileName][sheetName].completeness,
          [header]: true
        };
      } else {
        delete newData[fileName][sheetName].completeness[header];
      }
      return newData;
    })

   
}
    const handleHeaderToggleUniqueness = (fileName, sheetName, header) => {
        setData(prevData => {
          const newData = { ...prevData };
          newData[fileName][sheetName].headers[header] = !newData[fileName][sheetName].headers[header];
            
          if (uniquenessChecked && newData[fileName][sheetName].selected) {
            
            newData[fileName][sheetName].uniqueness = {
              ...newData[fileName][sheetName].uniqueness,
              [header]: true
            };
          } else {
            delete newData[fileName][sheetName].uniqueness[header];
          }
          return newData;
        })
    }

//       if (uniquenessChecked && newData[fileName][sheetName].selected) {
//         console.log("newdata", newData)
//         newData[fileName][sheetName].uniqueness = {
//           ...newData[fileName][sheetName].uniqueness,
//           [header]: true
//         };
//       } else {
//         delete newData[fileName][sheetName].uniqueness[header];
//       }

//       if (validityChecked && newData[fileName][sheetName].selected) {
//         newData[fileName][sheetName].validity = {
//           ...newData[fileName][sheetName].validity,
//           [header]: true
//         };
//       } else {
//         delete newData[fileName][sheetName].validity[header];
//       }

//       return newData;
//     });
//   };

  const handleCompletenessChange = () => {
    setCompletenessChecked(!completenessChecked);
  };

  const handleUniquenessChange = () => {
    setUniquenessChecked(!uniquenessChecked);
  };

  const handleValidityChange = () => {
    setValidityChecked(!validityChecked);
  };
console.log("data",data)
  return (
    <div style={{ display: "flex", borderCollapse: "collapse", border: "2px solid gray", justifyContent: "center", paddingTop: "5px", alignContent: "center" }}>
      <div className='divmeaandcol'>
        <div className='boxmea'>
          <input type="checkbox" checked={completenessChecked} onChange={handleCompletenessChange} />
          Completeness
        </div>
        <div className='boxcol'>
          {Object.entries(data).map(([fileName, sheets]) => {
           
            return Object.entries(sheets).map(([sheetName, sheetData]) => {
                
              if (sheetData.selected) {
                const { headers } = sheetData;
                console.log(headers)
                return (
                  <div className='outerdivsheetandheader' key={sheetName}>
                    <h2 className='sheetnames'>{sheetName} - {fileName}</h2>
                    <div>
                      <ul>
                        {Object.keys(headers).map(header => (
                          <div key={header} className='headersdiv'>
                            <input
                              type="checkbox"
                              checked={data[fileName][sheetName].headers[header]}
                              onChange={() => handleHeaderToggleCompleteness(fileName, sheetName, header)}
                            />
                            {header}
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }
              return null;
            });
          })}
        </div>
      </div>


      <div className='divmeaandcol'>
        <div className='boxmea'>
          <input type="checkbox" checked={uniquenessChecked} onChange={handleUniquenessChange} />
          Uniqueness
        </div>
        <div className='boxcol'>
          {Object.entries(data).map(([fileName, sheets]) => {
            return Object.entries(sheets).map(([sheetName, sheetData]) => {
              if (sheetData.selected) {
                const { headers } = sheetData;
                return (
                  <div className='outerdivsheetandheader' key={sheetName}>
                    <h2 className='sheetnames'>{sheetName} - {fileName}</h2>
                    <div>
                      <ul>
                        {Object.keys(headers).map(header => (
                          <div key={header} className='headersdiv'>
                            <input
                              type="checkbox"
                              checked={data[fileName][sheetName].headers[header]}
                              onChange={() => handleHeaderToggleUniqueness(fileName, sheetName, header)}
                            />
                            {header}
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }
              return null;
            });
          })}
        </div>
      </div>


      {/* <div className='divmeaandcol'>
        <div className='boxmea'>
          <input type="checkbox" checked={validityChecked} onChange={handleValidityChange} />
          Validity
        </div>
        <div className='boxcol'>
          {Object.entries(data).map(([fileName, sheets]) => {
            return Object.entries(sheets).map(([sheetName, sheetData]) => {
              if (sheetData.selected) {
                const { headers } = sheetData;
                return (
                  <div className='outerdivsheetandheader' key={sheetName}>
                    <h2 className='sheetnames'>{sheetName} - {fileName}</h2>
                    <div>
                      <ul>
                        {Object.keys(headers).map(header => (
                          <div key={header} className='headersdiv'>
                            <input
                              type="checkbox"
                              checked={data[fileName][sheetName].headers[header]}
                              onChange={() => handleHeaderToggle(fileName, sheetName, header)}
                            />
                            {header}
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }
              return null;
            });
          })}
        </div>
      </div> */}
    </div>
  );
}






































































// import React, { useState } from 'react';

// export default function Measure(props) {
//   const [completenessChecked, setCompletenessChecked] = useState(false);    
//   const { dataforCalculatingMeasure } = props;
//   const [selectedHeaders, setSelectedHeaders] = useState({});

  
//   const [data, setData] = useState({
//     "Book1.xlsx": {
//       "Sheet1": {
//         "headers": {
//           "Name": false,
//           "Age": false
//         },
//         "selected": true
//       },
//       "Sheet2": {
//         "headers": {
//           "Name": false,
//           "Age": false,
//           "Gender": false
//         },
//         "selected": true
//       },
//       "Sheet3": {
//         "headers": {
//           "Name": false,
//           "Age": false,
//           "Location": false
//         },
//         "selected": false
//       }
//     }
//   });


// const selectedSheets = Object.values(data)[0]

// const next = Object.entries(selectedSheets).filter(([sheet , sheetData] )=> sheetData.selected == true).map(sheet => ({
//     sheet,
// }))

// // console.log("dataformeasures", selectedSheets);



// // const handleHeaderToggle = (fileName, sheetName, header) => {
// //     const updatedData = { ...data };
// //     updatedData[fileName][sheetName]["headers"][header] = !updatedData[fileName][sheetName]["headers"][header];
// //     setData(updatedData);
// //   };


//   const handleCompletenessChange = (fileName, sheetName, header) => {
//     const updatedData = { ...data };
//     updatedData[fileName][sheetName]["headers"][header] = !updatedData[fileName][sheetName]["headers"][header];
//     setData(updatedData);
//   };

  
//   console.log("data",data)
//   return (
//     <div style={{ display: "flex", borderCollapse: "collapse", border: "2px solid gray", justifyContent: "center", paddingTop: "5px" }}>


//       <div className='divmeaandcol'>
//         <div className='boxmea'>
//           <label><input type='checkbox'/>Completeness</label>
//         </div>
//         <div className='boxcol'>
//         {Object.keys(data).map(fileName => {
//                 const sheets = data[fileName]
//                 // console.log("",sheets)
//                 return Object.entries(sheets).map(([sheetName, sheetData]) => {
//                 const { headers } = sheetData
//                 // console.log("",sheetData)
//                 if (sheetData.selected === true) {
//                     return (
//                       <div className='outerdivsheetandheader' key={sheetName}>
//                         <h2 className='sheetnames'>{sheetName}</h2>
//                         <div>
//                           <ul>
//                             {Object.keys(headers).map(header => (
//                               <div key={header} className='headersdiv'>
//                                 <input
//                                   type="checkbox"
//                                   checked={headers[header]}
//                                   onChange={() => handleCompletenessChange(fileName, sheetName, header)}
//                                 />
//                                 {header}
//                               </div>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     );
//                   }
              
//                   return null;
//                 });
            
//             })}
//     </div>
//       </div>


//       <div className='divmeaandcol'>
//         <div className='boxmea'>
//           <label><input type='checkbox'/>Uniqueness</label>
//         </div>
//         <div className='boxcol'>
//         {Object.keys(data).map(fileName => {
//                 const sheets = data[fileName]
//                 // console.log("",sheets)
//                 return Object.entries(sheets).map(([sheetName, sheetData]) => {
//                 const { headers } = sheetData
//                 // console.log("",sheetData)
//                 if (sheetData.selected === true) {
//                     return (
//                       <div className='outerdivsheetandheader' key={sheetName}>
//                         <h2 className='sheetnames'>{sheetName}</h2>
//                         <div>
//                           <ul>
//                             {Object.keys(headers).map(header => (
//                               <div key={header} className='headersdiv'>
//                                 <input
//                                   type="checkbox"
//                                   checked={headers[header]}
//                                 //   onChange={() => handleHeaderToggle(fileName, sheetName, header)}
//                                 />
//                                 {header}
//                               </div>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     );
//                   }
              
//                   return null;
//                 });
            
//             })}
//         </div>
//       </div>


//       <div className='divmeaandcol'>
//         <div className='boxmea'>
//           <label>
//             <input type="checkbox" />Validity</label>
//         </div>
//         <div className='boxcol'>
//         {Object.keys(data).map(fileName => {
//                 const sheets = data[fileName]
//                 // console.log("",sheets)
//                 return Object.entries(sheets).map(([sheetName, sheetData]) => {
//                 const { headers } = sheetData
//                 // console.log("",sheetData)
//                 if (sheetData.selected === true) {
//                     return (
//                       <div className='outerdivsheetandheader' key={sheetName}>
//                         <h2 className='sheetnames'>{sheetName}</h2>
//                         <div>
//                           <ul>
//                             {Object.keys(headers).map(header => (
//                               <div key={header} className='headersdiv'>
//                                 <input
//                                   type="checkbox"
//                                   checked={headers[header]}
//                                 //   onChange={() => handleHeaderToggle(fileName, sheetName, header)}
//                                 />
//                                 {header}
//                               </div>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     );
//                   }
              
//                   return null;
//                 });
            
//             })}
//     </div>
//       </div>


//       <div className='divmeaandcol'>
//         <div className='boxmea'>
//           <label>
//             <input type="checkbox" />Consistency</label>
//         </div>
//         <div className='boxcol'>
//         {Object.keys(data).map(fileName => {
//                 const sheets = data[fileName]
//                 // console.log("",sheets)
//                 return Object.entries(sheets).map(([sheetName, sheetData]) => {
//                 const { headers } = sheetData
//                 // console.log("",sheetData)
//                 if (sheetData.selected === true) {
//                     return (
//                       <div className='outerdivsheetandheader' key={sheetName}>
//                         <h2 className='sheetnames'>{sheetName}</h2>
//                         <div>
//                           <ul>
//                             {Object.keys(headers).map(header => (
//                               <div key={header} className='headersdiv'>
//                                 <input
//                                   type="checkbox"
//                                   checked={headers[header]}
//                                 //   onChange={() => handleHeaderToggle(fileName, sheetName, header)}
//                                 />
//                                 {header}
//                               </div>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     );
//                   }
//                   return null;
//                 });
            
//             })}
//         </div>
//       </div>


//     </div>

//   )
// }