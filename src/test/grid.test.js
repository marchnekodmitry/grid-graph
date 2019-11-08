import { getAreaSize, validateCoords, createGrid, drawArea } from '../utils/grid'

describe('getAreSize', () => {
    test.each`
        firstPoint        | secondPoint       | result
        ${{ x: 0, y: 0 }} | ${{ x: 2, y: 2 }} | ${{ x: 3, y: 3 }}
        ${{ x: 1, y: 1 }} | ${{ x: 1, y: 3 }} | ${{ x: 1, y: 3 }}
        ${{ x: 1, y: 3 }} | ${{ x: 2, y: 1 }} | ${{ x: 2, y: 3 }}
        ${{ x: 3, y: 3 }} | ${{ x: 0, y: 2 }} | ${{ x: 4, y: 2 }}
        ${{ x: 6, y: 0 }} | ${{ x: 1, y: 7 }} | ${{ x: 6, y: 8 }}
    `(`from $firstPoint to $secondPoint should be $result`, ({ firstPoint, secondPoint, result }) => {
        expect(getAreaSize(firstPoint, secondPoint)).toEqual(result)
    })
})

describe('validateCoords', () => {
    test.each`
        point              | size              | result
        ${{ x: 0, y: 4 }}  | ${{ x: 3, y: 3 }} | ${Error}
        ${{ x: -1, y: 0 }} | ${{ x: 2, y: 5 }} | ${Error}
        ${{ x: -4, y: 6 }} | ${{ x: 2, y: 3 }} | ${Error}
    `(`Should error`, ({ point, size, result }) => {
        expect(() => validateCoords(point, size)).toThrow(result)
    })

    test.each`
        point              | size              | result
        ${{ x: 0, y: 4 }}  | ${{ x: 3, y: 5 }} | ${undefined}
        ${{ x: 1, y: 0 }}  | ${{ x: 2, y: 5 }} | ${undefined}
        ${{ x: 4, y: 6 }}  | ${{ x: 8, y: 7 }} | ${undefined}
    `(`Should pass`, ({ point, size, result }) => {
        expect(validateCoords(point, size)).toBe(result)
    })
})

describe('createGrid', () => {
    test.each`
        columns | rows | result
        ${1}    | ${1} | ${[[0]]}
        ${3}    | ${3} | ${[[0, 0, 0], [0, 0, 0], [0, 0, 0]]}
        ${2}    | ${5} | ${[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]}
    `(`should create grid`, ({ columns, rows, result }) => {
        expect(createGrid(columns, rows)).toEqual(result)
    })
})

describe('drawArea', () => {
    const results = [
        [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1]
        ]
    ]

    const grid = createGrid(4, 6)

    test.each`
        grid    | area              | firstPoint        | secondPoint       | result
        ${grid} | ${{ x: 1, y: 2 }} | ${{ x: 0, y: 0 }} | ${{ x: 0, y: 1 }} | ${results[0]}
        ${grid} | ${{ x: 2, y: 3 }} | ${{ x: 1, y: 2 }} | ${{ x: 2, y: 4 }} | ${results[1]}
        ${grid} | ${{ x: 3, y: 2 }} | ${{ x: 2, y: 2 }} | ${{ x: 0, y: 1 }} | ${results[2]}
        ${grid} | ${{ x: 4, y: 6 }} | ${{ x: 0, y: 0 }} | ${{ x: 3, y: 5 }} | ${results[3]}
    `(`On grid ${grid[0].length}*${grid.length}, area $area, fp $firstPoint, sp $secondPoint`,
      ({ grid, area, firstPoint, secondPoint, result }) => {
          expect(drawArea(grid, area, firstPoint, secondPoint)).toEqual(result)
      })
})