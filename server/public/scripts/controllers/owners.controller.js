app.controller('OwnersController', ['$http', function($http) {
    let self=this;
    self.message = "Welcome to the Owner's Page";

    self.owner={details: []};

    self.displayOwners = function(){
        console.log('display owners');
        $http({
            method: 'GET',
            url: '/owners',
        })
        .then(function (response) {
            console.log('display all owners', response);
            self.owner.details = response.data;
        })
        .catch(function (error) {
            console.log('error on /owners GET', error);
        });
    }
    self.displayOwners();

}])