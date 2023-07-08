export type Guide = {
    id: string
    userId: string
    title: string
    createdDate: string
    likeCount: number
    commentCount: number
    nodes: Node[]
    edges: Edge[]
}

export type Node = {
    id: string
    xPos: number
    yPos: number
    data: NodeData
    type: string
}

export type Edge = {
    id: string
    source: string
    target: string
    sourceHandle: string
    targetHandle: string
    type: string
    style: Object
}

export type NodeData = {
    title: string
    description: string[]
    minimumCompetences: string[]
    images: string[]
    learningSources: string[]
}