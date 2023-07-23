export async function breadthFirst(start, end, grid, speed) {
    const nodes = linearNodes(grid)

    let openSet = []
    let closedSet = []
    let current = start

    openSet.push(current)
    
    while (openSet.length > 0) {
        current = openSet.shift()
        current.isCurrent = true
        closedSet.push(current)

        if (current.isEnd) {
            let curr = current
            curr.isCurrent = false
            let ret = []
            while (curr.previousNode) {
                ret.push(curr)
                await sleep(speed)
                nodes.map(node => node.isCurrent = false)
                ret.map(node => node.isPath = true)
                curr = curr.previousNode
            }
            const nodesVisited = closedSet.length
            const breadthFirstLength = ret.reverse().length + 1
            return {nodesVisited, breadthFirstLength}
        }

        await sleep(speed)
        current.isCurrent = false
        current.isVisited = true

        let neighbours = getNeighbours(current, grid)
        neighbours.map(node => {
            if (!closedSet.includes(node)) {
                openSet.push(node)
                node.isBeingConsidered = true
                node.previousNode = current
            }
        })
    }
}

function linearNodes(grid) {
    let nodes = []
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            nodes.push(grid[i][j])
        }
    }
    return nodes
}

function getNeighbours(current, grid) {
    const neighbours = []
    const {row, col} = current

    if (row > 1) neighbours.push(grid[col-1][row-2])
    if (row < grid[0].length) neighbours.push(grid[col-1][row])
    if (col > 1) neighbours.push(grid[col-2][row-1])
    if (col < grid.length) neighbours.push(grid[col][row-1])

    const filtered = neighbours.filter(node => !node.isWall && !node.isVisited && !node.isCurrent)
    return filtered 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
