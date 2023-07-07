import React, { useState } from 'react';

const ConditionalForm = (props) => {
  const [firstSheet, setFirstSheet] = useState('');
  const [secondSheet, setSecondSheet] = useState('');
  const [firstColumns, setFirstColumns] = useState([]);
  const [operator, setOperator] = useState('');
  const [secondColumns, setSecondColumns] = useState([]);
  const [action, setAction] = useState('');
  const [conditionalStatements, setConditionalStatements] = useState([]);
  const [warning, setWarning] = useState('');

  const jsonData  = props.jsonData;



  // Sample JSON data
//   const jsonData = {
//     "HRData.xlsx": {
//         "Sheet1": {
//             "headers": {
//                 "employee_id": false,
//                 "department": false,
//                 "region": false,
//                 "education": false,
//                 "gender": false,
//                 "recruitment_channel": false,
//                 "no_of_trainings": false,
//                 "age": false,
//                 "previous_year_rating": false,
//                 "length_of_service": false,
//                 "KPIs_met >80%": false,
//                 "awards_won?": false,
//                 "avg_training_score": false
//             },
//             "selected": false,
//             "completeness": {},
//             "uniqueness": {},
//             "validity": {}
//         }
//     }
// };

  const handleFirstSheetChange = (event) => {
    const selectedSheet = event.target.value;
    setFirstSheet(selectedSheet);
    setFirstColumns([]);
    setSecondSheet(selectedSheet === secondSheet ? '' : secondSheet);
    setSecondColumns([]);
  };

  const handleSecondSheetChange = (event) => {
    const selectedSheet = event.target.value;
    setSecondSheet(selectedSheet);
    setSecondColumns([]);
  };

  const handleFirstColumnChange = (event) => {
    const selectedColumns = Array.from(event.target.selectedOptions, (option) => option.value);
    setFirstColumns(selectedColumns);
  };

  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
  };

  const handleSecondColumnChange = (event) => {
    const selectedColumns = Array.from(event.target.selectedOptions, (option) => option.value);
    setSecondColumns(selectedColumns);
  };

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!action) {
      setWarning('Please enter the action.');
      return;
    }

    if (firstColumns.length === 0) {
      setWarning('Please select at least one first column.');
      return;
    }

    if (!operator) {
      setWarning('Please select the operator.');
      return;
    }

    if (secondColumns.length === 0) {
      setWarning('Please select at least one second column.');
      return;
    }

    setWarning('');

    const newRule = {
      firstSheet,
      secondSheet,
      firstColumns,
      operator,
      secondColumns,
      action,
    };
console.log("new",newRule)
    setConditionalStatements((prevStatements) => [...prevStatements, newRule]);

    // Reset form fields
    setFirstSheet('');
    setSecondSheet('');
    setFirstColumns([]);
    setOperator('');
    setSecondColumns([]);
    setAction('');
  };

  return (
    <div>
    {
      jsonData ? (
        <form onSubmit={handleSubmit} >
      {warning && <p>{warning}</p>}
      <div>
        <label htmlFor="action">Action:</label>
       
        <input type="text" id="action" value={action} onChange={handleActionChange} required />
      </div>
      <label className='label-info'>Only write what action you to perform on the which column data.</label>
      <div>
        <label htmlFor="first-sheet">First Sheet:</label>
        <select id="first-sheet" value={firstSheet} onChange={handleFirstSheetChange} className='select-multiple'>
          <option value="">-- Select First Sheet --</option>
          {Object.keys(jsonData).map((fileName) =>
            Object.keys(jsonData[fileName]).map((sheetName) => (
              <option key={`${fileName}-${sheetName}`} value={`${fileName}-${sheetName}`}>
                {`${fileName} - ${sheetName}`}
              </option>
            ))
          )}
        </select>
      </div>
      <div>
        <label htmlFor="first-column">First Column Name:</label>
        <select id="first-column" multiple value={firstColumns} onChange={handleFirstColumnChange} required>
          {firstSheet &&
            jsonData[firstSheet.split('-')[0]][firstSheet.split('-')[1]] &&
            Object.keys(jsonData[firstSheet.split('-')[0]][firstSheet.split('-')[1]].headers).map((columnName) => (
              <option key={columnName} value={columnName}>
                {columnName}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label htmlFor="operator">Operator:</label>
        <select id="operator" value={operator} onChange={handleOperatorChange} required>
          <option value="">-- Select Operator --</option>
          <option value="$eq">Equal to</option>
          <option value="$ne">Not equal to</option>
          <option value="$gt">Greater than</option>
          <option value="$lt">Less than</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="second-sheet">Second Sheet:</label>
        <select id="second-sheet" value={secondSheet} onChange={handleSecondSheetChange}>
          <option value="">-- Select Second Sheet --</option>
          {Object.keys(jsonData).map((fileName) =>
            Object.keys(jsonData[fileName]).map((sheetName) => (
              <option key={`${fileName}-${sheetName}`} value={`${fileName}-${sheetName}`}>
                {`${fileName} - ${sheetName}`}
              </option>
            ))
          )}
        </select>
      </div>
      <div>
        <label htmlFor="second-column">Second Column Name:</label>
        <select id="second-column" multiple value={secondColumns} onChange={handleSecondColumnChange} required>
          {secondSheet &&
            jsonData[secondSheet.split('-')[0]][secondSheet.split('-')[1]] &&
            Object.keys(jsonData[secondSheet.split('-')[0]][secondSheet.split('-')[1]].headers).map((columnName) => (
              <option key={columnName} value={columnName}>
                {columnName}
              </option>
            ))}
        </select>
      </div>
      <button type="submit">Submit</button>

      {/* Display generated conditional statements */}
      <h2>Generated Conditional Statements:</h2>
      <ul>
        {conditionalStatements.map((rule, index) => (
          <li key={index}>
            First Sheet: {rule.firstSheet}, First Columns: {rule.firstColumns.join(', ')}, Operator: {rule.operator},
            Second Sheet: {rule.secondSheet}, Second Columns: {rule.secondColumns.join(', ')}, Action: {rule.action}
          </li>
        ))}
      </ul>
    </form>


      ) : (

        <>No sheet selected</>
      )
    }
  
 
  </div>
   );
};

export default ConditionalForm;



// import React, { useState } from 'react';

// const ConditionalForm = ({ jsonData }) => {
//   const [firstSheet, setFirstSheet] = useState('');
//   const [secondSheet, setSecondSheet] = useState('');
//   const [firstColumnName, setFirstColumnName] = useState('');
//   const [operator, setOperator] = useState('');
//   const [secondColumnName, setSecondColumnName] = useState('');
//   const [action, setAction] = useState('');
//   const [conditionalStatements, setConditionalStatements] = useState([]);
//   const [warning, setWarning] = useState('');

//   const handleFirstSheetChange = (event) => {
//     setFirstSheet(event.target.value);
//   };

//   const handleSecondSheetChange = (event) => {
//     setSecondSheet(event.target.value);
//   };

//   const handleFirstColumnChange = (event) => {
//     setFirstColumnName(event.target.value);
//   };

//   const handleOperatorChange = (event) => {
//     setOperator(event.target.value);
//   };

//   const handleSecondColumnChange = (event) => {
//     setSecondColumnName(event.target.value);
//   };

//   const handleActionChange = (event) => {
//     setAction(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!action) {
//       setWarning('Please enter the action.');
//       return;
//     }

//     if (!firstColumnName) {
//       setWarning('Please select the first column name.');
//       return;
//     }

//     if (!operator) {
//       setWarning('Please select the operator.');
//       return;
//     }

//     if (!secondColumnName) {
//       setWarning('Please select the second column name.');
//       return;
//     }

//     setWarning('');

//     const newRule = {
//       firstSheet,
//       secondSheet,
//       firstColumn: firstColumnName,
//       operator,
//       secondColumn: secondColumnName,
//       action,
//     };

//     setConditionalStatements((prevStatements) => [...prevStatements, newRule]);

//     // Reset form fields
//     setFirstSheet('');
//     setSecondSheet('');
//     setFirstColumnName('');
//     setOperator('');
//     setSecondColumnName('');
//     setAction('');
//   };

//   // Extract the filenames dynamically
//   const filenames = Object.keys(jsonData);

//   return (
//     <form onSubmit={handleSubmit}>
//       {warning && <p>{warning}</p>}
//       <div>
//         <label htmlFor="action">Action:</label>
//         <input type="text" id="action" value={action} onChange={handleActionChange} required />
//       </div>
//       <div>
//         <label htmlFor="first-sheet">First Sheet:</label>
//         <select id="first-sheet" value={firstSheet} onChange={handleFirstSheetChange}>
//           <option value="">-- Select First Sheet --</option>
//           {filenames.map((filename) => (
//             <optgroup key={filename} label={filename}>
//               {Object.keys(jsonData[filename]).map((sheetName) => (
//                 <option key={sheetName} value={sheetName}>
//                   {sheetName}
//                 </option>
//               ))}
//             </optgroup>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label htmlFor="first-column">First Column Name:</label>
//         <select id="first-column" value={firstColumnName} onChange={handleFirstColumnChange} required>
//           <option value="">-- Select First Column --</option>
//           {firstSheet &&
//             jsonData[firstSheet] &&
//             Object.keys(jsonData[firstSheet].headers).map((columnName) => (
//               <option key={columnName} value={columnName}>
//                 {columnName}
//               </option>
//             ))}
//         </select>
//       </div>
//       <div>
//         <label htmlFor="operator">Operator:</label>
//         <select id="operator" value={operator} onChange={handleOperatorChange} required>
//           <option value="">-- Select Operator --</option>
//           <option value="$eq">Equal to</option>
//           <option value="$ne">Not equal to</option>
//           <option value="$gt">Greater than</option>
//           <option value="$lt">Less than</option>
//           {/* Add more options as needed */}
//         </select>
//       </div>
//       <div>
//         <label htmlFor="second-sheet">Second Sheet:</label>
//         <select id="second-sheet" value={secondSheet} onChange={handleSecondSheetChange}>
//           <option value="">-- Select Second Sheet --</option>
//           {filenames.map((filename) => (
//             <optgroup key={filename} label={filename}>
//               {Object.keys(jsonData[filename]).map((sheetName) => (
//                 <option key={sheetName} value={sheetName}>
//                   {sheetName}
//                 </option>
//               ))}
//             </optgroup>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label htmlFor="second-column">Second Column Name:</label>
//         <select id="second-column" value={secondColumnName} onChange={handleSecondColumnChange} required>
//           <option value="">-- Select Second Column --</option>
//           {secondSheet &&
//             jsonData[secondSheet] &&
//             Object.keys(jsonData[secondSheet].headers).map((columnName) => (
//               <option key={columnName} value={columnName}>
//                 {columnName}
//               </option>
//             ))}
//         </select>
//       </div>
//       <button type="submit">Submit</button>

//       {/* Display generated conditional statements */}
//       <h2>Generated Conditional Statements:</h2>
//       <ul>
//         {conditionalStatements.map((rule, index) => (
//           <li key={index}>
//             First Sheet: {rule.firstSheet}, First Column: {rule.firstColumn}, Operator: {rule.operator}, Second Sheet: {rule.secondSheet}, Second Column: {rule.secondColumn}, Action: {rule.action}
//           </li>
//         ))}
//       </ul>
//     </form>
//   );
// };

// export default ConditionalForm;

