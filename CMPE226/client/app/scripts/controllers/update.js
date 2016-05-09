/**
 * Created by ratan_000 on 5/7/2016   .
 */
angular.module('clientApp')
  .controller('updateCtrl', function ($scope,$http,$compile,$document,$rootScope) {

// below variable is used to apply  - selected option CSS in sideTable - CRUDJSON.html
    $scope.window="update";

    // Below variable is the parent to which all elements (OL,LI ,JSON,InputBOX values) are attached dynamically from Controller
    var parent =$document.find('#f1');

    //It check if json is allocated to $rootScope.json if Not then allocate them

    if(!$rootScope.json) {
      $rootScope.json = {
        "cluster": {
          "id": "ad",
          "status": false,
          "servers": [
            {
              "id": "amet ex voluptate dolor",
              "role": "openstack",
              "memory_gb": 4318768,
              "tags": [
                "mollit"
              ],
              "installed_image": "ut adipisicing",
              "interfaces": [
                {
                  "id": "magna",
                  "ip_address": "officia tempor"
                },
                {
                  "id": "volupta",
                  "ip_address": "in deserunt"
                },
                {
                  "id": "tempor Lorem proiden",
                  "ip_address": "aliquip qui occaecat"
                },
                {
                  "id": "sit et",
                  "ip_address": "sunt"
                }
              ],
              "management_interface": "dolore cillum ad"
            },
            {
              "id": "exercitation culpa",
              "role": "config",
              "memory_gb": 88133004,
              "tags": [
                "est",
                "proident",
                "incididunt"
              ],
              "installed_image": "do ut et",
              "interfaces": [
                {
                  "id": "est nisi commodo",
                  "ip_address": "ad mollit ullamco"
                }
              ],
              "management_interface": "dolor"
            },
            {
              "id": "magna",
              "role": "config",
              "memory_gb": 6589622,
              "tags": [
                "consectetur Excepteur",
                "nostrud ut",
                "Ut nulla consectetur dolor"
              ],
              "installed_image": "eu eiusmod proident",
              "interfaces": [
                {
                  "id": "non dolore consectetur ut",
                  "ip_address": "dolor Ut deserunt sunt"
                },
                {
                  "id": "velit do tempor",
                  "ip_address": "laboris"
                }
              ],
              "management_interface": "aute adipisicing"
            }
          ]
        }
      };
    }

    //  function updateFun1  is used as recursive function
    function updatefun1(val, key, parent) {

      // string, boolean, number create li and attached to parent (UL)
      if (typeof(val) == "number" || typeof(val) == "string" || typeof(val) == "boolean") {
        console.log(key + "::" +val);
        var keys=key.split('.');
        var key1 = keys[keys.length-1];
        var parametre = key.slice(2).toString(); // removing A and . for processing

        $scope.updated; // this act as model for the input we are changing.
        var test = "updated."+key; // preparing model mapping

        // dynamicaly creating element and attaching id  button and click event dynamically
        var newLI=angular.element("<li>" + key1 + ":" + val + "<input ng-model='updated' type='text' id=" + key + "/>" + "<button ng-click='updateMe(\"" + key + "\")'> update Me </button>" + "</li>" );

        // As  we are attching new element this has to be compile with document so that event on this element is recognised.
        newLI = $compile(newLI)($scope);
        parent.append(newLI); // new element attached

      }

      // check for array && Array.isArray(val)
      else if (typeof(val) == "object" && Array.isArray(val) ) {
        var newULStart=angular.element("<UL>");
        parent.append(newULStart);
        temp = parent;
        parent = newULStart;

        // ATTACHING LEVEL SYMBOL
        var keys=key.split('.');
        var key1 = keys[keys.length-1];

        //creating new element li  and attaching key (dymanically created)
        var START=angular.element("<span>" +key1+ " [ " + "</span>");
        parent.append(START);

        for(item in val) {
          updatefun1(val[item],  key+"["+item+"]", parent); // recursive calls
        }
       //  adding end of UL
        var ULeND=angular.element("</UL>");
        //attaching closing bracket
        var END=angular.element("<span>] </span>");
        parent.append(END);
        parent.append(ULeND);
        parent = newULStart;
        parent = temp;

      }
      //check for object
      else {
        // alert("putting OL1:");
        var newULStart=angular.element("<UL>");
        parent.append(newULStart);
        temp = parent;
        parent = newULStart;
        var START1=angular.element("<span> {  </span>");
        parent.append(START1);

        for(item in val) {
          // recursive solution
          updatefun1(val[item], key+"."+item, parent,key);
        }
        var ULeND=angular.element("</UL>");
        var END=angular.element("<span> }</span>");
        parent.append(END);
        parent.append(ULeND);
        parent = newULStart;
        parent = temp;

        // alert("closing  OL1:");
      }
    }
    updatefun1( $rootScope.json, "A",parent );

    $scope.updateMe = function(a){
      $scope.window="update";
      var input=$document.find('#'+a);
      a = a.split('');
      var s = a.map(function (ele){
        if( ele == '[' ){
          return '.'
        }else{
          return ele;
        }
      });

      s = s.filter(function (ele){
        if(ele == ']'){
          return false;
        }else {
          return true;
        }
      });

      s= s.slice(2);
      s=s.join('');


      alert('str: ' + s);
      var str=s;
      var keys = str.split(".");

      var sample=$rootScope.json;
      var i;
      for( i = 0 ; i < keys.length-1; i++){
        sample = sample[keys[i]];

      }



      console.log("sample::" + sample);
      sample[keys[i]]=$scope.updated;
      $document.find('#f1').empty();
      var parent1= $document.find('#f1');
      updatefun1( $rootScope.json, "A",parent1 );
    };
  });







