import VaultService from "../services/VaultService.js";
import response from "../utils/response.js";

class VaultController {
  static async addVault(req, res) {
    try {
      const vaultData = req.body;
      const newVault = await VaultService.addVault(vaultData);
      return response(res, 201, { success: true, vault: newVault });
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error adding vault",
        error: error.message,
      });
    }
  }

  static async getVaultById(req, res) {
    try {
      const { vaultId } = req.params;
      const vault = await VaultService.getVaultById(vaultId);
      if (!vault)
        return response(res, 404, {
          success: false,
          message: "Vault not found",
        });
      return response(res, 200, { success: true, vault });
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error fetching vault",
        error: error.message,
      });
    }
  }

  static async getAllVaults(req, res) {
    try {
      const vaults = await VaultService.getAllVaults();
      return response(res, 200, { success: true, vaults });
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error fetching vaults",
        error: error.message,
      });
    }
  }

  static async updateVault(req, res) {
    try {
      const { vaultId } = req.params;
      const updateData = req.body;
      const updatedVault = await VaultService.updateVault(vaultId, updateData);
      return response(res, 200, { success: true, vault: updatedVault });
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error updating vault",
        error: error.message,
      });
    }
  }

  static async suspendVault(req, res) {
    try {
      const { vaultId } = req.params;
      const { isSuspended } = req.body;
      await VaultService.suspendVault(vaultId, isSuspended);
      return response(res, 200, {
        success: true,
        message: `Vault ${isSuspended ? "suspended" : "unsuspended"}`,
      });
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error suspending vault",
        error: error.message,
      });
    }
  }

  static async deleteVault(req, res) {
    try {
      const { vaultId } = req.params;
      await VaultService.deleteVault(vaultId);
      return response(res, 200, {
        success: true,
        message: "Vault deleted successfully",
      });
    } catch (error) {
      return response(res, 500, {
        success: false,
        message: "Error deleting vault",
        error: error.message,
      });
    }
  }
}

export default VaultController;
