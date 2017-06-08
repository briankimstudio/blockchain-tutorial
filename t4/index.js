web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var contract;
var MemberContract;
var deployedContract;
var contractInstance;

function createMember() {
  //web3.personal.unlockAccount(web3.eth.accounts[0],'1234')
  var id = $("#id").val();
  var name = $("#name").val();
  var password = $("#password").val();
  if ( id == "" || name == "" || password == "" ) {
    return false;
  }
  contractInstance.createMember(id,name,password, {from: web3.eth.accounts[0],gas: 4700000}, refresh);
  $("#id").val("");
  $("#name").val("");
  $("#password").val("");
}

function openFile(event) {
  var reader = new FileReader();
  $("#address").text("Compiling...");
  reader.onload = function(){
    var text = reader.result;
    contract =  web3.eth.compile.solidity(text, function(err,output) {
      console.log('error' + err);
      if ( err == null ) {
        MemberContract = web3.eth.contract(output.info.abiDefinition);
        deployedContract = MemberContract.new({data: output.code, from: web3.eth.accounts[0], gas: 4700000},
          function(err, myContract){
            contractInstance = MemberContract.at(myContract.address);    
            //console.log(myContract.address);
            $("#address").text(myContract.address);
            console.log("err "+err+" address " + myContract.address);
            if ( myContract.address != undefined ) {
              contractInstance.added().watch(function(error, result) {
                console.log(result);
              });
            }
        });
      }
    });
  };
  reader.readAsText(event.target.files[0]);
}

function reset() {
  contractInstance.reset({from: web3.eth.accounts[0],gas: 4700000}, refresh);
}

function deleteMember() {
  //this.event.target.id
  console.log(this.event.target.id);
  contractInstance.deleteMember(this.event.target.id,{from: web3.eth.accounts[0],gas: 4700000}, refresh);
}

function refresh() {
  var n = contractInstance.getTotal.call().toString();
  $("#total").text(n);
  console.log('total = '+n);
  $("table").find("tr:gt(0)").remove();
  for (var i = 0; i < n; i++) {
    var member = contractInstance.getId.call(i);
    console.log(member);
    var memberItem = contractInstance.getMember.call(member);
    console.log(memberItem);
    var row = "<tr><td>" + memberItem[0]+"</td>" +
              "<td>" + memberItem[1]+"</td>" +
              "<td>" + memberItem[2]+"</td>" +
              "<td><button id='"+memberItem[0]+"' onclick='deleteMember()' class='btn btn-primary'>Delete</button></td></tr>";
    $('table> tbody:last').append(row);              
  }
}


//$(document).ready(send);
