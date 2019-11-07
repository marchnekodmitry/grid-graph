import React, { useState, useEffect, useCallback } from 'react'

import { gridArea, createGrid } from '../../utils/grid'

import { GridContainer, GridItem } from './styles'

const GridItems = ({ rows, columns, grid, clickHandler }) => {
    let items = []

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            items.push({ x, y })
        }
    }

    const onClick = (e) => clickHandler(e.target.dataset.coords)

    return (
        <>
            {
                items.map(item => {
                    const isPicked = grid && grid[item.y][item.x] === 1

                    return (
                        <GridItem
                            isPicked={isPicked}
                            data-coords={`${item.x}:${item.y}`}
                            key={`${item.x}:${item.y}`}
                            onClick={onClick}
                        />
                    )
                })
            }
        </>
    )
}

export const Grid = () => {
    const [columns, setColumns] = useState(5)
    const [rows, setRows] = useState(5)
    const [firstPoint, setFirstPoint] = useState(null)
    const [secondPoint, setSecondPoint] = useState(null)
    const [grid, setGrid] = useState(createGrid(columns, rows))

    const clickHandler = (dataCoords) => {
        const coords = {
            x: +dataCoords.split(':')[0],
            y: +dataCoords.split(':')[1]
        }
        if (!firstPoint) {
            setFirstPoint(coords)
            setSecondPoint(coords)
        } else if (coords.x === firstPoint.x && coords.x === secondPoint.x && coords.y === firstPoint.y && coords.y === secondPoint.y) {
            setFirstPoint(null)
            setSecondPoint(null)
            setGrid(createGrid(columns, rows))
        } else {
            setSecondPoint(coords)
        }
    }

    useEffect(() => {
        if (firstPoint && secondPoint) {
            setGrid(gridArea(firstPoint, secondPoint, createGrid(columns, rows)))
        }
    }, [firstPoint, secondPoint])

    return (
        <GridContainer columns={columns}>
            <GridItems
                rows={rows}
                columns={columns}
                grid={grid}
                clickHandler={clickHandler}
            />
        </GridContainer>
    )
}