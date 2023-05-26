const clikeame = document.querySelector(".mostrar_clima"),
      datosFecha = document.querySelector(".datos"),
      valueFechas = document.querySelector(".value"),
      card = document.querySelector(".card"),
      lod = document.querySelector(".lod");


let today = new Date(),
    day = today.getDate(),
    month = today.getMonth()+1;
    year = today.getFullYear();
    date = `${day}/${month}/${year}`

datosFecha.innerHTML = date;    




clikeame.addEventListener("click",()=>{
    lod.classList.add("loader");
    let nameCity = valueFechas.value;
    let newNameCity = nameCity.normalize('NFD').replace(/[\u0300-\u036f]/g,"");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${newNameCity}&lang=es&appid=6f5258d6b09ac21f99c474adf8a7ddde`,{
        method: "POST"
    })
    .then((res => res.json()))
    .then((data)=>{
        if(data){
            console.log("esperando...");
            console.log(data);
            lod.classList.remove("loader");
            let url = "http://openweathermap.org/img/w/";
            let iconUrl = url + data.weather[0].icon + ".png";

            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${newNameCity}&lang=es&appid=6f5258d6b09ac21f99c474adf8a7ddde`)
            .then((res => res.json()))
            .then((datos)=> {
                let urlForecast = "http://openweathermap.org/img/w/";
                let iconForescat1 = urlForecast + datos.list[0].weather[0].icon + ".png",
                    iconForescat2 = urlForecast + datos.list[1].weather[0].icon + ".png",
                    iconForescat3 = urlForecast + datos.list[2].weather[0].icon + ".png",
                    iconForescat4 = urlForecast + datos.list[3].weather[0].icon + ".png",
                    iconForescat5 = urlForecast + datos.list[4].weather[0].icon + ".png";

                ObtenerDatos(data,iconUrl,datos,iconForescat1,iconForescat2,iconForescat3,iconForescat4,iconForescat5);
            })

        }
        valueFechas.value = "";
    })
    .catch((error)=>{        
        card.innerHTML = '<p class="error_title">Lo sentimos no pudimos encontrar la información</p>'
    });
})


const ObtenerDatos = (data,iconUrl,datos,iconForescat1,iconForescat2,iconForescat3,iconForescat4,iconForescat5) =>{
    console.log(datos);
    // para la ruta forecast
    let fecha_hora1 = datos.list[0].dt_txt.substring(0,10) +' '+ datos.list[0].dt_txt.substring(11,16),
        fecha_hora2 = datos.list[1].dt_txt.substring(0,10) +' '+ datos.list[1].dt_txt.substring(11,16),
        fecha_hora3 = datos.list[2].dt_txt.substring(0,10) +' '+ datos.list[2].dt_txt.substring(11,16),
        fecha_hora4 = datos.list[3].dt_txt.substring(0,10) +' '+ datos.list[3].dt_txt.substring(11,16),
        fecha_hora5 = datos.list[4].dt_txt.substring(0,10) +' '+ datos.list[4].dt_txt.substring(11,16);  

    let temperaturaForecast1 = (datos.list[0].main.temp - 273.15).toFixed(1)+"°C",
        temperaturaForecast2 = (datos.list[1].main.temp - 273.15).toFixed(1)+"°C",
        temperaturaForecast3 = (datos.list[2].main.temp - 273.15).toFixed(1)+"°C",
        temperaturaForecast4 = (datos.list[3].main.temp - 273.15).toFixed(1)+"°C",
        temperaturaForecast5 = (datos.list[4].main.temp - 273.15).toFixed(1)+"°C";

    let descriptionForescast1 = datos.list[0].weather[0].description,
        descriptionForescast2 = datos.list[1].weather[0].description,
        descriptionForescast3 = datos.list[2].weather[0].description,
        descriptionForescast4 = datos.list[3].weather[0].description,
        descriptionForescast5 = datos.list[4].weather[0].description;


    // para la ruta weather
    let temperaturaWeather = (data.main.temp - 273.15).toFixed(1)+"°C"
    let nombreCiudad = data.name;
    let description = data.weather[0].description;

    card.innerHTML = `
    <div class="temp">
        <h2 class="text-temp">${nombreCiudad}</h2>
        <h3>${temperaturaWeather}</h3>
    </div>
    <div class="images">
        <h3>${description}</h3>
        <img src="${iconUrl}" alt="">
        </div>
        <div class="div_climas">
        <div class="clima">
            <p>${fecha_hora1}</p>
            <p>${descriptionForescast1}</p>
            <img src="${iconForescat1}" alt="">
            <p>${temperaturaForecast1}</p>
        </div>
        <div class="clima">
            <p>${fecha_hora2}</p>
            <p>${descriptionForescast2}</p>
            <img src="${iconForescat2}" alt="">
            <p>${temperaturaForecast2}</p>
        </div>
        <div class="clima">
            <p>${fecha_hora3}</p>
            <p>${descriptionForescast3}</p>
            <img src="${iconForescat3}" alt="">
            <p>${temperaturaForecast3}</p>
        </div>
        <div class="clima">
            <p>${fecha_hora4}</p>
            <p>${descriptionForescast4}</p>
            <img src="${iconForescat4}" alt="">
            <p>${temperaturaForecast4}</p>
        </div>
        <div class="clima">
            <p>${fecha_hora5}</p>
            <p>${descriptionForescast5}</p>
            <img src="${iconForescat5}" alt="">
            <p>${temperaturaForecast5}</p>
        </div>    
    </div>
    `
}