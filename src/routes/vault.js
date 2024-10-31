import { Router } from "express";
import VaultController from "../controllers/VaultController.js";
import { hasAuth } from "../middlewares/hasAuth.js";

const router = Router();

router.post("/add-vault", VaultController.addVault);
router.get("/:vaultId/get-vault", VaultController.getVaultById);
router.get("/get-all-vaults", VaultController.getAllVaults);
router.put("/:vaultId/update-vault", VaultController.updateVault);
router.patch("/:vaultId/suspend-vault", VaultController.suspendVault);
router.delete("/:vaultId/delete-vault", VaultController.deleteVault);

export default router;
