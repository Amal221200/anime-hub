"use client";
import { createGlobalStyle } from "styled-components"

const BackgroundStyle = createGlobalStyle<{ image: string, opacity: number }>`
body {
    position: relative;
    background-image: url(${props => props.image || ''});
    background-color: rgba(0 0 0 / ${props => props.opacity}); 
    background-size: cover;
    background-attachment: fixed; 
    background-position: top; 
    background-repeat: no-repeat; 
    background-blend-mode: multiply;
    z-index: -1;
}


`

export default BackgroundStyle