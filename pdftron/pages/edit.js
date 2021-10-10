import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import styles from '../styles/Home.module.css'

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
            loadFromSVG(canvas);
            preventObjOut(canvas);
            limitRotation(canvas);
            hotkeys(canvas)
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


    const [tableTeam,setOption] = useState("general")
    // sets default dropdown to general table
    function handleChange(event){
        setOption(event.target.value)
    }


    const addTable = (canvas) => {
        // creates a new table object

        let colour, id

        if (tableTeam == "notAvail") {
            colour = "#F7A8B2",
            id = 0
        } else if (tableTeam == "general") {
            colour = "#C7E4A7",
            id = 1
        } else if ( tableTeam == "web") {
            colour = "#7D99E8",
            id = 2
        }

        const rect = new fabric.Rect({
            id: id,
            team: "test",
            height: 50,
            width: 25,
            stroke: "black",
            strokeWidth: 1,
            originX: 'center',
            originY: 'center',
            fill: colour,
        });




        // this only exports the custom properties to JSON but not to SVG
        rect.toObject = (function(toObject) {
            return function() {
              return fabric.util.object.extend(toObject.call(this), {
                tableID: 1,
                reserved: false,
                team: tableTeam
              });
            };
        })(rect.toObject);

        canvas.add(rect);
        canvas.centerObject(rect);
        canvas.renderAll();
        console.log(JSON.stringify(canvas))
        // console.log(canvas.toSVG())
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


    const saveToSVG = (canvas) => {
        // test function
        // loads current items on canvas to textarea and renders an SVG preview
        const canvasSVG = canvas.toSVG();
        document.getElementById('SVGRasterizer').innerHTML = canvasSVG;
        // console.log(canvasSVG)

        document.getElementById("loadSVG").value = canvasSVG;

    };


    const loadFromSVG = (canvas) => {
        // this function should autoload when canvas is loaded and will grab from database instead of local file
        fabric.loadSVGFromURL("../tempSVG.svg", function(objects) {
            canvas.renderOnAddRemove = false;
            canvas.add.apply(canvas, objects);
            canvas.renderOnAddRemove = true;
            canvas.renderAll();
          })
    };



    return (
        <div>
            <div className={styles.flexContainer}>
                <canvas id="canvas"></canvas>

                {/*Temporarily commented it out to test modal event handling*/}

                <div>
                    <h1>Modify Floor Plan</h1>
                    <div className={styles.buttonsContainer}>
                        <div className="dropdown">
                            <select name="tableTeam" id="tableTeam" onChange={handleChange}>
                                <option value="general">General</option>
                                <option value="web">Web</option>
                                <option value="notAvail">Not Available</option>
                            </select>
                            <button className={styles.pointer} onClick={() => addTable(canvas)}>Add Table</button>
                        </div>
                        <button className={styles.pointer} onClick={() => removeTable(canvas)}>Remove Selected</button>
                        <button className={styles.pointer} onClick={() => saveToSVG(canvas)}>Save Changes</button>
                    </div>
                </div>

            </div>

            <textarea id="loadSVG" cols="125"></textarea>

            <div id="SVGRasterizer" height="800" width="1000">

            </div>

        </div>

    );
}
