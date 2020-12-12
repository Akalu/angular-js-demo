var app = angular.module('myApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
    .controller('mainCtrl', ['$scope', '$timeout',
        function ($scope, $timeout) {

            var whitespace = '\u00a0\u00a0\u00a0\u00a0';
            $scope.STYLE_UPDATED = {"background-color":"#FFF7CC"};

            $scope.isLoading = false;
            $scope.rowCollection = [];
            $scope.counter = 0;

            linearize(diff,'');

            console.log('length='+$scope.rowCollection.length);
            console.log('= '+JSON.stringify($scope.rowCollection));


            $scope.updated = function (id) {
                var rec = $scope.rowCollection[id];
                console.log('clicked:'+id);
                rec.DiffViewValue = rec.DiffAction ? rec.NewData : rec.OldData;
                rec.DiffAction = rec.DiffAction ? false : true;
                $scope.rowCollection[id] = rec;
            }



            function createWrapperItem(name,margin){
                $scope.rowCollection.push({ isKey: true, number:$scope.counter, parentTag: name, margin:margin});
                $scope.counter++;
            }

            function createItem(name,obj,margin){
                $scope.rowCollection.push({number:$scope.counter,
                                            margin:margin,
                                            tag: name,
                                            DiffType:obj.DiffType,
                                            NewData:obj.NewData,
                                            OldData:obj.OldData,
                                            DiffAction:obj.DiffAction,
                                            DiffViewValue:obj.DiffViewValue,
                                            Diffstyle:obj.Diffstyle} );
                $scope.counter++;
                console.log('margin:'+margin);
            }


            function linearize(obj4analysis, margin){
                for (var key in obj4analysis) {
                    var ob = obj4analysis[key];

                    if (isObject(ob)){
                        if (ob['DiffType'] != undefined){// a leaf is found
                            createItem(key,ob,margin);
                        }else{// push to array a key record, parse next level with increased margin
                            createWrapperItem(key,margin);
                            linearize(ob,margin+whitespace);
                        }
                    }

                    if (isArray(ob)){
                        createWrapperItem(key,margin);
                        for (var i in ob){
                            linearize(ob[i],margin+whitespace);
                        }
                    }
                }



                function isFunction(obj) {
                    return {}.toString.apply(obj) === '[object Function]';
                }
                function isArray(obj) {
                    return {}.toString.apply(obj) === '[object Array]';
                }
                function isObject(obj) {
                    return {}.toString.apply(obj) === '[object Object]';
                }
                function isValue(obj) {
                    return !isObject(obj) && !isArray(obj);
                }
    
            }


        }
    ]);

