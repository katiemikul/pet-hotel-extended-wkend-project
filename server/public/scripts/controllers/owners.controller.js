app.controller('OwnersController', ['$http', function($http) {
    let self=this;
    self.message = "Welcome to the Owner's Page";

    self.owner={details: []};

    self.newOwner={};

    self.petCount={details: []};

    self.displayOwners = function(){
        console.log('display owners');
        $http({
            method: 'GET',
            url: '/owners',
        })
        .then(function (response) {
            console.log('display all owners', response);
            self.owner.details = response.data;
            self.displayNumberPets();
        })
        .catch(function (error) {
            console.log('error on /owners GET', error);
        });
    }
    self.displayOwners();

    self.addOwners = function(){
        console.log('adding owners');
        $http({
            method: 'POST',
            url: '/owners',
            data: self.newOwner,
        })
        .then(function (response) {
            console.log('added a new owner', response);
            self.newOwner = response.data.results;
            self.displayOwners();
            self.displayNumberPets();
        })
        .catch(function (error) {
            console.log('error on /owners Post', error);
        });
    }

    self.displayNumberPets = function(){
        console.log('display the number of pets per owner');
        $http({
            method: 'GET',
            url: '/owners',
        })
        .then(function (response) {
            console.log('display the number of pets', response);
            self.petCount.details = response.data;
        })
        .catch(function (error) {
            console.log('error on /owners GET', error);
        });
    }

}])