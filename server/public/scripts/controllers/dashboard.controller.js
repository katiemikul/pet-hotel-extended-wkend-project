app.controller('DashboardController', ['$http', function($http) {
    let self=this;
    self.message = "Welcome to the Dashboard Page";
    
    self.pet={details: []};

    self.owner={details: []};

    self.newPet={};

    self.displayPets = function(){
        console.log('display pets');
        $http({
            method: 'GET',
            url: '/dashboard',
        })
        .then(function (response) {
            console.log('display all pets', response);
            self.pet.details = response.data;
        })
        .catch(function (error) {
            console.log('error on /dashboard GET', error);
        });
    }
    self.displayPets();

    self.addPets = function(){
        console.log('adding pets');
        $http({
            method: 'POST',
            url: '/dashboard',
            data: self.newPet,
        })
        .then(function (response) {
            console.log('added a new pet', response);
            self.newPet = response.data.results;
            self.displayPets();
        })
        .catch(function (error) {
            console.log('error on /dashboard Post', error);
        });
    }

    self.displayOwnersDB = function(){
        console.log('display owners for dashboard');
        $http({
            method: 'GET',
            url: '/owners',
        })
        .then(function (response) {
            console.log('display all owners', response);
            self.owner.details = response.data;
        })
        .catch(function (error) {
            console.log('error on /owners GET to dashboard', error);
        });
    }
    self.displayOwnersDB();

}])