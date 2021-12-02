import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { MoonLoader, PulseLoader, SyncLoader } from 'react-spinners';


export default function Loader() {

    // if using a loader that has dots add justify-content: center;
    const override = css`
    display: flex;
    margin: 0 auto;
    justify-content: center;
    `;

    const style = {
        padding: "30px",
        width: "200px",
        height: "20vh",
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        margin: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "auto"
    }


    return (
        <div style={style}>
            {/* <MoonLoader color={"#00a5e4"} css={override} size={50} /> */}
            <SyncLoader color={"#00a5e4"} css={override} size={10} margin={5}/>
        </div>
    )
}