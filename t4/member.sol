pragma solidity ^0.4.6;
contract Member {
  uint count;
  string[] list;
  struct memberItem {
    string id;
    string name;
    string password;
    bool initialized;
  }

  mapping(string => memberItem) memberList;

  event added(string id ,string name ,string password);

  function Member() {
    count = 0;
  }

  function createMember(string id, string name, string password) {
    //
    // Check validity
    //
    if ( !isMember(id) ) {
      memberList[id] = memberItem(id,name,password,true);
      list.push(id);
      count++;
      added(id,name,password);
    }
  }

  function updateMember(string id, string name, string password) {
    if ( isMember(id) ) {
      memberList[id] = memberItem(id,name,password,true);
      
      
      //added(id,name,password);
    }

  }

  function getMember(string id) constant returns (string,string,string) {
    if ( isMember(id) ) {
        return (memberList[id].id, memberList[id].name, memberList[id].password);
    }
  }

  function deleteMember(string id) returns (uint) {
    uint i=0;
    uint j=0;
    if ( isMember(id) ) {
        memberList[id].initialized = false;
        delete memberList[id];

        for (i=0 ; i<count-1 ; i++) {
            if (sha3(list[i]) == sha3(id)) {
                break;
            }
        }
        for (j=i ; j<count-1 ; j++) {
            list[j] = list[j+1];
        }
        delete list[count-1];
        list.length--;
        count--;
    }      
    return count;
  }

  function getTotal() constant returns (uint) {
    return count;
  }

  function getId(uint idx) constant returns (string) {
    if ( idx < count ) {
        return list[idx];
    }
  }

  function isMember(string id) constant returns (bool) {
    if ( memberList[id].initialized ) {
        return true;
    }
    return false;
  }
  function reset() {
    for ( uint i=0; i<count ; i++) {
      delete memberList[list[i]];
    }
    list.length = 0;
    count = 0;
  }  
}