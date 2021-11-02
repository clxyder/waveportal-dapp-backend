const Reaction = {
	Wave: 0,
	Rocket: 1,
	World: 2,
};

const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');

    // refreshing your local server every time so you always
    // start from a clean slate which makes it easy to debug errors
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    /*
     * Get Contract balance
     */
    let contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );
    console.log(
      'Contract balance:',
      hre.ethers.utils.formatEther(contractBalance)
    );

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    // test with contract owner
    let waveTxn = await waveContract.wave(Reaction.Rocket,'Vancouver');
    await waveTxn.wait();
    waveCount = await waveContract.getTotalWaves();

    // test this out with a randomPerson
    waveTxn = await waveContract.connect(randomPerson).wave(Reaction.World,'Paris');
    await waveTxn.wait();
    waveCount = await waveContract.getTotalWaves();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      'Contract balance:',
      hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
