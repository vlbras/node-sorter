const fs = require("fs/promises")

const NODE_FILE_PATH = "input/nodes.json"
const OUTPUT_PATH = "output/real-tree.json"

// The async function that reads the JSON file and returns the parsed JSON.
const loadFile = async (fileName) => {
  try { // Try to read the file.
    const jsonRaw = await fs.readFile(fileName, "utf8")
    return JSON.parse(jsonRaw)
  } catch (error) { // If there is an error, log it.
    console.log(error)
  }
}

// The async function that writes the JSON file.
const writeFile = async (fileName, data) => {
  try { // Try to write the file.
    await fs.writeFile(fileName, JSON.stringify(data))
  } catch (error) { // If there is an error, log it.
    console.log(error)
  }
}

// The function that returns the siblings of a node.
const getSiblings = (array, id) => {
  const [sibling] = array.filter((item) => item.previousSiblingId === id) // Get the sibling by filtering the array.
  if (sibling) {
    return [sibling, ...getSiblings(array, sibling.nodeId)] // Recursively get the siblings.
  }
  return [] // Return an empty array if there are no siblings.
}

// The function that returns the children of a node.
const getChildren = (array, id) => {
  const children = getSiblings(
    array.filter((item) => item.parentId === id), null // Filter the array to get the children.
  )
  for (const child of children) {
    child.children = getChildren(array, child.nodeId) // Recursively get the children.
  }
  return children
}

// The function that runs the program.
(async () => {
  const nodes = await loadFile(NODE_FILE_PATH)
  const tree = getChildren(nodes, null)
  return writeFile(OUTPUT_PATH, tree)
})()