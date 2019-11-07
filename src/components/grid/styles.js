import styled from 'styled-components'

export const GridItem = styled.div`
    height: 50px;
    
    background-color: ${props => props.isPicked ? 'aqua' : '#fff'}
    border: 2px solid bisque;
`

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.columns}, 1fr);
`