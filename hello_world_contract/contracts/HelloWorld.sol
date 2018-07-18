pragma solidity ^0.4.18;

contract HelloWorld {

    string m_name;

    constructor(string name) public {

        m_name = name;
    }

    // view - функция только на просмотр даннх
    function hello() public view returns (string) {
        return m_name;
    }

    // payable - возможна отправка эфира в функцию
    function modifyName(string new_name) public payable {
      m_name = new_name;
  }


}
