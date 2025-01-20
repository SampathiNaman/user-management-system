import {createContext} from 'react'

const ThemeContext = createContext({
    theme: 'light',
    handleThemeChange: () => {}
})

export default ThemeContext