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
            width: 800,
            backgroundColor: 'white'
        })
    );
    

    // says canvas.on is not a function
    // this is used to keep objects from moving outside the canvas

    // canvas.on('object:moving', function (e) {
    //     var obj = e.target;
    //     // if object is too big ignore
    //     if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
    //         return;
    //     }
    //     obj.setCoords();
    //     // top-left  corner
    //     if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
    //         obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
    //         obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
    //     }
    //     // bot-right corner
    //     if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
    //         obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
    //         obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
    //     }
    // });
    // var left1 = 0;
    // var top1 = 0;
    // var scale1x = 0;
    // var scale1y = 0;
    // var width1 = 0;
    // var height1 = 0;
    // canvas.on('object:scaling', function (e) {
    //     var obj = e.target;
    //     obj.setCoords();
    //     var brNew = obj.getBoundingRect();

    //     if (((brNew.width + brNew.left) >= obj.canvas.width) || ((brNew.height + brNew.top) >= obj.canvas.height) || ((brNew.left < 0) || (brNew.top < 0))) {
    //         obj.left = left1;
    //         obj.top = top1;
    //         obj.scaleX = scale1x;
    //         obj.scaleY = scale1y;
    //         obj.width = width1;
    //         obj.height = height1;
    //     }
    //     else {
    //         left1 = obj.left;
    //         top1 = obj.top;
    //         scale1x = obj.scaleX;
    //         scale1y = obj.scaleY;
    //         width1 = obj.width;
    //         height1 = obj.height;
    //     }
    // });




    const addTable = (canvas) => {

        const rect = new fabric.Rect({
            height: 180,
            width: 100,
            fill: 'grey',
        });


        // this seems to only export these properties to JSON but not SVG
        rect.toObject = (function(toObject) {
            return function() {
              return fabric.util.object.extend(toObject.call(this), {
                tableID: 1,
                reserved: false,
                team: "general",
              });
            };
        })(rect.toObject);

        canvas.add(rect);
        canvas.renderAll();
        console.log(JSON.stringify(canvas))
        console.log(canvas.toSVG())
    }

    const removeTable = (canvas) => {

        const activeObject = canvas.getActiveObjects();
        console.log(activeObject)
        if (activeObject) {
            activeObject.forEach(object => {
                canvas.remove(object);
            });
            canvas.discardActiveObject();
        }
        canvas.renderAll();
    }


    const saveToSVG = canvas => {

        const canvasSVG = canvas.toSVG();
        document.getElementById('SVGRasterizer').innerHTML = canvasSVG
        console.log(canvas.toSVG())

        document.getElementById("loadSVG").value = canvasSVG

    };

    
    const loadFromSVG = () => {
        pass
    }



    return (
        <div>
            <div>
                <h1>Modify Floor Plan</h1>
                <button onClick={() => addTable(canvas)}>Add Table</button>
                <button onClick={() => removeTable(canvas)}>Remove Selected</button>
                <button onClick={() => saveToSVG(canvas)}>Save Changes</button>
                <button onClick={() => loadFromSVG()}>Load SVG</button>

                <canvas id="canvas"></canvas>


            </div>

            <textarea id="loadSVG" cols="106"></textarea>

            <div id="SVGRasterizer" >

            </div>

        </div>

    );
}
