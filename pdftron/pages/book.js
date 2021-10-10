import React from "react";
import Modal from "../components/modal";
import styles from "../styles/Book.module.css"
import Edit from "./edit"


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
                <Edit></Edit>
                <div className="btn" onClick={this.togglePop}>
                    <button>New User?</button>
                </div>
                {this.state.seen ? <Modal toggle={this.togglePop} /> : null}
            </div>
        );
    }
}
