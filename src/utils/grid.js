const getAreaSize = (firstPoint, secondPoint) => {
    const from = {
        x: Math.min(firstPoint.x, secondPoint.x),
        y: Math.min(firstPoint.y, secondPoint.y)
    }
    const to = {
        x: Math.max(firstPoint.x, secondPoint.x),
        y: Math.max(firstPoint.y, secondPoint.y)
    }

    return {
        x: to.x - from.x + 1,
        y: to.y - from.y + 1
    }
}

const validateCoords = (point, gridSize) => {
    if (point.x < 0 || point.x >= gridSize.x) {
        throw new Error(`Invalid value x in point ${point}`)
    }
    if (point.y < 0 || point.y >= gridSize.y) {
        throw new Error(`Invalid value y in point ${point}`)
    }
}

const drawArea = (grid, area, firstPoint, secondPoint) => {
    area = {...area}
    grid = grid.map(row => ([...row]))

    const xDir = firstPoint.x < secondPoint.x ? 1 : -1
    const yDir = firstPoint.y < secondPoint.y ? 1 : -1

    for (let y = 0; y < area.y; y++) {
        for (let x = 0; x < area.x; x++) {
            grid[firstPoint.y + y * yDir][firstPoint.x + x * xDir] = 1
        }
    }

    return grid
}

export const createGrid = (columns, rows) => {
    let grid = []

    for (let i = 0; i < rows; i++) {
        grid.push((new Array(columns)).fill(0))
    }

    return grid
}

export const gridArea = (firstPoint, secondPoint, grid) => {
    const gridSize = {
        x: grid[0].length,
        y: grid.length
    }

    validateCoords(firstPoint, gridSize)
    validateCoords(secondPoint, gridSize)

    const areaSize = getAreaSize(firstPoint, secondPoint)
    return drawArea(grid, areaSize, firstPoint, secondPoint)
}