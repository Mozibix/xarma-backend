import validator from "validator";

const validateTwitterUsername = (twitterUsername) => {
  const errors = {};
  if (validator.isEmpty(twitterUsername)) {
    errors["twitterUsername"] = "Twitter username is required";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateTonWalletAddress = (tonWalletAddress) => {
  const errors = {};
  const tonAddressRegex = /^([A-Za-z0-9_-]{48}|[A-Za-z0-9_-]{66})$/;
  if (validator.isEmpty(tonWalletAddress)) {
    errors["tonWalletAddress"] = "TON wallet address is required";
  } else if (!tonAddressRegex.test(tonWalletAddress)) {
    errors["tonWalletAddress"] = "Invalid TON wallet address format";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export { validateTwitterUsername, validateTonWalletAddress };
