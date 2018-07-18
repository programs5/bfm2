pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";


contract ExampleToken is StandardToken {

    // для каждого адреса будем сохранять время когда следует размораживать токен
    mapping (address => uint) m_freeze_info;

    constructor() public {

        // заполняем баланс того кто создал контракт (balances свойство класса BasicToken)
        balances[msg.sender] = 1000 ether; // будет сгенерировано 10 в 18 степени токенов

        totalSupply_ = balances[msg.sender]; // общее количество токенов (свойство из класса BasicToken)

        // создаем событие на факт генерации токенов, чтобы все это могли увидеть
        emit Transfer(address(0), msg.sender, totalSupply_);

    }

    // заморозка токенов до определенного момента времени
    function freeze(uint thawTS) public {

        // проверяем что время заморозки адреса уже прошло (меноше текущего времени)
        require ( m_freeze_info[msg.sender] <= now );

        m_freeze_info[msg.sender] = thawTS;
    }

    // переопределяем функцию передачи токенов из родительского класса StandardToken
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {

        // добавляем проверку что токены от кого совершается перевод не заморожены
        require ( m_freeze_info[_from] <= now );

        return super.transferFrom( _from, _to, _value );
    }

    // переопределяем функцию передачи токенов из класса BasicToken
    function transfer(address _to, uint256 _value) public returns (bool) {

        require ( m_freeze_info[msg.sender] <= now );

        return super.transfer(_to, _value);
    }
}
