"use client";
import { createGlobalStyle } from "styled-components"

const BackgroundStyle = createGlobalStyle<{ image: string, opacity: number }>`

body {
    background-image: url(${props => props.image || ''});
    background-color: ${props => props.image ?`rgba(40, 40, 40, ${props.opacity})`: `rgb(0, 0, 0)`}; 
    background-size: cover;
    background-attachment: fixed; 
    background-position: top; 
    background-repeat: no-repeat; 
    background-blend-mode: multiply;
}
`

export default BackgroundStyle