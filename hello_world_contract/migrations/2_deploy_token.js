'use strict';


const ExampleToken = artifacts.require('ExampleToken.sol');


module.exports = function(deployer, network) {

    deployer.deploy(ExampleToken); // строка 'Pavel' это то что передастся в конструктор на вход
};





/*
const HelloWorld = artifacts.require('HelloWorld.sol');


module.exports = function(deployer, network) {

    deployer.deploy(HelloWorld, 'Pavel'); // строка 'Pavel' это то что передастся в конструктор на вход
};
*/
