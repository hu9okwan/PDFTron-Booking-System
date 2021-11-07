import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { NavbarBS } from '../components/NavbarBS';
import styles from '../styles/Home.module.css'
import styles2 from "../styles/Book.module.css"
import { Heading, Button, Select } from "@chakra-ui/react"


const jsonObj = require('../public/tempJSON.json');

export default function Edit() {

    const [canvas, setCanvas] = useState('');
    useEffect(() => {
        setCanvas(initCanvas());
    }, []);

    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: 800,
            width: 1000,
            snapAngle: 90,
            backgroundImage: '../office-outline.png'
        })
    );

    useEffect(() => {
        if (canvas) {
            loadJson(canvas);
            preventObjOut(canvas);
            limitRotation(canvas);
            hotkeys(canvas);
            hoverTable(canvas);
        }
    }, [canvas]);

    
    

    const hotkeys = (canvas) => {

        fabric.util.addListener(document.body, "keydown", function(options) {
            if (options.repeat) {
                return
            }
            const key = options.which || options.keyCode;
            let selectedObj = canvas.getActiveObject()
            if (key == 46) {
                // deletes all selected with the delete key
                removeTable(canvas)
            } else if (selectedObj && key == 37) {
                // rotates table 90 degrees to the left
                selectedObj.angle -= 90
            } else if (selectedObj && key == 39) {
                // rotates table 90 degrees to the right
                selectedObj.angle += 90
            } else if (key == 90) {
                
            } else if (key == 82) {

            }
            canvas.renderAll()
        })

    }

    const preventObjOut = (canvas) => {
        // Prevent objects from leaving the canvas
        // solution from Pedrop Paulo @ https://stackoverflow.com/a/56366195
        canvas.on('object:moving', function (e) {
            var obj = e.target;
            // if object is too big ignore
            if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
                return;
            }
            obj.setCoords();
            // top-left corner
            if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
                obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
                obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
            }
            // bot-right corner
            if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
                obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
                obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
            }
        });
        var left1 = 0;
        var top1 = 0;
        var scale1x = 0;
        var scale1y = 0;
        var width1 = 0;
        var height1 = 0;

        canvas.on('object:scaling', function (e) {
            var obj = e.target;
            obj.setCoords();
            var brNew = obj.getBoundingRect();

            if (((brNew.width + brNew.left) >= obj.canvas.width) || ((brNew.height + brNew.top) >= obj.canvas.height) || ((brNew.left < 0) || (brNew.top < 0))) {
                obj.left = left1;
                obj.top = top1;
                obj.scaleX = scale1x;
                obj.scaleY = scale1y;
                obj.width = width1;
                obj.height = height1;
            }
            else {
                left1 = obj.left;
                top1 = obj.top;
                scale1x = obj.scaleX;
                scale1y = obj.scaleY;
                width1 = obj.width;
                height1 = obj.height;
            }
        });
    }

    const limitRotation = (canvas) => {
        // straightens table to 90 degree steps when rotating
        canvas.on('object:rotating', function(options) {
            options.target.straighten()
        });
    }


    const hoverTable = (canvas) => {
        let toolTip = document.getElementById("toolTip")
        let selected_object_opacity = 0.5;
        let original_opacity
        canvas.on('mouse:over', function(e) {
            if (e.target && e.target._objects) {
                return
            }
            else if (e.target) {
                const status = e.target.reserved ? "Reserved" : "Available"
                toolTip.innerText =
                    `Table ID: ${e.target.tableId}
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


    const [tableTeam,setOption] = useState("General")
    // sets default dropdown to general table
    function changeTeam(event){
        setOption(event.target.value)
    }

    const addTable = (canvas) => {
        // creates a new table object

        // TODO change ID to assign lowest available ID 
        let colour

        if (tableTeam == "Unavailable") {
            colour = "#D3D3D3"
        } else if (tableTeam == "General") {
            colour = "#C7E4A7"
        } else if ( tableTeam == "Web") {
            colour = "#7D99E8"
        }

        const rect = new fabric.Rect({
            height: 50,
            width: 25,
            stroke: "black",
            strokeWidth: 1,
            strokeUniform: true,
            lockScalingFlip: true,
            originX: 'center',
            originY: 'center',
            fill: colour,

            // custom properties
            // IMPORTANT: make sure to add the key name to the array in saveToJson method if adding new properties

            tableId:  canvas._objects.length - 1,
            reserved: false,
            team: tableTeam,
        });


        canvas.add(rect);
        canvas.centerObject(rect);
        canvas.renderAll();
    }

    const removeTable = (canvas) => {
        // removes all selected tables
        const activeObject = canvas.getActiveObjects();
        if (activeObject) {
            activeObject.forEach(object => {
                canvas.remove(object);
            });
            canvas.discardActiveObject();
        }
        canvas.renderAll();
    }


    const saveToJson = (canvas) => {
        const canvasJson = canvas.toJSON(["reserved", "tableId", "team"]);
        console.log(canvasJson)

    }


    const loadJson = (canvas) => {
        const jsonString = JSON.stringify(jsonObj)
        console.log(jsonObj)
        // console.log(jsonString)
        canvas.loadFromJSON(jsonObj, canvas.renderAll.bind(canvas))

    }



    return (
        <div>
            <NavbarBS isLoggedin={true} />
            <div className={styles2.flexContainer}>
                <canvas id="canvas"></canvas>
                <span id="toolTip" className={styles2.toolTip}></span>

                <div>
                    <Heading>Modify Floor Plan</Heading>
                    <div className={styles.buttonsContainer}>
                        <div className="dropdown">
                            <Select name="tableTeam" id="tableTeam" onChange={changeTeam}>
                                <option value="General">General</option>
                                <option value="Web">Web</option>
                                <option value="Unavailable">Unavailable</option>
                            </Select>
                        </div>
                        <Button className={styles.pointer} onClick={() => addTable(canvas)}>Add Table</Button>
                        <Button className={styles.pointer} onClick={() => removeTable(canvas)}>Remove Selected</Button>
                        <Button className={styles.pointer} onClick={() => saveToJson(canvas)}>Save Changes</Button>
                    </div>
                </div>

            </div>

        </div>

    );
}
