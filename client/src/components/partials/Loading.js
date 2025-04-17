import React from "react";
import { Spinner} from 'react-bootstrap';

export function Loading() {
    return (
        <div id="page-loading" ><Spinner animation="border" id="loading-spinner" />Loading...</div>
    )
}