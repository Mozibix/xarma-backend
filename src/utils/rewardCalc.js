const rewardCalc = (
  extractorType,
  numberOfImpression,
  numberOfLikes,
  sniped
) => {
  //sniped is a boolean to determin wether or not the url has been sniped by a sniper

  var gamaScore = numberOfImpression / 1000000;
  var xeetScore = numberOfLikes / 100000;

  if (extractorType === "GOD") {
    xeetScore *= 10;
    gamaScore *= 10;
  } else if (extractorType === "OG") {
  //sniped is a boolean to determin wether or not the url has been sniped by a sniper
    if (!sniped) {
      xeetScore *= 5;
      gamaScore *= 5;
    } else {
      xeetScore *= 4;
      gamaScore *= 4;
    }
  } else {
    xeetScore;
    gamaScore;
  }

  return { xeetScore, gamaScore };
};

export default rewardCalc;
