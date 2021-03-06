import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { NavbarBS } from '../components/NavbarBS';
import styles from '../styles/Edit.module.css'
import {saveToDatabase, getFloorPlan, getAllTeams} from "../database/databaseCRUD";
import {N} from 'react-bootstrap/Button';
import AuthZ from "../components/authz";


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

    const [dataTeams, setDataTeams] = useState({});
    const [dataTeamsColours, setDataTeamsColours] = useState({});

    useEffect(() => {
        if (canvas) {
            getSetTeams().then((teamObj) => {
                loadMap(canvas);
                preventObjOut(canvas);
                limitRotation(canvas);
                hotkeys(canvas);
                hoverTable(canvas, teamObj); 
            })
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


    const hoverTable = (canvas, teamObj) => {
        let toolTip = document.getElementById("toolTip")
        let selected_object_opacity = 0.5;
        let original_opacity
        canvas.on('mouse:over', function(e) {
            if (e.target && e.target._objects) {
                return
            }
            else if (e.target) {
                const tableOrRoom = e.target.tableID ? `Table ID: ${e.target.tableID}` : `Room ID: ${e.target.roomID}`
                toolTip.innerText =
                    `${tableOrRoom}
                    Team: ${teamObj[e.target.teamId]}`

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


    const [teamId,setOption] = useState(0)
    // sets default dropdown to general table
    function changeTeam(event){
        setOption(event.target.value)
    }

    const addRect = (canvas, isAddTable) => {
        // creates a new table object

        // TODO change ID to assign lowest available ID
        let colour = dataTeamsColours[teamId]

        const rect = new fabric.Rect({

            height: isAddTable ? 50 : 100,
            width: isAddTable ? 25 : 100,
            stroke: "black",
            strokeWidth: 1,
            strokeUniform: true,
            lockScalingFlip: true,
            originX: 'center',
            originY: 'center',
            fill: colour,

            // custom properties
            // IMPORTANT: make sure to add the key name to the array in saveToJson method if adding new properties

            bookings: [],
            teamId: parseInt(teamId),
        });

        if (isAddTable) {
            rect["tableID"] = findNextAvailableID(canvas, isAddTable)
        } else {
            rect["roomID"] = findNextAvailableID(canvas, isAddTable)
        }

        canvas.add(rect);
        canvas.centerObject(rect);
        canvas.renderAll();
    }

    const findNextAvailableID = (canvas, isTable) => {
        // finds next lowest available id for a table or room
        let rectID
        if (isTable) {
            rectID = `tableID`
        } else {
            rectID = `roomID`
        }

        let id_list = [];
        for (let obj of canvas._objects) {
            id_list.push(obj[rectID])
        }
        const set = new Set(id_list);
        let id = 1;
        while (set.has(id)) { id++ }

        return id
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


    const saveMap = (canvas) => {
        console.log(canvas)
        const canvasJson = canvas.toJSON(["bookings", "tableID", "roomID", "teamId"])
        saveToDatabase(canvasJson).then(r => {
            console.log("saved floor plan")
            alert("Your changes has been saved.")}
        );
    };



    const loadMap = (canvas) => {
        getFloorPlan().then(floorPlan =>
            canvas.loadFromJSON(floorPlan, canvas.renderAll.bind(canvas))
        )
    };


    const getSetTeams = async () => {
        // creates a mapping {0: "Web", 1: "Finance", ...}
        const allTeams = await getAllTeams()
    
        let teamObj = {}
        let teamColours = {}
        for (let team of allTeams) {
            teamObj[team.id] = team.name
            teamColours[team.id] = team.colour
        }
        // console.log(teamObj)
        setDataTeams(teamObj)
        setDataTeamsColours(teamColours)

        return teamObj
        
    }


    return (
        <AuthZ>
            <div className={styles.flexContainerButtons}>
                <canvas id="canvas"></canvas>
                <span id="toolTip" className={styles.toolTip}></span>

                <div>
                    <h1>Modify Floor Plan</h1>
                    <div className={styles.buttonsContainer}>
                        Team:
                        <div className="dropdown">
                            <select name="teamId" id="teamId" onChange={changeTeam}>

                                { Object.entries(dataTeams).map((t,k) => <option key={k} value={t[0]}>{t[1]}</option>) }

                                {/* <option value={}>General</option>s
                                <option value="Web">Web</option>
                                <option value="Unavailable">Unavailable</option> */}
                            </select>
                        </div>
                        <button className={styles.buttonPointer} onClick={() => addRect(canvas, true)}>Add Table</button>
                        <button className={styles.buttonPointer} onClick={() => addRect(canvas, false)}>Add Room</button>
                        <button className={styles.buttonPointer} onClick={() => removeTable(canvas)}>Remove Selected</button>
                        <button className={styles.buttonPointer} onClick={() => saveMap(canvas)}>Save Changes</button>
                    </div>

                </div>

            </div>
        </AuthZ>

    );
}
Edit.auth = true;
