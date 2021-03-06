/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import {logging, PersistentMap } from "near-sdk-as";

const CandidateURL = new PersistentMap<string, string>("CandidateURL");
const CandidatePair = new PersistentMap<string, string[]>("Candidate Pair");
const PromptArray = new PersistentMap<string, string[]>("array of prompts");
const VoteArray = new PersistentMap<string, i32[]>("stores votes");
const UserParticipation = new PersistentMap<string, string[]>(
  "user participation record"
);

// view methods
// shows infomations
export function getUrl(name: string): string {
  if (CandidateURL.contains(name)) {
    return CandidateURL.getSome(name);
  } else {
    logging.log("cant find that user");
    return "";
  }
}

export function didParticipate(prompt: string, user: string): bool {
  if (UserParticipation.contains(prompt)) {
    let getArray = UserParticipation.getSome(prompt);
    return getArray.includes(user);
  } else {
    logging.log("prompt not found");
    return false;
  }
}

export function getAllPrompts(): string[] {
  if (PromptArray.contains("AllArrays")) {
    return PromptArray.getSome("AllArrays");
  } else {
    logging.log("no prompts found");
    return [];
  }
}

export function getVotes(prompt: string): i32[] {
  if (VoteArray.contains(prompt)) {
    return VoteArray.getSome(prompt);
  } else {
    logging.log("prompt not found for this vote");
    return [0, 0];
  }
}

export function getCandidatePair(prompt: string): string[] {
  if (CandidatePair.contains(prompt)) {
    return CandidatePair.getSome(prompt);
  } else {
    logging.log("prompt not found");
    return [];
  }
}

// change Methods and does have fee
// adds information to blockchain
export function addUrl(name: string, url: string): void {
  CandidateURL.set(name, url);
  logging.log("added url for " + name);
}
export function addCandidatePair(
  prompt: string,
  name1: string,
  name2: string
): void {
  CandidatePair.set(prompt, [name1, name2]);
}
export function addToPromptArray(prompt:string):void{
  logging.log('added to prompt array')
  if(PromptArray.contains("AllArrays")){
    logging.log('add addition to prompt array')
    let tempArray=PromptArray.getSome("AllArrays")
    tempArray.push(prompt)
    PromptArray.set("AllArrays",tempArray);
  }else{
    PromptArray.set("AllArrays",[prompt])
  }
}

export function clearPromptArray():void{
  logging.log('clearing prompt array');
  PromptArray.delete("AllArrays")
}
export function addVote(prompt: string, index: i32): void {
  if (VoteArray.contains(prompt)) {
    let tempArray = VoteArray.getSome(prompt);
    let tempVal = tempArray[index];
    let newVal = tempVal + 1;
    tempArray[index] = newVal;
    VoteArray.set(prompt, tempArray);
  } else {
    let newArray = [0, 0];
    newArray[index] = 1;
    VoteArray.set(prompt, newArray);
  }
}

export function recordUser(prompt: string, user: string): void {
  if (UserParticipation.contains(prompt)) {
    let tempArray = UserParticipation.getSome(prompt);
    tempArray.push(user);
    UserParticipation.set(prompt, tempArray);
  } else {
    UserParticipation.set(prompt, [user]);
  }
}
