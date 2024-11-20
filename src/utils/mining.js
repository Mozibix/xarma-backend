import mineService from "../services/mineService";

const handleMiningScenario = async (
  user,
  checkOwner,
  minedData,
  impressions,
  likes,
  god_extractor,
  url
) => {
  let rewardMultiplier = god_extractor ? 10 : 5;
  let rewardType = "og";
  let xeetReward = (impressions / 1000000) * rewardMultiplier;
  let gemaReward = (likes / 100000) * rewardMultiplier;

  if (minedData) {
    if (minedData.og) throw new Error("This post has already been mined by og");
    if (minedData.snipper && checkOwner._id !== user._id)
      throw new Error("This post has already been snipped");

    xeetReward /= 1.25;
    gemaReward /= 1.25;
  } else if (checkOwner._id.toString() !== user._id.toString()) {
    rewardMultiplier = god_extractor ? 10 : 4;
    rewardType = "sniper";
  }

  const minedDocument = await mineService.create(
    user._id,
    undefined,
    gemaReward,
    xeetReward,
    impressions,
    likes,
    true,
    url,
    rewardType
  );
  await Promise.all([
    xeetService.rewardXeet(user._id, xeetReward),
    gemaService.rewardGema(user._id, gemaReward),
  ]);
  return minedDocument;
};

export default handleMiningScenario;
