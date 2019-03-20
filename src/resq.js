import { filterNodesBy, findSelectorInTree, buildNodeTree } from './utils'

class RESQNodes extends Array {
    constructor(nodes) {
        super(...nodes)

    }

    byProps(props) {
        const filtered = filterNodesBy(this, 'props', props)

        return new RESQNodes(filtered)

    }

    byState(state) {
        const filtered = filterNodesBy(this, 'state', state)

        return new RESQNodes(filtered)
    }
}

class RESQNode extends Object {
    constructor(item, nodes) {
        super(item)
        this._nodes = nodes

        for(let key in item) {
            this[key] = item[key]
        }
    }

    byProps(props) {
        const filtered = filterNodesBy(this._nodes, 'props', props)[0]

        return new RESQNode(filtered, this._nodes)
    }

    byState(state) {
        const filtered = filterNodesBy(this._nodes, 'state', state)[0]

        return new RESQNode(filtered, this._nodes)
    }
}

export default class RESQ {
    constructor(selector, root) {
        this.selectors = selector.split(' ').filter(el => !!el).map(el => el.trim())
        this.rootComponent = root
        this.tree = buildNodeTree(this.rootComponent)
    }

    find() {
        this.nodes = new RESQNodes(findSelectorInTree(this.selectors, this.tree, true))

        return new RESQNode(this.nodes[0], this.nodes)
    }

    findAll() {
        return new RESQNodes(findSelectorInTree(this.selectors, this.tree))
    }
}
