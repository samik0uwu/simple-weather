var app = new Vue({
    el: '#app',
    data: {
      temp: null,
      description: null,
      humidity: null,
      main: null,
      icon: null,
      wind: null,
      place: 'Prague',
      name: null,
      feels: null,
      favourites: []
    },
    mounted() {
      JSON.parse(localStorage.getItem("favourite")).forEach(id => {
        this.favourites.push(id);
      })
      let place = this.place;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=04c48969d807f018f709599816759e7b&units=metric`).then(response => {
        app.temp = response.data.main.temp;
        app.humidity = response.data.main.humidity;
        app.description = response.data.weather[0].description;
        app.main = response.data.weather[0].main;
        app.icon = response.data.weather[0].icon;
        app.wind = response.data.wind.speed;
        app.name = response.data.name;
        app.feels = response.data.main.feels_like;
      });

    },
    methods: {
      getLocationFromName: function () {

        let place = this.place
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=04c48969d807f018f709599816759e7b&units=metric`).then(response => {
          app.temp = response.data.main.temp;
          app.humidity = response.data.main.humidity;
          app.description = response.data.weather[0].description;
          app.main = response.data.weather[0].main;
          app.icon = response.data.weather[0].icon;
          app.wind = response.data.wind.speed;
          app.name = response.data.name;
          app.feels = response.data.main.feels_like;
        });

      },
      setName: function (item) {
        this.place = item;
        this.getLocationFromName();
      },
      setFavourite: function () {
        // var star=document.getElementById('star');
        // console.log(star.src);
        // if(star.src=="star-gray.svg"){
        //   star.src="star-orange.svg";
        //   console.log("orange now?");
        // }
        // else{
        //   star.src="star-gray.svg";
        //   console.log("gray now?");
        // }

        let favorites = JSON.parse(localStorage.getItem("favourite"));

        if (favorites) {
          if (favorites.filter(i => i == this.name).length < 1) {
            favorites.push(this.name);
            localStorage.setItem("favourite", JSON.stringify(favorites));
          }
          else {
            localStorage.setItem("favourite", JSON.stringify(favorites.filter(i => i != this.name)));
          }
        }
        else {
          localStorage.setItem("favourite", JSON.stringify([this.name]));
        }

        this.favourites = [];
        JSON.parse(localStorage.getItem("favourite")).forEach(id => {
          this.favourites.push(id);

        });

        this.$forceUpdate();

      }
    }
  })