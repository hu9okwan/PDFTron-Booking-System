import React from "react";
import Modal from "../components/modal";
import styles from "../styles/Book.module.css"


/**
Several things to note:
- This class takes care of creating modals when svg item is clicked
- svg is hard coded in, this is to make tables interactable
- combination of several components

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
 - make the proccess between saving an svg and making it clickable easily done
i.e.
 edit page > save svg > svg text is generated > upload new svg
 new svg is parsed, and converted to react elements > possibly gets written into
 book.js?

 OR

 just make it possible within edit.js. How? IDK LOL

 */


export default class Book extends React.Component {
    state = {
        seen: false
    };
    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };

    render() {
        return (
            <div className={styles.container}>

                {/*<div className="btn" onClick={this.togglePop}>*/}

                    <svg xmlns="http://www.w3.org/2000/svg" width={1000} height={800}
                    className={styles.bookingSVG}>
                        <g onClick={this.togglePop} className={styles.pointer}>
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="matrix(1.89 0 0 1.89 268.85 132.12)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="rotate(90 -23.94 213.29)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(241.29 362.05)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(338.18 385.02)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(338.18 332.09)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="rotate(90 -52.885 378.075)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="rotate(90 -113.805 373.075)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="rotate(90 -130.78 390.05)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(338.18 546.8)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="rotate(90 -125.81 246.23)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="rotate(90 -111.83 232.25)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="rotate(90 -169.25 289.67)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="rotate(90 -197.21 317.63)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(107.44 609.71)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(107.44 661.64)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(107.44 713.56)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(197.34 662.63)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(197.34 714.56)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(687.79 532.82)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(816.65 532.82)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(788.68 532.82)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(816.65 585.74)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(788.68 585.74)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(885.57 532.82)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="rotate(90 73.515 800.065)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="rotate(90 106.97 766.61)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="matrix(1 0 0 .87 771.7 717.9)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="matrix(1 0 0 .87 626.86 717.9)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="matrix(1 0 0 .89 739.73 718.4)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="matrix(1 0 0 .91 739.73 669.44)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="matrix(0 1.28 -1.28 0 539.15 692.26)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#f7a8b2"
                                transform="translate(523.97 532.82)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#f7a8b2"
                                transform="translate(496 532.82)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#f7a8b2"
                                transform="rotate(90 -155.77 276.19)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#f7a8b2"
                                transform="translate(107.44 279.17)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#7d99e8"
                                transform="translate(393.12 714.56)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#7d99e8"
                                transform="translate(393.12 662.63)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#7d99e8"
                                transform="translate(421.09 662.63)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#7d99e8"
                                transform="translate(421.09 714.56)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#7d99e8"
                                transform="translate(297.23 715.56)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#7d99e8"
                                transform="translate(297.23 663.63)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#7d99e8"
                                transform="translate(325.19 663.63)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#7d99e8"
                                transform="translate(325.19 715.56)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#7d99e8"
                                transform="translate(225.31 662.63)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#7d99e8"
                                transform="translate(225.31 714.56)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#7d99e8"
                                transform="rotate(90 -210.69 331.11)"
                            />
                            <rect
                                x={-12.5}
                                y={-25}
                                rx={0}
                                ry={0}
                                width={25}
                                height={50}
                                stroke="#000"
                                fill="#c7e4a7"
                                transform="translate(338 262)"
                            />
                        </g>
                    </svg>
                {this.state.seen ? <Modal toggle={this.togglePop}/> : null}
            </div>
        );
    }
}
