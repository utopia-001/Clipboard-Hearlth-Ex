const { deterministicPartitionKey, myDeterministicPartitionKey } = require("./dpk");

describe("Functional Test", () => {
  test("it should return same result when passing null", () => {
      const event = null;
      expect(deterministicPartitionKey(event)).toEqual(myDeterministicPartitionKey(event));
  });
  
  test("it should return same result when passing empty", () => {
      const event = {};
      expect(deterministicPartitionKey(event)).toEqual(myDeterministicPartitionKey(event));
  });
  
  test("it should return same result when passing event with partitionkey length exceeding 256", () => {
      const event = {partitionKey: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"};
      expect(deterministicPartitionKey(event)).toEqual(myDeterministicPartitionKey(event));
  });
  
  test("it should return same result when passing event without partition key", () => {
      const event = {type: "error", message: "test"};
      expect(deterministicPartitionKey(event)).toEqual(myDeterministicPartitionKey(event));
  });
  
  test("it should return same result when passing event with partition key with proper length", () => {
      const event = {partitionKey: "this is it", message: "not needed"};
      expect(deterministicPartitionKey(event)).toEqual(myDeterministicPartitionKey(event));
  });

  test("it should return same result when passing event with partition key that is not string", () => {
      const event = {partitionKey: 1234, message: "not needed"};
      expect(deterministicPartitionKey(event)).toEqual(myDeterministicPartitionKey(event));
  });
});