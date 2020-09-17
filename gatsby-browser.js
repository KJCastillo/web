import React from "react"
import "firebase/firestore"
import "firebase/functions"
import "firebase/analytics"
import "firebase/auth"
import "firebase/storage"
import StoreWrapper from "./src/store/appContext"

// highlight-start
export const wrapRootElement = ({ element }) => {
    return <StoreWrapper>{element}</StoreWrapper>
}
// highlight-end
