import React from 'react'
import noresultsrc from './no_result.gif'

function NoResult() {
    return (
        <div>
            <img
                src={noresultsrc}
                style={{ margin: 'auto', display: 'block' }}
                alt="Loading..."
            />
        </div>
    )
}

export default NoResult