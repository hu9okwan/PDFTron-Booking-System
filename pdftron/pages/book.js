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

    useEffect(() => {
        if (canvas) {
            // loadFromSVG(canvas);
            loadJson(canvas);
            canvas.hoverCursor = 'pointer';

        }
    }, [canvas]);


    const loadJson = (canvas) => {
        canvas.loadFromJSON(jsonObj, canvas.renderAll.bind(canvas), function (o, object) {
            object.set("selectable", false);
        })
    }


    return (
        <div>
            <div className={styles.flexContainer}>
                <canvas id="canvas"></canvas>
                {state.seen ? <Modal tableID={tableData.tableID} team={tableData.team} toggle={togglePop}/> : null}
            </div>
        </div>

    );
}
