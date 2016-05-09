/**
 * Created by ratan_000 on 5/7/2016.
 * ..
 */
angular.module('clientApp')
  .controller('crudCtrl', function ($scope,$http,$compile,$document,$rootScope) {
    // below variable is used to apply  - selected option CSS in sideTable - CRUDJSON.html
    $scope.window="read";

    // Below variable is the parent to which all elements (OL,LI ,JSON values) are attached dynamically from Controller
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

   //  function fun1  is used as recursive function
  function fun1(val, key, parent) {
    // string, boolean, number then print  it directly .
    if (typeof(val) == "number" || typeof(val) == "string" || typeof(val) == "boolean") {
      //console.log(key + "::" +val);
      var keys=key.split('.');
      key = keys[keys.length-1];
     //creating new element li  and attaching key (dymanically created)
      var newLI=angular.element("<li>" + key + ":" + val + "</li>");
      parent.append(newLI);
    }

    // check for array && Array.isArray(val)

    else if (typeof(val) == "object" && Array.isArray(val) ) {
      // starting of Array so attaching UL to HTML and at first condition the li will get attach under the UL
      var newULStart=angular.element("<UL>");
      parent.append(newULStart);
      temp = parent;
      parent = newULStart;
      // ATTACHING LEVEL SYMBOL
      var keys=key.split('.');
      key = keys[keys.length-1];
      var START=angular.element("<span>" +key+ " [ " + "</span>");
      parent.append(START);

      for(item in val) {
        fun1(val[item],  key+"."+item, parent); // recursive call
      }

      var ULeND=angular.element("</UL>");
      var END=angular.element("<span>] </span>");
      parent.append(END);
      parent.append(ULeND);
     parent = newULStart; // updating parent to latest (last node)
      parent = temp; // used this is for level backtracking

    }
    //check for object
    else {
      // starting of Object so attaching UL to HTML and at first condition the li will get attach under the UL
      var newULStart=angular.element("<UL>");
      parent.append(newULStart);
      temp = parent;
      parent = newULStart;
      var START1=angular.element("<span> {  </span>");
      parent.append(START1);

      for(item in val) {
        fun1(val[item], key+"."+item, parent,key);
      }
      var ULeND=angular.element("</UL>");
      // attaching end curly bracket
      var END=angular.element("<span> }</span>");
      parent.append(END);
      parent.append(ULeND);
      parent = newULStart;
      parent = temp; // updating parent

    }
  }
    fun1($rootScope.json, "",parent ); // calling fun1 using rootScope.json.
    // rootScope is accessible from all controller so same Json Object is available across all screens.
});















