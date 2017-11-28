/**
 * Created by ajiteshkumar on 13/5/17.
 */

const mlPayload = require('../mlPayload.js');

describe('Payload Module', () => {
  //
  // Setup Test Instance before each tests is run
  //
  beforeEach(() => {
    mlP = new mlPayload();
  });
  it('should return correct response from successPayload', () => {
    //
    // When result as an object is passed
    //
    let result = { name: 'raksan' };
    const code = 'codeabc';
    let response = mlP.successPayload(result, code);
    expect(code).to.be.equal(response.code);
    expect(JSON.stringify(result)).to.be.equal(response.result);
    expect(result).to.not.equal(response.result);
    //
    // When result as a String is passes
    //
    result = 'raksan';
    response = mlP.successPayload(result, code);
    expect(JSON.stringify(result)).to.not.equal(response.result);
    expect(result).to.be.equal(response.result);
    expect(JSON.stringify(result)).to.not.equal(response.result);
  });
  it('should return correct response from errorPayload', () => {
    const code = 'codeabc';
    const errMsg = 'there is an error';
    const response = mlP.errorPayload(errMsg, code);
    expect(false).to.be.equal(response.success);
    expect(code).to.be.equal(response.code);
    expect(errMsg).to.be.equal(response.result);
  });
  it('should return correct response from getArrayResponse', () => {
    //
    // When array 1 = empty
    //
    let arr1 = [];
    let arr2 = ['smart', 'moolya'];
    let response = mlP.getArrayDifference(arr1, arr2);
    expect(true).to.be.equal(response.isActive);
    expect(arr2).to.be.equal(response.difference);
    expect(arr1).to.not.equal(response.difference);
    //
    // When array 2 length is greater than array 1
    //
    arr1 = ['smart'];
    arr2 = ['smart', 'moolya'];
    response = mlP.getArrayDifference(arr1, arr2);
    expect(true).to.be.equal(response.isActive);
    expect(_.difference(arr2, arr1)).to.eql(response.difference);
    expect(['moolya']).to.eql(response.difference);
    expect(['smart']).to.not.eql(response.difference);
    //
    // When array 2 length is smaller than array 1
    //
    arr1 = ['smart', 'moolya'];
    arr2 = ['moolya'];
    response = mlP.getArrayDifference(arr1, arr2);
    expect(false).to.be.equal(response.isActive);
    expect(_.difference(arr1, arr2)).to.eql(response.difference);
    expect(['smart']).to.eql(response.difference);
    expect(['moolya']).to.not.eql(response.difference);
    //
    // When array 2 length is equal to array 1
    //
    arr1 = ['smart', 'moolya'];
    arr2 = ['smart', 'moolya'];
    response = mlP.getArrayDifference(arr1, arr2);
    expect(false).to.be.equal(response.isActive);
    expect(_.difference(arr1, arr2)).to.eql(response.difference);
    expect([]).to.eql(response.difference);
  });
});
