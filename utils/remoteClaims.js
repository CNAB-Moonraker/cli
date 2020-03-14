const { BlobServiceClient } = require("@azure/storage-blob");
const path = require('path');
const fs = require('fs');
const os = require('os');

const moonrakerDir = path.resolve(os.homedir(), '.moonraker');

let resources = [];
if (fs.existsSync(moonrakerDir)){
    const data = fs.readFileSync(path.resolve(moonrakerDir, 'config.json'));
    resources = JSON.parse(data).resources || [];
}

async function getClaims() {
  const porter = []
  let toReturn = resources.reduce((acc, resource) => {
    acc[resource.name] = [];
    return acc;
  },{})
  const STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || "";
  // Note - Account connection string can only be used in node.
  if (STORAGE_CONNECTION_STRING === "") {
    throw new Error('AZURE STORAGE PLUGIN FOR PORTER IS NOT CONFIGURED ON THIS MACHINE');
  }
  const blobServiceClient = BlobServiceClient.fromConnectionString(STORAGE_CONNECTION_STRING);

  const containerName = `porter`;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  for await (const blob of containerClient.listBlobsFlat()) {
    // console.log(`Blob ${i++}: ${blob.name}`);
    const blockBlobClient = containerClient.getBlockBlobClient(blob.name);

    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    const content = await streamToString(downloadBlockBlobResponse.readableStreamBody);
    const claim = JSON.parse(content);
    porter.push(claim);

  }
  toReturn.porter = porter;
  return toReturn
}
async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}

getClaims().then(claims => console.log(claims)).catch((err) => {
  console.error("Error running sample:", err.message);
});

module.exports = {getClaims}