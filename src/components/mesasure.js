import React, { useState } from 'react';

export default function measure(props){

     const colname = ["Col1","Col2","Col3","Col4"]
     console.log("dataformeasures", props.dataforCalculatingMeasure)
        



    return(
    <div style={{display: "flex",borderCollapse: "collapse", border: "2px solid gray", justifyContent: "center",paddingTop:"5px"}}>


        <div className='divmeaandcol'>
            <div className='boxmea'>
                <button >Completeness</button>
            </div>
            <div className='boxcol'>
                {
                    colname.map((cols) => <div><label><input type="checkbox" /> {cols}</label></div>) 
                }
                
            </div>
        </div>


        <div className='divmeaandcol'>
            <div className='boxmea'>
                <button>Uniqueness</button>
            </div>
            <div className='boxcol'>
                {
                    colname.map((cols) => <div><label><input type="checkbox" /> {cols}</label></div>) 
                }
                
            </div>
        </div>  


        <div className='divmeaandcol'>
            <div className='boxmea'>
                <label><input type="checkbox" />Validity</label>
            </div>
            <div className='boxcol'>
                {
                    colname.map((cols) => <div><label><input type="checkbox" /> {cols}</label></div>) 
                }
                
            </div>
        </div>


        <div className='divmeaandcol'>
            <div className='boxmea'>
                <label><input type="checkbox" />Consistency</label>
            </div>
            <div className='boxcol'>
                {
                    colname.map((cols) => <div><label><input type="checkbox" /> {cols}</label></div>) 
                }
                
            </div>
        </div>


    </div>
    
    )
}


