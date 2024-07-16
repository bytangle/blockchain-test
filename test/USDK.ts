import { ethers } from "hardhat";
import { expect } from "chai";

describe("USDK Token", function () {
  let USDK: any;
  let usdk: any;
  let owner: any;
  let addr1: any;
  let addr2: any;
  let feeAddress: any;
  const feePercentage = 100; // 1% fee
  const initialSupply = ethers.parseUnits("1000000000", 18);

  beforeEach(async function () {
    [owner, addr1, addr2, feeAddress] = await ethers.getSigners();
    const USDK = await ethers.getContractFactory("USDK");
    usdk = await USDK.deploy(feeAddress.address, feePercentage);
  });

  it("Should deploy the contract and set initial values", async function () {
    expect(await usdk.name()).to.equal("Kredete USD");
    expect(await usdk.symbol()).to.equal("USDK");
    expect(await usdk.totalSupply()).to.equal(initialSupply);
    expect(await usdk.feeAddress()).to.equal(feeAddress.address);
  });

  it("Should transfer tokens from owner to addr1 with fee deduction", async function () {
    const transferAmount = ethers.parseUnits("1000", 18);
    await usdk.transfer(addr1.address, transferAmount);

    const addr1BalanceBefore = await usdk.balanceOf(addr1.address);
    const feeAddressBalanceBefore = await usdk.balanceOf(feeAddress.address);

    const feeAmount = transferAmount * BigInt(feePercentage) / BigInt(10000); // 1% fee
    const transferAmountAfterFee = transferAmount - BigInt(feeAmount);

    expect(addr1BalanceBefore).to.equal(transferAmountAfterFee);
    expect(feeAddressBalanceBefore).to.equal(feeAmount);
  });

  it("Should allow owner to change the fee address", async function () {
    const newFeeAddress = addr2;
    await usdk.changeFeeAddress(newFeeAddress.address);
    expect(await usdk.feeAddress()).to.equal(newFeeAddress.address);
  });

  it("Should allow owner to change the fee percentage", async function () {
    const newFeePercentage = 200; // 2%
    await usdk.changeFeePercentage(newFeePercentage);
    expect(await usdk.feePercentage()).to.equal(newFeePercentage);
  });
});