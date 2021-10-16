import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import styles from "../styles/Book.module.css"
import Modal from "../components/modal";
const jsonObj = require('../public/tempJSON.json');


/**
Low Priority:
- make pop up look nicer
- make booking button fully functional
 - Make page look nicer overall
 - wait for high fidel UI people to finish so I can have a direction

 Medium Priority:
 - be able to read from datepicker component
 - connect it to database


 High Priority:
 - be able to click a specific table and book for that specific table LOL
 - make the process between saving an svg and making it clickable easily done
 */


 export default function Book() {

    const [state, setState] = useState ({
        seen: false
    })
    const togglePop = () => {
        setState({
            seen: !state.seen
        });
    };

    const [canvas, setCanvas] = useState('');
    useEffect(() => {
        setCanvas(initCanvas());
    }, []);

    
    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: 800,
            width: 1000,
            // backgroundImage: '../office-outline.png'
        })
    );

    
    const [tableData, setTableData] = useState (
        {
            tableID: -1,
            team: "",
        }
    )

    useEffect(() => {
        if (canvas) {
            // loadFromSVG(canvas);
            loadJson(canvas);
            canvas.hoverCursor = 'pointer';
            clickTable(canvas);
            hoverTable(canvas);
        }
    }, [canvas]);


    const loadJson = (canvas) => {
        canvas.loadFromJSON(jsonObj, canvas.renderAll.bind(canvas), function (o, object) {
            object.set("selectable", false);
        })
    }


    const hoverTable = (canvas) => {
        let toolTip = document.getElementById("toolTip")
        let selected_object_opacity = 0.5;
        let original_opacity
        canvas.on('mouse:over', function(e) {
            if (e.target) {
                const status = e.target.reserved ? "Reserved" : "Available"
                toolTip.innerText =
                    `Table ID: ${e.target.tableID}
                    Team: ${e.target.team}
                    Status: ${status}`

                toolTip.style.visibility = 'visible'
                
                var offset = canvas.calcOffset();
                let left = offset._offset.left + e.target.left
                let top = offset._offset.top + e.target.top - 100
                toolTip.style.left = left + "px"
                toolTip.style.top = top + "px"


                original_opacity    = e.target.opacity;
              
                e.target.set('opacity', selected_object_opacity);
                canvas.renderAll();
            }
        })
        canvas.on('mouse:out', function(e) {
            if (e.target) {
                toolTip.style.visibility = 'hidden'

                e.target.set('opacity', original_opacity);
                canvas.renderAll();
            }
        })
    }


    const clickTable = (canvas) => {
        canvas.on('mouse:up', function(e) {
            //check if user clicked an object
            if (e.target) {
                //clicked on object
                console.log(`Table ID: ${e.target.tableID}, Team: ${e.target.team}, Reserved: ${e.target.reserved}`)
                let selectedTableData = {tableID: e.target.tableID,
                                         team: e.target.team,
                                        }
                setTableData(selectedTableData)
                togglePop()
                
            }
        }
    )}


    return (
        <div>
            <div className={styles.flexContainer}>
                <canvas id="canvas"></canvas>
                <span id="toolTip" className={styles.toolTip}></span>
                {state.seen ? <Modal tableID={tableData.tableID} team={tableData.team} toggle={togglePop}/> : null}
            </div>
        </div>

    );
}
