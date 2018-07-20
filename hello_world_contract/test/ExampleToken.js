'use strict';

import expectThrow from './helpers/expectThrow';

const ExampleToken = artifacts.require('ExampleToken.sol');


contract('ExampleTokenTest', function(accounts) {

    // тест создания токена
    it('test construction', async function() {

        const token =  await ExampleToken.new();
    });

    // тест заморозки токена
    it('test freeze', async function() {

        const token =  await ExampleToken.new({from: accounts[0]});

        await token.transfer(accounts[1], 1000, {from: accounts[0]});

        await token.freeze(2000000000, {from: accounts[0]});

        // а здесь мы ждем исключения
        await expectThrow(token.transfer(accounts[1], 1000, {from: accounts[0]}));
    });


});
