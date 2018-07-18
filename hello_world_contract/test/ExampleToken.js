'use strict';

import expectThrow from './helpers/expectThrow';

const ExampleToken = artifacts.require('ExampleToken.sol');


contract('ExampleTokenTest', function(accounts) {

     it('test simple', async function() {
        const owner1 = accounts[0];
        const owner2 = accounts[1];
        const nobody = accounts[2];

        const initial_balances_map = {};
        initial_balances_map[owner1] = SMTZ(10);
        initial_balances_map[owner2] = SMTZ(3);

        const role = {owner1, nobody};
        const token = await instantiate(role, initial_balances_map);
        const recipient = await TestApprovalRecipient.new(token.address, {from: nobody});

        await token.approveAndCall(recipient.address, SMTZ(1), '', {from: owner1});
        assertBigNumberEqual(await recipient.m_bonuses(owner1), SMTZ(1));

        await token.approveAndCall(recipient.address, SMTZ(1), '0x4041', {from: owner2});
        assertBigNumberEqual(await recipient.m_bonuses(owner2), SMTZ(2));
        assertBigNumberEqual(await token.balanceOf(owner2), SMTZ(2));   // 3 - 1
    });
});
