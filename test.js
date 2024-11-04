import http from "http";

const API_BASE = "http://localhost:3000/api/v1/vaults";

function apiRequest(endpoint, method = "GET", body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 3000,
      path: `http://localhost:3000/api/v1/vaults${endpoint}`,
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve({ status: res.statusCode, data: JSON.parse(data) });
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function addVault() {
  const vaultData = {
    valueName: "Test Vault",
    imageUrl: "http://example.com/vault-image.jpg",
    suspend: false,
    achievements: ["badge1", "badge2"],
    requirements: ["requirement1"],
    metadata: { description: "Sample metadata" },
  };

  const result = await apiRequest("/add-vault", "POST", vaultData);
  console.log("Add Vault:", result);
  return result.data._id;
}

async function getVaults() {
  const result = await apiRequest("/get-all-vaults");
  console.log("Get All Vaults:", JSON.stringify(result, null, 2));
}

async function getVaultById(vaultId) {
  const result = await apiRequest(`/${vaultId}/get-vault`);
  console.log("Get Vault by ID:", JSON.stringify(result, null, 2));
}

async function updateVault(vaultId) {
  const updatedData = {
    valueName: "Updated Vault Name",
    achievements: ["updatedBadge1", "updatedBadge2"],
  };

  const result = await apiRequest(
    `/${vaultId}/update-vault`,
    "PUT",
    updatedData
  );
  console.log("Update Vault:", JSON.stringify(result, null, 2));
}

async function suspendVault(vaultId) {
  const updatedData = {
    isSuspended: false,
  };
  const result = await apiRequest(
    `/${vaultId}/suspend-vault`,
    "PATCH",
    updatedData
  );
  console.log("Suspend Vault:", JSON.stringify(result, null, 2));
}

async function deleteVault(vaultId) {
  const result = await apiRequest(`/${vaultId}/delete-vault`, "DELETE");
  console.log("Delete Vault:", JSON.stringify(result, null, 2));
}

async function runTests() {
  console.log("Starting Vault API tests...");

  const vaultId = "672382fc74f70a939a02ea6d";
  //   console.log(vaultId, "asdfadasd");
  //   await getVaults();
  await getVaultById(vaultId);
  //   await updateVault(vaultId);
  //   await suspendVault(vaultId);
  //   await deleteVault(vaultId);

  console.log("Vault API tests completed.");
}

runTests();
