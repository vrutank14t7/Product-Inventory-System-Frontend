import React from 'react'

function ShowDescription({ description }) {
    return (description ? <div className='editor_dis' dangerouslySetInnerHTML={{ __html: description }} /> : "")
}

export default ShowDescription
