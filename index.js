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

// The function that runs the program.
(async () => {
  const nodes = await loadFile(NODE_FILE_PATH)
  // Nodes to tree
  return writeFile(OUTPUT_PATH, tree)
})()
