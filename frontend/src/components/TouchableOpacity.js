import React from 'react'

const TouchableOpacity = ({children}) => {
    const [touched, touchedSet] = React.useState(false)
    return (
        <div 
        style={{ opacity: touched ? 0.5 : 1, transition: 'opacity 300ms ease' }}
        onMouseDown={() => touchedSet(true)}
        onMouseUp={() => touchedSet(false)}>
            {children}
        </div>
    )
}

export default TouchableOpacity