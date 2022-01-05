import { expect } from "chai";
import { CDN_URL } from "../src/constants";
import * as kitty from "../src";

describe("kitty.js unit tests", (): void => {
  it("gets a random image of a cat", async (): Promise<void> => {
    expect(await kitty.randomImage()).contain(CDN_URL);
  });

  it("gets a list of cat breeds", async (): Promise<void> => {
    expect(await kitty.catBreeds(5)).lengthOf(5);
  });

  it("gets a random image of a cat breed", async (): Promise<void> => {
    expect(await kitty.catBreedImage("norweg")).contain(CDN_URL);
  });

  it("gets information about the ragdoll cat breed", async (): Promise<void> => {
    expect(await kitty.catBreed("ragd")).haveOwnProperty("name");
  });

  it("gets the description of the british shorthair breed", async (): Promise<void> => {
    expect(await kitty.catBreedDescription("british")).not.be.undefined;
  });

  it("gets how child-friendly a siamese cat is", async (): Promise<void> => {
    expect(await kitty.catBreedChildFriendliness("siame")).to.greaterThan(0);
  });

  it("gets the temparament of a maine coon", async (): Promise<void> => {
    expect(await kitty.breedTemperament("maine")).not.be.undefined;
  });

  it("gets the intelligence of a bengal cat", async (): Promise<void> => {
    expect(await kitty.breedIntelligence("bengal")).to.greaterThan(0);
  });

  it("gets how affectionate an exotic shorthair is", async (): Promise<void> => {
    expect(await kitty.breedAffection("exotic")).to.greaterThan(0);
  });
});
