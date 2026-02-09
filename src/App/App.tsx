
import * as React from 'react'
import styled from 'styled-components'

import { NavBar } from './layout/NavBar'
import { Hero } from './layout/Hero'

export const App: React.FC = () => {

    return (
        <Main>
            <NavBar />
            <Hero />
        </Main>
    )
}

const Main = styled.main({
    width: "100dvw",
    height: "100dvh",
    overflow: "hidden"
})